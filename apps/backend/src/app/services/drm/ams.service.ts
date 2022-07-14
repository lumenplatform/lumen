import {
  AzureMediaServices,
  BuiltInStandardEncoderPreset,
  ContentKeyPoliciesCreateOrUpdateResponse,
  ContentKeyPoliciesGetResponse,
  ContentKeyPolicyOption,
  ContentKeyPolicySymmetricTokenKey,
  ContentKeyPolicyTokenClaim,
  ContentKeyPolicyTokenRestriction,
  ContentKeyPolicyWidevineConfiguration,
  JobInputUnion,
  JobOutputAsset,
  JobsGetResponse,
} from '@azure/arm-mediaservices';
import { DefaultAzureCredential } from '@azure/identity';
import * as util from 'util';
import { v4 as uuidv4 } from 'uuid';
import {
  createBuiltInStandardEncoderPreset,
  createJobInputHttp,
  createJobOutputAsset,
  getToken,
} from './ams-util';
import { wideVineConfig } from './configs';

const clientId: string = process.env.AZURE_CLIENT_ID as string;
const secret: string = process.env.AZURE_CLIENT_SECRET as string;
const subscriptionId: string = process.env.AZURE_SUBSCRIPTION_ID as string;
const resourceGroup: string = process.env.AZURE_RESOURCE_GROUP as string;
const accountName = process.env.AZURE_MEDIA_SERVICES_ACCOUNT_NAME as string;

const namePrefix: string = 'DRM_Widevine';
let inputExtension: string;
let blobName: string;

// DRM Configuration Settings
const issuer: string = 'myIssuer';
const audience: string = 'myAudience';
let tokenSigningKey: Int16Array = new Int16Array(40);
const contentKeyPolicyName =
  'CommonEncryptionCencDrmContentKeyPolicy_2021_12_15';

const symmetricKey: string = process.env.DRMSYMMETRICKEY as string;

const encodingTransformName = 'ContentAwareEncodingTransform';

export interface StreamingURL {
  url: string;
  keyIdentifier: string;
}

export interface DRMService {
  getStreamingURLsFormURL(inputUrl: string): Promise<StreamingURL[]>;
  generateToken(keyIdentifier: string): string;
}

export class AMSService implements DRMService {
  mediaServicesClient: AzureMediaServices;

  constructor() {
    const credential = new DefaultAzureCredential();

    this.mediaServicesClient = new AzureMediaServices(
      credential,
      subscriptionId
    );
  }

  getAllAssets() {
    return this.mediaServicesClient.assets
      .list(resourceGroup, accountName, { top: 1000 })
      .next();
  }

  getStreamingEndpoint() {
    return this.mediaServicesClient.streamingEndpoints.get(
      resourceGroup,
      accountName,
      'default'
    );
  }

  async startEndpoint() {
    await this.mediaServicesClient.streamingEndpoints.beginStartAndWait(
      resourceGroup,
      accountName,
      'default'
    );
  }

  async stopEndpoint() {
    await this.mediaServicesClient.streamingEndpoints.beginStopAndWait(
      resourceGroup,
      accountName,
      'default'
    );
  }

  async createOrUpdateTransform() {
    let adaptiveStreamingTransform: BuiltInStandardEncoderPreset =
      createBuiltInStandardEncoderPreset({
        presetName: 'ContentAwareEncoding',
      });

    await this.mediaServicesClient.transforms.createOrUpdate(
      resourceGroup,
      accountName,
      encodingTransformName,
      {
        name: encodingTransformName,
        outputs: [
          {
            preset: adaptiveStreamingTransform,
          },
        ],
      }
    );
  }

  generateToken(keyIdentifier: string) {
    let tokenSigningKey = new Uint8Array(Buffer.from(symmetricKey, 'base64'));
    return getToken(issuer, audience, keyIdentifier, tokenSigningKey);
  }

  async getStreamingURLsFormURL(inputUrl) {
    let uniqueness = uuidv4();

    const input = createJobInputHttp({ files: [inputUrl] });

    let outputAssetName = `${namePrefix}-output-${uniqueness}`;
    let jobName = `${namePrefix}-job-${uniqueness}`;
    let locatorName = `locator${uniqueness}`;

    console.log('Creating the output Asset to encode content into...');

    let outputAsset = await this.mediaServicesClient.assets.createOrUpdate(
      resourceGroup,
      accountName,
      outputAssetName,
      {}
    );

    if (outputAsset.name === undefined) {
      throw new Error('Locator was not created or Locator.name is undefined');
    }

    console.log("Submitting the encoding job to the Transform's job queue...");

    let job = await this.submitJob(
      encodingTransformName,
      jobName,
      input,
      outputAsset.name
    );

    console.log(`Waiting for Job - ${job.name} - to finish encoding`);

    job = await this.waitForJobToFinish(encodingTransformName, jobName);

    console.log('Encoding Finshed. Now setting up DRM for streaming');

    // Set a token signing key that you want to use from the env file
    // WARNING: This is an important secret when moving to a production system and should be kept in a Key Vault.
    let tokenSigningKey = new Uint8Array(Buffer.from(symmetricKey, 'base64'));

    // Create the content key policy that configures how the content key is delivered to end clients
    // via the Key Delivery component of Azure Media Services.
    // We are using the ContentKeyIdentifierClaim in the ContentKeyPolicy which means that the token presented
    // to the Key Delivery Component must have the identifier of the content key in it.
    await this.createOrUpdateContentKeyPolicy(
      contentKeyPolicyName,
      tokenSigningKey
    );

    const locator = await this.createStreamingLocator(
      outputAsset.name,
      locatorName,
      contentKeyPolicyName
    );

    if (locator.contentKeys === undefined) {
      throw new Error('Locator and content keys are undefined.');
    }

    if (locator.name === undefined) {
      throw new Error('Locator was not created or Locator.name is undefined');
    }

    const keyIdentifier = locator.contentKeys[0].id;

    return await this.getStreamingUrls(locator.name, keyIdentifier);
  }

