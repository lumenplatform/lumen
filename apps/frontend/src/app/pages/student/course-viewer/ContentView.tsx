import { Box, Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getCourseById,
  getCourseMaterial,
  markTopicAsCompleted,
} from '../../../api';
import FilesInput from '../../../components/FilesInput';
import VideoPlayer from '../../../components/VideoPlayer';
import { queryClient } from '../../../providers/queryClient';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isElectron = window.electron;

export default function ContentView() {
  const { courseId, sectionId, topicId } = useParams();
  const { data } = useQuery('mat', () => getCourseMaterial(courseId!));
  const { data: course } = useQuery('course', () => getCourseById(courseId!));
  const navigate = useNavigate();

  const completionMutation = useMutation(
    () => markTopicAsCompleted(courseId!, topicId!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mat');
      },
    }
  );

  const sectionIndex = data?.findIndex((r: any) => r.id === sectionId);
  const section = data[sectionIndex];

  const topicIndex = section?.topics.findIndex((r: any) => r.id === topicId);
  const topic = section.topics[topicIndex];

  const endOfCourse = sectionIndex + 1 == data.length;
  const endOfSection = topicIndex + 1 == section.topics.length;

  const markComplete = () => {
    if (!topic.completed) {
      completionMutation.mutate();
    }

    let nextTopicId = topicId;
    let nextSectionId = sectionId;

    if (!endOfSection) {
      nextTopicId = section.topics[topicIndex + 1].id;
    } else {
      if (!endOfCourse) {
        nextSectionId = data[sectionIndex + 1].id;
        nextTopicId = data[sectionIndex + 1].topics[0].id;
      }
      if (endOfCourse) {
        navigate(`/student/${course.courseId}/complete-course`);
        return;
      }
    }

    navigate(`/student/${courseId}/learn/${nextSectionId}/${nextTopicId}`);
  };

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
          {course.instructors.map((c: any) => c.name)} -{' '}
          {course.organization.name}
        </Typography>
      </Box>

      <Box sx={{}}>
        <Box mb={2}>
          {topic.contentType === 'video' &&
            topic.video &&
            (typeof topic.video.path == 'string' || isElectron) && (
              <Box style={{ aspectRatio: '16/9' }}>
                <VideoPlayer
                  options={{ poster: course.courseImage.path }}
                  src={[{ src: topic.video.url }]}
                />
              </Box>
            )}

          {topic.contentType === 'video' &&
            topic.video &&
            (typeof topic.video.path !== 'string' && !isElectron) && (
              <VideoPlayer src={topic.video.path} />
            )}

          {topic.contentType === 'article' && (
            <div
              className="ProseMirror"
              dangerouslySetInnerHTML={{ __html: topic.article }}
            />
          )}

          {topic.contentType === 'quiz' && topic.examId && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5"> Quiz</Typography>
              <Button
                onClick={() =>
                  window.open('/student/' + courseId + '/quiz/' + topic.examId)
                }
              >
                View Quiz
              </Button>
            </Box>
          )}

          {topic.contentType !== 'quizX' && (
            <Stack direction="row" justifyContent="end">
              <Button
                variant="contained"
                disableElevation
                disabled={completionMutation.isLoading}
                onClick={markComplete}
              >
                {endOfCourse && endOfSection
                  ? 'Complete Course'
                  : endOfSection
                  ? 'Next Section'
                  : 'Next Topic'}
              </Button>
            </Stack>
          )}
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
