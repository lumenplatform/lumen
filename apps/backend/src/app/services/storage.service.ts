import {
  BlobSASPermissions,
  BlobServiceClient,
  ContainerSASPermissions,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

const AZURE_STORAGE_CONN_STRING = process.env.AZURE_STORAGE_CONN_STRING;

export class StorageService {
  _blobServiceClient: BlobServiceClient;

  constructor() {
    if (!AZURE_STORAGE_CONN_STRING) {
      throw Error('Azure Storage Connection string not found');
    }
    this._blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONN_STRING
    );
  }

  async generateSAS() {
    const expiresOn = new Date();
    expiresOn.setDate(expiresOn.getDate() + 1);

    const containerClient = this._blobServiceClient.getContainerClient('test');

    return containerClient.generateSasUrl({
      expiresOn: expiresOn,
      permissions: ContainerSASPermissions.from({
        create: true,
        read: true,
        write: true,
      }),
    });
  }

  static generateSignedURL(url: string) {
    const expiresOn = new Date();
    const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const sharedKeyCredential = new StorageSharedKeyCredential(
      AZURE_STORAGE_ACCOUNT_NAME,
      AZURE_STORAGE_ACCOUNT_KEY
    );

    expiresOn.setDate(expiresOn.getDate() + 2);
    const u = new URL(url);
    const parts = u.pathname.substring(1).split('/');

    const params = generateBlobSASQueryParameters(
      {
        containerName: parts[0],
        expiresOn: expiresOn,
        permissions: BlobSASPermissions.from({
          read: true,
        }),
      },
      sharedKeyCredential
    );

    return u.protocol + '//' + u.host + u.pathname + '?' + params.toString();
  }
}
