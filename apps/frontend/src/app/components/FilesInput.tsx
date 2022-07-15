import { BlockBlobClient, ContainerClient } from '@azure/storage-blob';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import {
  Avatar,
  Button,
  IconButton,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  Component,
  ContextType,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useList } from 'react-use';
import { getUploadConfig, uploadContent } from '../api';

function formatBytes(bytes: number, decimals: number) {
  if (bytes == 0) return '0 Bytes';
  var k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
interface StorageContextType {
  containerClient?: ContainerClient | null;
}

let StorageContext = createContext<StorageContextType>(null!);
/**
 * TODO: Mode upload logic to provider
 *
 *
 */
function StorageProvider({ children }: { children: React.ReactNode }) {
  const [containerClient, setContainerClient] = useState(null);

  const getAffiliates = async () => {
    const response = await getUploadConfig();
    const client = new ContainerClient(response.sas);
    // @ts-ignore
    setContainerClient(client);
  };

  useEffect(() => {
    getAffiliates();
  }, []);

  return (
    <StorageContext.Provider value={{ containerClient }}>
      {children}
    </StorageContext.Provider>
  );
}

function useStorage() {
  return useContext(StorageContext);
}
export class FileItemComp extends Component<
  {
    fileItem: FileItem;
    handleRemove: any;
    updateItem: any;
  },
  {
    progress: number;
  }
> {
  private started: boolean = false;
  static override contextType = StorageContext;
  override context!: ContextType<typeof StorageContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      progress: props.fileItem.url ? 100 : 0,
    };
  }

  override componentDidMount() {
    if (
      !this.started &&
      this.context.containerClient &&
      !this.props.fileItem.url
    ) {
      this.started = true;
      const blockBlobClient: BlockBlobClient =
        this.context.containerClient?.getBlockBlobClient(
          this.props.fileItem.file.name
        );

      this.props.updateItem({
        url: blockBlobClient.url,
      });

      blockBlobClient
        .uploadBrowserData(this.props.fileItem.file, {
          onProgress: (e) => {
            this.setState({
              progress: Math.round(
                (e.loadedBytes / this.props.fileItem.file.size) * 100
              ),
            });
          },
        })
        .then((e) =>
          blockBlobClient.setHTTPHeaders({
            blobContentDisposition: 'inline;',
            blobContentType: this.props.fileItem.mime,
          })
        )
        .then((_) => {
          this.props.updateItem({ uploading: false });
        });
    }
  }

  override render() {
    const { progress } = this.state;
    const {
      fileItem: { uploading, name, url, mime, file },
      handleRemove,
    } = this.props;

    const UploadIndicator = () => (
      <LinearProgress
        sx={{ height: '1.66em' }}
        variant={progress == 100 && uploading ? 'indeterminate' : 'determinate'}
        value={progress}
      />
    );

    const FileInfo = () => (
      <Typography
        component="div"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        variant="caption"
      >
        {formatBytes(file.size, 0)} {mime}{' '}
      </Typography>
    );

    return (
      <ListItem
        secondaryAction={
          <IconButton edge="end" onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link
              sx={{
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              href={url}
              target="_blank"
            >
              {name}
            </Link>
          }
          secondary={uploading ? <UploadIndicator /> : <FileInfo />}
        />
      </ListItem>
    );
  }
}

type FileItem = {
  uploading: boolean;
  name: string;
  file: File;
  url?: string;
  mime: string;
  config: any;
};

function FilesInput({ multiple }: { multiple?: boolean }) {
  const [files, { updateAt, push, removeAt }] = useList<FileItem>([]);
  const fileInputElement = useRef<HTMLInputElement>(null);

  const onFileChange = (fileInput: any) => {
    for (const file of fileInput.files) {
      push({
        name: file.name,
        file,
        uploading: true,
        mime: file.type,
        config: {},
      });
    }
    fileInput.value = null;
  };

  const addFiles = () => fileInputElement.current?.click();

  const upload = () => uploadContent(files);

  return (
    <StorageProvider>
      <List>
        {files.map((file, index) => (
          <FileItemComp
            key={index}
            fileItem={file}
            handleRemove={() => removeAt(index)}
            updateItem={(c: any) => updateAt(index, { ...file, ...c })}
          />
        ))}
      </List>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <input
          ref={fileInputElement}
          type="file"
          id="file-input"
          multiple={multiple}
          onChange={(event) => onFileChange(event.target)}
          hidden
        />
        <Button onClick={() => upload()} variant="contained">
          Upload
        </Button>
        <StorageContext.Consumer>
          {(value) => (
            <Button
              size="small"
              onClick={addFiles}
              disabled={!value.containerClient}
              variant="outlined"
            >
              Add
            </Button>
          )}
        </StorageContext.Consumer>
      </Box>
    </StorageProvider>
  );
}

export default FilesInput;
