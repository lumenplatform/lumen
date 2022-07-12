import { AzureMediaServices } from '@azure/arm-mediaservices';
import { v4 as uuidv4 } from 'uuid';
import {
  DefaultAzureCredential,
  ManagedIdentityCredential,
} from '@azure/identity';
import { AzureLogLevel, setLogLevel } from '@azure/logger';
import {
  BuiltInStandardEncoderPreset,
  AssetContainerPermission,
  JobOutputAsset,
  JobInputUnion,
  JobsGetResponse,
  ContentKeyPoliciesGetResponse,
  ContentKeyPoliciesCreateOrUpdateResponse,
  ContentKeyPolicySymmetricTokenKey,
  ContentKeyPolicyTokenClaim,
  ContentKeyPolicyTokenRestriction,
  ContentKeyPolicyOption,
  ContentKeyPolicyPlayReadyConfiguration,
  ContentKeyPolicyWidevineConfiguration,
  JobInputAsset,
  JobInputHttp,
  JobInputs,
  AudioAnalyzerPresetUnion,
  VideoAnalyzerPreset,
  AudioAnalyzerPreset,
  VideoOverlay,
  JobInputSequence,
} from '@azure/arm-mediaservices';
import { BlobServiceClient, AnonymousCredential } from '@azure/storage-blob';

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

export class AMSService {
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
      .list(resourceGroup, accountName, {
        top: 1000,
      })
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

  async getStreamingURLsForBlob() {
    let adaptiveStreamingTransform: BuiltInStandardEncoderPreset =
      createBuiltInStandardEncoderPreset({
        presetName: 'ContentAwareEncoding',
      });

    let encodingTransform =
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

    console.log('Transform Created (or updated if it existed already).');

    let uniqueness = uuidv4();
    const inputAssetName = 'input-' + uniqueness;

    let asset = await this.mediaServicesClient.assets.createOrUpdate(
      resourceGroup,
      accountName,
      inputAssetName,
      {}
    );

    
    console.log(asset);


    return;

    let input = await createJobInputAsset({
      assetName: inputAssetName,
    });

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
  }
}

export function createBuiltInStandardEncoderPreset(
  builtInStandardEncoder: Omit<BuiltInStandardEncoderPreset, 'odataType'>
): BuiltInStandardEncoderPreset {
  return {
    odataType: '#Microsoft.Media.BuiltInStandardEncoderPreset',
    ...builtInStandardEncoder,
  };
}

export function createJobInputAsset(
  inputAsset: Omit<JobInputAsset, 'odataType'>
): JobInputAsset {
  return {
    odataType: '#Microsoft.Media.JobInputAsset',
    ...inputAsset,
  };
}
