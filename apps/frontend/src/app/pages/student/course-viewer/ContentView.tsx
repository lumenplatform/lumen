import { Box, Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  getCourseById,
  getCourseMaterial,
  markTopicAsCompleted,
} from '../../../api';
import FilesInput from '../../../components/FilesInput';
import VideoPlayer from '../../../components/VideoPlayer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isElectron = window.electron;

export default function ContentView() {
  const { courseId, sectionId, topicId } = useParams();
  const { data } = useQuery('mat', () => getCourseMaterial(courseId!));
  const { data: course } = useQuery('course', () => getCourseById(courseId!));
  const completionMutation = useMutation(() =>
    markTopicAsCompleted(courseId!, topicId!)
  );

  const section = data?.filter((r: any) => r.id === sectionId)[0];
  const topic = section?.topics.filter((r: any) => r.id === topicId)[0];

  if (!topic || !course) {
    return null;
  }

  return (
    <>
      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          {topic.title}
        </Typography>
        <Typography variant="caption">
          Prof. Gilbert Strang, Massachusetts Institute of Technology
        </Typography>
      </Box>

      <Box sx={{}}>
        <Box mb={2}>
          {topic.contentType == 'video' &&
            topic.video &&
            (typeof topic.video.path == 'string' || isElectron) && (
              <Box style={{ aspectRatio: '16/9' }}>
                <VideoPlayer
                  options={{ poster: course.courseImage.path }}
                  src={[{ src: topic.video.url }]}
                />
              </Box>
            )}

          {topic.contentType == 'video' &&
            topic.video &&
            (typeof topic.video.path == 'string' || !isElectron) && (
              <VideoPlayer src={topic.video.path} />
            )}

          {topic.contentType == 'article' && (
            <div
              className="ProseMirror"
              dangerouslySetInnerHTML={{ __html: topic.article }}
            />
          )}
          <Stack direction="row" justifyContent='end'>
            <Button
              variant="outlined"
              disabled={completionMutation.isLoading}
              onClick={() => completionMutation.mutate()}
            >
              Mark as Completed
            </Button>
          </Stack>
        </Box>

        <Typography my={1} variant="body1" fontWeight={600}>
          Description / Notes
        </Typography>
        <Box px={1}>{topic.description}</Box>
        <Typography my={1} variant="body1" fontWeight={600}>
          Resources
        </Typography>
        <Box>
          <FilesInput
            viewOnly={true}
            multiple
            value={topic.resources?.map((r: any) => r.asset)}
          />
        </Box>
        {/* <Typography my={1} variant="body1" fontWeight={600}>
          Activities
        </Typography>
        <Box px={1}>N/A</Box> */}
        {/* <small>
          <pre style={{ whiteSpace: 'break-spaces' }}>
            {JSON.stringify(topic, null, 2)}
          </pre>
        </small> */}
      </Box>
    </>
  );
}
