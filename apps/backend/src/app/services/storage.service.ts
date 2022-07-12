import {
  BlobServiceClient,
  ContainerSASPermissions,
  AccountSASPermissions,
} from '@azure/storage-blob';
const { v1: uuid_v1 } = require('uuid');
require('dotenv').config();

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

export class StorageService {
  _blobServiceClient: BlobServiceClient;

  constructor() {
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error('Azure Storage Connection string not found');
    }
    this._blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
  }

  async generateContainer() {
    const currentDate = new Date();
    // const containerName =
    //   uuid_v1() + '-' + currentDate.toISOString().substring(0, 10);
    // // Get a reference to a container
    const containerClient = this._blobServiceClient.getContainerClient('test');
    // // Create the container
    // const createContainerResponse = await containerClient.create();
    currentDate.setHours(23);
    return {
      sas: await containerClient.generateSasUrl({
        expiresOn: currentDate,
        permissions: ContainerSASPermissions.from({
          create: true,
          read: true,
          write: true,
        }),
      }),
      containerName: 'test',
    };
  }
}
