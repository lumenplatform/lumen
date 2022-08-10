import { Box, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCourseById, getCourseMaterial } from '../../../api';
import VideoPlayer from '../../../components/VideoPlayer';

export default function ContentView() {
  const { courseId, sectionId, topicId } = useParams();
  const { data } = useQuery('mat', () => getCourseMaterial(courseId!));
  const { data: course } = useQuery('course', () => getCourseById(courseId!));

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
        {topic.contentType === 'article' && (
          <div dangerouslySetInnerHTML={{ __html: topic.article }} />
        )}
        {topic.contentType === 'video' && typeof topic.video.path == 'string' && (
          <Box style={{ aspectRatio: '16/9' }}>
            <video
              style={{ width: '100%', height: '100%', background: 'black' }}
              controls
              src={topic.video.path}
            />
          </Box>
        )}

        {topic.contentType === 'video' &&
          typeof topic.video.path == 'object' && (
            <VideoPlayer src={topic.video.path} />
          )}

        <Typography my={1} variant="body1" fontWeight={600}>
          Description
        </Typography>
        <Box px={1}>{topic.description}</Box>
        <Typography my={1} variant="body1" fontWeight={600}>
          Resources
        </Typography>
        <Box px={1}>
          <pre style={{ whiteSpace: 'break-spaces' }}>
            {JSON.stringify(topic, null, 2)}
          </pre>
        </Box>
        <Typography my={1} variant="body1" fontWeight={600}>
          Activities
        </Typography>
        <Box px={1}>'N/A'</Box>
      </Box>
    </>
  );
}
