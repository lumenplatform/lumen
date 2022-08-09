import { Add, AddToQueue, PlaylistAdd } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FilesInput from '../../../../components/FilesInput';
import Tiptap from '../../../../components/Tiptap';

export default function TopicEditor({
  updateItem,
  topic,
}: {
  updateItem: (e: any) => void;
  topic: any;
}) {
  const [view, setView] = useState('default');
  const [data, setData] = useState<{
    contentType?: string;
    article?: string;
    video?: any;
  }>(topic ?? {});

  useEffect(() => {
    updateItem(data);
  }, [data]);

  return (
    <Box>
      <Divider />
      {view === 'default' && (
        <Box>
          {data.contentType &&
            (data.contentType === 'video' ? (
              <Box>
                <FilesInput
                  value={data.video}
                  onChange={(video: any) => setData((d) => ({ ...d, video }))}
                />
              </Box>
            ) : (
              <Box>
                <Tiptap
                  onChange={(article: string) =>
                    setData((d) => ({ ...d, article }))
                  }
                  content={data.article}
                />
              </Box>
            ))}
          {!data.contentType && (
            <Box sx={{ p: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setView('add-content')}
              >
                <Add fontSize="small" /> &nbsp; Content
              </Button>
            </Box>
          )}
          {/* &nbsp; <Button size="small" variant="outlined">
            <Add fontSize="small" /> &nbsp; Description
          </Button> */}
        </Box>
      )}

      {view === 'add-content' && (
        <Box sx={{ p: 1 }}>
          <Typography>Select Content Type</Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setData({ contentType: 'video' });
              setView('default');
            }}
            startIcon={<AddToQueue />}
          >
            Video
          </Button>{' '}
          <Button
            variant="outlined"
            onClick={() => {
              setData({ contentType: 'article' });
              setView('default');
            }}
            startIcon={<PlaylistAdd />}
          >
            Article
          </Button>
        </Box>
      )}
    </Box>
  );
}
