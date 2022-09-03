import { BlockBlobClient } from '@azure/storage-blob';
import {
  DeleteOutlined,
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
  CircularProgress,
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
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Component, ContextType, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useList } from 'react-use';
import { useAuth } from './Auth';
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
  return colors[r.toLowerCase()] ? colors[r.toLowerCase()] : '#03a9f4';
}

function AssetOptions(props: { onChange?: any; value?: any; mime?: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>();

  const handleClose = () => setOpen(false);
  const isVideo = props.mime?.startsWith('video');
  const isPdf = props.mime === 'application/pdf';

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

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
          <table style={{ lineHeight: 1 }}>
            <tbody>
              <tr>
                <td>Disable Downloading&nbsp; &nbsp;</td>
                <td>
                  <RadioGroup
                    row={true}
                    value={value?.down}
                    onChange={(r) => {
                      setValue((e: any) => ({ ...e, down: r.target.value }));
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </td>
              </tr>
              <tr style={{ opacity: isVideo || isPdf ? 1 : '.3' }}>
                <td>
                  Watermark &nbsp; &nbsp;
                  <br /> <small>video / pdf</small>
                </td>
                <td>
                  <RadioGroup
                    row={true}
                    value={value?.watermark}
                    onChange={(r) => {
                      setValue((e: any) => ({
                        ...e,
                        watermark: r.target.value,
                      }));
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </td>
              </tr>
              <tr style={{ opacity: isVideo ? 1 : '.3' }}>
                <td>
                  No Screen Capture
                  <br /> <small>video </small>
                </td>
                <td>
                  <RadioGroup
                    row={true}
                    value={value?.sc}
                    onChange={(r) => {
                      setValue((e: any) => ({ ...e, sc: r.target.value }));
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </td>
              </tr>
              {/* <tr style={{ opacity: isVideo ? 1 : '.3' }}>
              <td>
                Verified Media Path <br /> <small>video</small>
              </td>
              <td>
                <RadioGroup
                  row={true}
                  onChange={(r) => {
                    setValue((e: any) => ({ ...e, vmp: r.target.value }));
                  }}
                >
                  <FormControlLabel
                    control={<Radio defaultChecked />}
                    value={true}
                    label="Yes"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    value={false}
                    label="No"
                  />
                </RadioGroup>
              </td>
            </tr> */}
            </tbody>
          </table>

          {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
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

async function addWatermark(url: string, watermark: string) {
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    const { width, height } = page.getSize();

    for (let x = 0; x < width; x += 100) {
      for (let y = 0; y < height; y += 100) {
        page.drawText(watermark, {
          x: x + (y % 200 === 0 ? -20 : 0),
          y: y,
          size: 10,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          rotate: degrees(45),
          lineHeight: 12,
          opacity: 0.2,
        });
      }
    }
  }

  const pdfDataURL = await pdfDoc.saveAsBase64({ dataUri: true });

  return pdfDataURL;
}

function AssetView(props: { url?: any; name: string; path?: string }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [blobURL, setBlobURL] = useState<string>(null!);

  const handleOpen = () => {
    const ext = getExtension(props.name);
    if (['pdf'].includes(ext.toLowerCase())) {
      setOpen(true);
    } else {
      window.open(props.path, '_blank')?.focus();
    }
  };

  useEffect(() => {
    const ext = getExtension(props.name);
    if (['pdf'].includes(ext.toLowerCase())) {
      const processedBlob = async () => {
        const data = await addWatermark(
          props.path!,
          `${user?.email}\n${new Date().toLocaleString()}`
        );
        setBlobURL(() => data);
      };

      processedBlob().catch(console.log);
    }
  }, [props]);

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
          {blobURL && (
            <embed
              style={{ minWidth: '80vw', minHeight: '80vh' }}
              src={blobURL}
            ></embed>
          )}
          {!blobURL && (
            <Stack spacing={3} alignItems="center">
              <img
                src="/assets/icons/logo_horiz.png"
                style={{ width: '12rem' }}
              />
              <CircularProgress color="inherit" />
            </Stack>
          )}
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
    showSettings?: boolean;
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
          // TODO : add a random Prefix ?
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
                (e.loadedBytes / this.props.fileItem.size) * 100
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
      fileItem: { uploading, size, name, url, mime, config, path },
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
            <Box
              sx={{
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? 'white' : 'black',
              }}
            >
              {this.props.showSettings && (
                <AssetOptions
                  value={config}
                  mime={mime}
                  onChange={(config: any) => this.props.updateItem({ config })}
                />
              )}
              {/* {this.props.removeType === 'delete' ? ( */}
              <IconButton edge="end" color="error" onClick={handleRemove}>
                <DeleteOutlined />
              </IconButton>
              {/* ) : (  
                <Button onClick={handleRemove} color="secondary">
                  Replace
                </Button>
                )} */}
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
          primary={<AssetView name={name} path={path} />}
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
  path?: string;
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
  showSettings?: boolean;
  accept?: string;
  value?: FileItem[] | FileItem;
  viewOnly?: boolean;
};

function FilesInput(props: FileInputProps) {
  const { multiple, viewOnly, onChange, value, accept } = props;
  const [files, setFiles] = useState<FileItem[]>([]);

  const [valueSet, setValueSet] = useState(false);

  const fileInputElement = useRef<HTMLInputElement>(null);
  const storage = useStorage();

  const change = (updatedFiles: FileItem[]) => {
    if (onChange && !viewOnly) {
      onChange(multiple ? updatedFiles : updatedFiles[0]);
    }
  };

  useEffect(() => {
    change(files);
  }, [files]);

  useEffect(() => {
    if (value && valueSet === false) {
      if (multiple) {
        setFiles((value ? value : []) as FileItem[]);
      } else {
        setFiles(value ? [value as FileItem] : []);
      }
      setValueSet(true);
    }
  }, [value]);

  const onFileChange = (fileInput: any) => {
    setFiles((crr) => {
      const newFiles = [];

      for (const file of fileInput.files) {
        newFiles.push({
          name: file.name,
          file,
          size: file.size,
          uploading: true,
          mime: file.type,
          config: {},
        });
      }

      fileInput.value = null;
      const updatedFiles = [...crr, ...newFiles];
      return updatedFiles;
    });
  };

  const onFileUpdate = (index: number, data: FileItem) => {
    setFiles((crr) => {
      const updatedFiles = [...crr];
      updatedFiles.splice(index, 1, data);
      console.log(updatedFiles);
      return updatedFiles;
    });
  };

  const onFileRemove = (index: number) => {
    setFiles((crr) => {
      const updatedFiles = [...crr];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });

    if (!multiple) addFiles();
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
              showSettings={props.showSettings}
              handleRemove={() => onFileRemove(index)}
              fileActions={!viewOnly}
              updateItem={(c: any) => onFileUpdate(index, { ...file, ...c })}
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
