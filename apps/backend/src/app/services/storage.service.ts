import {
  BlobServiceClient,
  ContainerSASPermissions,
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
}
