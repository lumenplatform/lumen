import { Box, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCourseMaterial } from '../../../api';
import VideoPlayer from '../../../components/VideoPlayer';

function CourseResources() {
  const { courseId, sectionId, topicId } = useParams();
  const { data } = useQuery('mat', () => getCourseMaterial(courseId!));

  const topic =
    data &&
    data
      .filter((r: any) => r.id == sectionId)[0]
      .topics.filter((r: any) => r.id == topicId)[0];

  if (!topic) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
        {topic.title}
      </Typography>

      <Box sx={{ my: 5 }}>
        {topic.contentType === 'article' && (
          <div dangerouslySetInnerHTML={{ __html: topic.article }} />
        )}
        {topic.contentType === 'video' &&
          typeof topic.video.path == 'string' && (
            <video controls src={topic.video.path} />
          )}
        {topic.contentType === 'video' &&
          typeof topic.video.path == 'object' && (
            <VideoPlayer src={topic.video.path} />
          )}
        {/* <small>
          <pre style={{ whiteSpace: 'break-spaces' }}>
            {JSON.stringify(topic, null, 2)}
          </pre>
        </small> */}
      </Box>
    </>
  );
}

export default CourseResources;
