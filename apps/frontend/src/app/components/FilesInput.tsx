import {
  BlobServiceClient,
  ContainerClient,
  BlockBlobClient,
} from '@azure/storage-blob';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

console.log();

let containerClient: any = null;

fetch('/api/content/get-container-sas')
  .then((e) => e.json())
  .then((r) => {
    const blobServiceClient = new BlobServiceClient(r.sas);

    // Get a container client from the BlobServiceClient
    containerClient = new ContainerClient(r.sas);

    console.log(r);
    // Get a container client from the BlobServiceClient
  });

function constNone() {
  const uploadFiles = async (fileInput: any) => {
    try {
      console.log('Uploading files...');
      const promises = [];
      for (const file of fileInput.files) {
        const blockBlobClient = containerClient.getBlockBlobClient(file.name);
        promises.push(blockBlobClient.uploadBrowserData(file));
      }
      console.log(await Promise.all(promises));
      console.log('Done.');
    } catch (error) {
      console.log(error);
    }
  };
  return <div>`` UploadFiles</div>;
}

export function FileItem({ file }: { file: any }) {
  const getFileIcon = (mime: string) => {};

  return <div></div>;
}

type FileItem = { id: number; name: string; file: File; url: string };

function FilesInput({ multiple }: { multiple?: boolean }) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [id, setId] = useState(1);

  const addFiles = async (fileInput: any) => {
    try {
      console.log('Uploading files...');
      const promises: any = [];

      const new_files = [];
      for (const file of fileInput.files) {
        setId(id + 1);
        const blockBlobClient: BlockBlobClient =
          containerClient.getBlockBlobClient(file.name);

        promises.push(
          blockBlobClient
            .uploadBrowserData(file, {
              onProgress: (e) => console.log(e),
            })
            .then((e) => {
              blockBlobClient.setHTTPHeaders({
                blobContentDisposition: 'inline;',
                blobContentType: file.mime,
              });
            })
        );

        new_files.push({ name: file.name, file, id, url: blockBlobClient.url });
      }

      setFiles([...files, ...new_files]);

      console.log(await Promise.all(promises));
      console.log('Done.');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (id: number) => {
    const newList = files.filter((item) => item.id !== id);
    setFiles(newList);
  };

  const updateItem = (id: number, item: FileItem) => {};

  return (
    <Box>
      {files.map((file) => (
        <Box sx={{ display: 'flex' }}>
          <a target={'_blank'} href={file.url}>
            {file.name}
          </a>
          <button onClick={() => handleRemove(file.id)}>Remove</button>
        </Box>
      ))}

      <input
        type="file"
        id="file-input"
        multiple
        onChange={(event) => addFiles(event.target)}
      />
      {/* <Button>Add File</Button> */}
    </Box>
  );
}

export default FilesInput;
