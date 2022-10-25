import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../api';

export default function Instructors() {
  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(['course' + courseId, courseId], () => getCourseById(courseId!));

  if (isError || isLoading || !course) {
    return <Typography variant="subtitle1">No instructors</Typography>;
  }
  return (
    <Container>
      {course.instructors &&
        course.instructors.map((instructor: any) => (
          <Stack
            direction="row"
            spacing={3}
            sx={{ margin: '3% 0' }}
            alignItems="center"
          >
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/146/146031.png"
              sx={{ width: 90, height: 90 }}
            />

            <Stack>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {instructor.first_name} {instructor.last_name}
              </Typography>
              <Typography variant="subtitle1">1 learners</Typography>
              <Typography variant="subtitle1">3 courses</Typography>
            </Stack>
          </Stack>
        ))}
    </Container>
  );
}
