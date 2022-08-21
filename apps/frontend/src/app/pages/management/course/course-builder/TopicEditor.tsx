import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
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
  const [data, setData] = useState<{
    contentType?: string;
    article?: string;
    video?: any;
    description?: string;
    resources?: any;
    showDescription?: boolean;
    timeEstimate: number;
  }>({ ...(topic ?? {}), showDescription: topic.description?.length > 0 });

  useEffect(() => {
    updateItem(data);
  }, [data]);

  return (
    <Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography>
          Main Material
          {data.contentType && (
            <>
              <span style={{ textTransform: 'capitalize' }}>
                {' - '}
                {data.contentType}
              </span>
              &nbsp;
              <Button
                sx={{ p: 0 }}
                onClick={() =>
                  setData((d) => ({ ...d, contentType: undefined }))
                }
              >
                Change Type
              </Button>
            </>
          )}
        </Typography>

        {!data.contentType && (
          <Stack spacing={1} direction="row">
            <Button
              onClick={() => setData((d) => ({ ...d, contentType: 'video' }))}
              startIcon={<Add />}
            >
              Video
            </Button>
            <Button
              onClick={() => setData((d) => ({ ...d, contentType: 'article' }))}
              startIcon={<Add />}
            >
              Article
            </Button>
            <Button
              onClick={() => setData((d) => ({ ...d, contentType: 'quiz' }))}
              startIcon={<Add />}
            >
              Quiz
            </Button>
          </Stack>
        )}

        {data.contentType === 'video' && (
          <FilesInput
            accept="video/*"
            value={data.video}
            onChange={(video: any) => setData((d) => ({ ...d, video }))}
          />
        )}

        {data.contentType === 'article' && (
          <Tiptap
            onChange={(article: string) => setData((d) => ({ ...d, article }))}
            content={data.article}
          />
        )}
        <Stack direction="row" alignItems="flex-end" mb={2} mx={2}>
          <Typography component={'span'} variant="body2">
            Time to Complete :{' '}
          </Typography>
          <TextField
            size="small"
            inputProps={{
              step: '5',
            }}
            variant="standard"
            onChange={(e) =>
              setData((d) => ({ ...d, timeEstimate: parseInt(e.target.value) }))
            }
            value={data.timeEstimate || 0}
            type="number"
          />
          Minutes
        </Stack>
        <Typography>Supplementary Material</Typography>

        {data.showDescription && (
          <TextField
            sx={{ my: 2, mx: 1 }}
            multiline
            fullWidth
            label="Description"
            value={data.description}
            rows={2}
            onChange={(e) =>
              setData((d) => ({ ...d, description: e.target.value }))
            }
          />
        )}

        {data.resources !== undefined && (
          <Box>
            <Typography variant="body2">Resources</Typography>
            <FilesInput
              multiple
              value={data.resources.map((r: any) => r.asset)}
              onChange={(r: any) =>
                setData((d) => ({
                  ...d,
                  resources: r.map((k: any) => ({ asset: k })),
                }))
              }
            />
          </Box>
        )}

        <Box sx={{ px: 1 }}>
          <Stack spacing={1} direction="row">
            {!data.showDescription && (
              <Button
                onClick={() =>
                  setData((d) => ({ ...d, showDescription: true }))
                }
                startIcon={<Add />}
              >
                Description
              </Button>
            )}

            {data.resources === undefined && (
              <Button
                onClick={() => setData((d) => ({ ...d, resources: [] }))}
                startIcon={<Add />}
              >
                Resources
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
