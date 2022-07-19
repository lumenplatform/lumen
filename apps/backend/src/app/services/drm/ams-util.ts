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
import * as jsonWebToken from 'jsonwebtoken';
import * as util from 'util';
import { url } from 'inspector';

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

export function createJobInputHttp(
  inputHttp: Omit<JobInputHttp, 'odataType'>
): JobInputHttp {
  return {
    odataType: '#Microsoft.Media.JobInputHttp',
    ...inputHttp,
  };
}

export function getToken(
  issuer: string,
  audience: string,
  keyIdentifier: string,
  tokenSigningKey: Uint8Array
): string {
  const startDate: number = Date.now();
  const endDate: number = startDate + 1000 * 60 * 60 * 60 * 5;

  // To set a limit on how many times the same token can be used to request a key or a license.
  // add  the "urn:microsoft:azure:mediaservices:maxuses" claim.
  // For example, "urn:microsoft:azure:mediaservices:maxuses", 2));

  const claims = {
    'urn:microsoft:azure:mediaservices:contentkeyidentifier': keyIdentifier,
    // "urn:microsoft:azure:mediaservices:maxuses": 2 // optional feature for token replay prevention
    exp: Math.floor(endDate / 1000),
    nbf: Math.floor((Date.now() - 8000) / 1000),
  };

  const jwtToken = jsonWebToken.sign(claims, Buffer.from(tokenSigningKey), {
    algorithm: 'HS256',
    issuer: issuer,
    audience: audience,
  });

  return jwtToken;
}

export function createJobOutputAsset(
  outputAsset: Omit<JobOutputAsset, 'odataType'>
): JobOutputAsset {
  return {
    odataType: '#Microsoft.Media.JobOutputAsset',
    ...outputAsset,
  };
}
