import { BlockBlobClient } from '@azure/storage-blob';
import { PersonAddAlt } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Component, ContextType, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useList } from 'react-use';
import { inviteUserToOrg } from '../api';
import { StorageContext, useStorage } from './StorageProvider';

function formatBytes(bytes: number, decimals: number) {
  if (bytes == 0) return '0 Bytes';
  const k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function AssetOptions() {
  const [open, setOpen] = useState(false);
  const inviteUserMutation = useMutation(inviteUserToOrg, {
    onSuccess: () => {
      handleClose();
    },
  });
  const { register, getValues } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Invite User
      </Button>
      <Dialog open={open} maxWidth="xs" hideBackdrop={false}>
        <DialogTitle>
          <Stack direction={'row'} alignItems="center">
            <PersonAddAlt sx={{ mr: 2 }} /> Invite an user
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            We will send an email to the user asking them to join.
          </DialogContentText>
          <TextField
            autoFocus
            {...register('email')}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{ mx: 2, mb: 2 }}>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => {}}>
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
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
          <Box>
            <AssetOptions />
            {this.props.removeType === 'delete' ? (
              <IconButton edge="end" onClick={handleRemove}>
                <DeleteIcon />
              </IconButton>
            ) : (
              <Button onClick={handleRemove} color="secondary">
                Replace
              </Button>
            )}
          </Box>
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    multiple ? (value ? value : []) : value ? [value] : []
  );
  const fileInputElement = useRef<HTMLInputElement>(null);
  const storage = useStorage();

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
    <>
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

        {(multiple === true || files.length === 0) && (
          <Button
            size="small"
            onClick={addFiles}
            sx={{ m: 1 }}
            disabled={!storage.containerClient}
            variant="outlined"
          >
            {multiple === true ? 'Add' : 'Choose'} File
          </Button>
        )}
      </Box>
    </>
  );
}

export default FilesInput;
