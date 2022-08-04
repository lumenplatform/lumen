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
import { getUploadConfig } from '../api';

function formatBytes(bytes: number, decimals: number) {
  if (bytes == 0) return '0 Bytes';
  const k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
interface StorageContextType {
  containerClient?: ContainerClient | null;
}

const StorageContext = createContext<StorageContextType>(null!);
/**
 * TODO: Mode upload logic to provider
 *
 *
 */
function StorageProvider({ children }: { children: React.ReactNode }) {
  const [containerClient, setContainerClient] = useState<ContainerClient>(
    null!
  );

  const getAffiliates = async () => {
    const response = await getUploadConfig();
    const client = new ContainerClient(response.sas);
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
    removeType: 'replace' | 'delete';
  },
  {
    progress: number;
  }
> {
  private started = false;
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
      <Box
        sx={{
          minHeight: '1.66em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <LinearProgress
          variant={
            progress === 100 && uploading ? 'indeterminate' : 'determinate'
          }
          value={progress}
        />
      </Box>
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
        {formatBytes(file?.size, 0)} {mime}{' '}
      </Typography>
    );

    return (
      <ListItem
        dense
        secondaryAction={
          this.props.removeType === 'delete' ? (
            <IconButton edge="end" onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <Button onClick={handleRemove} color="secondary">
              Replace
            </Button>
          )
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

type FileInputProps = {
  multiple?: boolean;
  onChange?: any;
  onBlur?: any;
  onPreviewChange?: any;
  name?: string;
  accept?: string;
  value?: FileItem[] | FileItem;
};

function FilesInput({ multiple, onChange, value, accept }: FileInputProps) {
  const [files, { updateAt, push, removeAt }] = useList<FileItem>(
    // @ts-ignore
    multiple ? (value ? value : []) : value ? [value] : []
  );
  const fileInputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onChange) {
      onChange(multiple ? files : files[0]);
    }
  }, [files]);

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

  return (
    <StorageProvider>
      {files.length > 0 && (
        <List dense={true}>
          {files.map((file, index) => (
            <FileItemComp
              key={index}
              fileItem={file}
              handleRemove={() => {
                removeAt(index);
                if (!multiple) addFiles();
              }}
              updateItem={(c: any) => updateAt(index, { ...file, ...c })}
              removeType={multiple ? 'delete' : 'replace'}
            />
          ))}
        </List>
      )}
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
          accept={accept ? accept : '*/**'}
        />
        <StorageContext.Consumer>
          {(value) =>
            (multiple === true || files.length === 0) && (
              <Button
                size="small"
                onClick={addFiles}
                sx={{ m: 1 }}
                disabled={!value.containerClient}
                variant="outlined"
              >
                {multiple === true ? 'Add' : 'Choose'} File
              </Button>
            )
          }
        </StorageContext.Consumer>
      </Box>
    </StorageProvider>
  );
}

export default FilesInput;