  private async waitForJobToFinish(transformName: string, jobName: string) {
    // Timer values
    const timeoutSeconds: number = 60 * 10;
    const sleepInterval: number = 1000 * 2;
    const setTimeoutPromise = util.promisify(setTimeout);

    let timeout = new Date();
    timeout.setSeconds(timeout.getSeconds() + timeoutSeconds);

    const pollForJobStatus = async (): Promise<JobsGetResponse> => {
      let job = await this.mediaServicesClient.jobs.get(
        resourceGroup,
        accountName,
        transformName,
        jobName
      );
      // Note that you can report the progress for each Job output if you have more than one. In this case, we only have one output in the Transform
      // that we defined in this sample, so we can check that with the job.outputs[0].progress parameter.
      if (job.outputs != undefined) {
        console.log(
          `Job State is : ${job.state},  Progress: ${job.outputs[0].progress}%`
        );
      }

      if (
        job.state == 'Finished' ||
        job.state == 'Error' ||
        job.state == 'Canceled'
      ) {
        return job;
      } else if (new Date() > timeout) {
        console.log(
          `Job ${job.name} timed out. Please retry or check the source file. Stop the debugger manually here.`
        );
        return job;
      } else {
        await setTimeoutPromise(sleepInterval, null);

        return pollForJobStatus();
      }
    };

    return await pollForJobStatus();
  }

  private async getStreamingUrls(
    locatorName: string,
    keyIdentifier: string
  ): Promise<StreamingURL[]> {
    let streamingEndpoint =
      await this.mediaServicesClient.streamingEndpoints.get(
        resourceGroup,
        accountName,
        'default'
      );

    let paths = await this.mediaServicesClient.streamingLocators.listPaths(
      resourceGroup,
      accountName,
      locatorName
    );

    let urls: StreamingURL[] = [];
    if (paths.streamingPaths) {
      paths.streamingPaths.forEach((path) => {
        path.paths?.forEach((formatPath) => {
          let manifestPath =
            'https://' + streamingEndpoint.hostName + formatPath;

          const token: string = this.generateToken(keyIdentifier);
          console.log(
            `AMP player: https://ampdemo.azureedge.net/?url=${manifestPath}&widevine=true&token=Bearer%20${token} \n\n`
          );

          urls.push({
            url: `${manifestPath}`,
            keyIdentifier,
          });
        });
      });
    }

    return urls;
  }

  private async submitJob(
    transformName: string,
    jobName: string,
    jobInput: JobInputUnion,
    outputAssetName: string
  ) {
    if (outputAssetName == undefined) {
      throw new Error(
        'OutputAsset Name is not defined. Check creation of the output asset'
      );
    }
    let jobOutputs: JobOutputAsset[] = [
      createJobOutputAsset({ assetName: outputAssetName }),
    ];

    return await this.mediaServicesClient.jobs.create(
      resourceGroup,
      accountName,
      transformName,
      jobName,
      {
        input: jobInput,
        outputs: jobOutputs,
      }
    );
  }
  private async createStreamingLocator(
    assetName: string,
    locatorName: string,
    contentKeyPolicyName: string
  ) {
    let streamingLocator = {
      assetName: assetName,
      streamingPolicyName: 'Predefined_MultiDrmCencStreaming', // Uses the built in Policy for Multi DRM Common Encryption Streaming.
      defaultContentKeyPolicyName: contentKeyPolicyName,
    };

    let locator = await this.mediaServicesClient.streamingLocators.create(
      resourceGroup,
      accountName,
      locatorName,
      streamingLocator
    );

    return locator;
  }

  private async createOrUpdateContentKeyPolicy(
    policyName: string,
    tokenSigningKey: Uint8Array
  ) {
    let contentKeyPoliciesGetResponse: ContentKeyPoliciesGetResponse;
    let contentKeyPolicy: ContentKeyPoliciesCreateOrUpdateResponse;
    let options: ContentKeyPolicyOption[] = [];

    let primaryKey: ContentKeyPolicySymmetricTokenKey = {
      odataType: '#Microsoft.Media.ContentKeyPolicySymmetricTokenKey',
      keyValue: tokenSigningKey,
    };

    let requiredClaims: ContentKeyPolicyTokenClaim[] = [
      {
        claimType: 'urn:microsoft:azure:mediaservices:contentkeyidentifier', // contentKeyIdentifierClaim
      },
    ];

    let restriction: ContentKeyPolicyTokenRestriction = {
      odataType: '#Microsoft.Media.ContentKeyPolicyTokenRestriction',
      issuer: issuer,
      audience: audience,
      primaryVerificationKey: primaryKey,
      restrictionTokenType: 'Jwt',
      alternateVerificationKeys: undefined,
      requiredClaims: requiredClaims,
    };

    // Add the WideVine configuration to the policy
    options = [
      {
        configuration: wideVineConfig,
        restriction: restriction,
      },
    ];

    await this.mediaServicesClient.contentKeyPolicies.createOrUpdate(
      resourceGroup,
      accountName,
      policyName,
      {
        description: 'Content Key Policy Widevine',
        options: options,
      }
    );
  }
}
