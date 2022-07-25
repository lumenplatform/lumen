import { Add, AddToQueue, PlaylistAdd } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import FilesInput from '../FilesInput';
import Tiptap from '../Tiptap';

export default function TopicEditor() {
  const [view, setView] = useState('default');

  const [{ contentType }, setData] = useState<{ contentType?: string }>({});

  return (
    <Box>
      <Divider />

      {view === 'default' && (
        <Box>
          {contentType &&
            (contentType === 'video' ? (
              <Box>
                <FilesInput />
              </Box>
            ) : (
              <Box>
                <Tiptap />
              </Box>
            ))}
          {!contentType && (
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
