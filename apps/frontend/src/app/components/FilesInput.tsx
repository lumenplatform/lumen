import { BlockBlobClient } from '@azure/storage-blob';
import {
  DeleteOutlined,
  Description,
  DescriptionOutlined,
  PhotoOutlined,
  PictureAsPdfOutlined,
  SecurityOutlined,
  SettingsOutlined,
  VideoFileOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Component, ContextType, useEffect, useRef, useState } from 'react';
import { useList } from 'react-use';
import { StorageContext, useStorage } from './StorageProvider';

function formatBytes(bytes: number, decimals: number) {
  if (bytes == 0) return '0 Bytes';
  const k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function getExtension(r: string): string {
  return r.split('.').pop()?.toLowerCase() as string;
}

function mapToExtensionIcon(t: string) {
  const r = getExtension(t);
  const colors: Record<string, any> = {
    pdf: <PictureAsPdfOutlined />,
    jpg: <PhotoOutlined />,
    png: <PhotoOutlined />,
    mp4: <VideoFileOutlined />,
  };
  return colors[r.toLowerCase()] ? (
    colors[r.toLowerCase()]
  ) : (
    <DescriptionOutlined />
  );
}

function getExtensionColor(r: string) {
  const colors: Record<string, string> = {
    pdf: 'red',
  };
  console.log(colors[r.toLowerCase()]);
  return colors[r.toLowerCase()] ? colors[r.toLowerCase()] : '#03a9f4';
}

function AssetOptions(props: { onChange?: any; value?: any }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.value);

  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        // sx={{ color: (theme) => theme.palette.grey[400] }}
        onClick={() => setOpen(true)}
      >
        <SettingsOutlined />
      </IconButton>
      <Dialog open={open} maxWidth="sm" hideBackdrop={false}>
        <DialogTitle>
          <Stack direction={'row'} alignItems="center">
            <SecurityOutlined sx={{ mr: 2 }} /> Protection Settings
          </Stack>
        </DialogTitle>
        <DialogContent>
          Downloading
          <RadioGroup
            row={true}
            onChange={(r) => {
              setValue((e: any) => ({ ...e, down: r.target.value }));
            }}
          >
            <FormControlLabel
              value={true}
              control={<Radio defaultChecked />}
              label="Yes"
            />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
          Screen Capture
          <RadioGroup
            row={true}
            onChange={(r) => {
              setValue((e: any) => ({ ...e, sc: r.target.value }));
            }}
          >
            <FormControlLabel
              value={true}
              control={<Radio defaultChecked />}
              label="Yes"
            />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
          Verified Media Path
          <RadioGroup
            row={true}
            onChange={(r) => {
              setValue((e: any) => ({ ...e, vmp: r.target.value }));
            }}
          >
            <FormControlLabel
              control={<Radio defaultChecked />}
              value={true}
              label="Active"
            />
            <FormControlLabel
              control={<Radio />}
              value={false}
              label="Disable"
            />
          </RadioGroup>
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </DialogContent>
        <DialogActions sx={{ mx: 2, mb: 2 }}>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              props.onChange(value);
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function AssetView(props: { url?: any; name: string }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const ext = getExtension(props.name);
    if (['pdf'].includes(ext)) {
      setOpen(true);
    } else {
      window.open(props.url, '_blank')?.focus();
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Link
        sx={{
          display: 'block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          cursor: 'pointer',
          textOverflow: 'ellipsis',
          color: 'black',
        }}
        onClick={handleOpen}
        component="span"
        underline="hover"
      >
        {props.name}
      </Link>

      <Dialog
        open={open}
        maxWidth={false}
        onClose={handleClose}
        hideBackdrop={false}
      >
        <DialogContent>
          <div
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              // background: 'url(/assets/icons/logo_horiz.png)',
              opacity: 0.1,
              backgroundSize: '180px',
              pointerEvents: 'none',
            }}
          ></div>
          <embed
            style={{ minWidth: '80vw', minHeight: '80vh' }}
            src={props.url}
          ></embed>
        </DialogContent>
      </Dialog>
    </>
  );
}

export class FileItemComp extends Component<
  {
    fileItem: FileItem;
    handleRemove: any;
    updateItem: any;
    fileActions: boolean;
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
      fileItem: { uploading, size, name, url, mime, config },
      handleRemove,
      fileActions,
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
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        variant="caption"
      >
        {size ? formatBytes(size, 0) : ''} {mime}
      </Typography>
    );

    const SwitchedListItem = (props: any) =>
      fileActions ? <ListItem {...props} /> : <ListItemButton {...props} />;

    return (
      <SwitchedListItem
        dense
        secondaryAction={
          fileActions && (
            <Box>
              <AssetOptions
                value={config}
                onChange={(config: any) => this.props.updateItem({ config })}
              />
              {this.props.removeType === 'delete' ? (
                <IconButton edge="end" color="error" onClick={handleRemove}>
                  <DeleteOutlined />
                </IconButton>
              ) : (
                <Button onClick={handleRemove} color="secondary">
                  Replace
                </Button>
              )}
            </Box>
          )
        }
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              backgroundColor: getExtensionColor(getExtension(name)),
              textTransform: 'uppercase',
              fontSize: '1em',
            }}
            variant="rounded"
          >
            {mapToExtensionIcon(name)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<AssetView name={name} url={url} />}
          secondary={uploading ? <UploadIndicator /> : <FileInfo />}
        />
      </SwitchedListItem>
    );
  }
}

type FileItem = {
  uploading: boolean;
  name: string;
  file: File;
  url?: string;
  mime: string;
  size: number;
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
  viewOnly?: boolean;
};

function FilesInput({
  multiple,
  viewOnly,
  onChange,
  value,
  accept,
}: FileInputProps) {
  const [files, { updateAt, push, removeAt, set }] = useList<FileItem>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    multiple ? (value ? value : []) : value ? [value] : []
  );
  const fileInputElement = useRef<HTMLInputElement>(null);
  const storage = useStorage();

  useEffect(() => {
    if (onChange && !viewOnly) {
      onChange(multiple ? files : files[0]);
    }
  }, [files]);

  useEffect(() => {
    if (viewOnly) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      set(multiple ? (value ? value : []) : value ? [value] : []);
    }
  }, [value]);

  const onFileChange = (fileInput: any) => {
    for (const file of fileInput.files) {
      push({
        name: file.name,
        file,
        size: file.size,
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
        <List dense={true} disablePadding>
          {files.map((file, index) => (
            <FileItemComp
              key={index}
              fileItem={file}
              handleRemove={() => {
                removeAt(index);
                if (!multiple) addFiles();
              }}
              fileActions={!viewOnly}
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

        {(multiple === true || files.length === 0) && !viewOnly && (
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
