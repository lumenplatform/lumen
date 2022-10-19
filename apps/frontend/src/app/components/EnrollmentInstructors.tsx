import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Skeleton, useTheme } from '@mui/material';

import { useQuery } from 'react-query';
import { Outlet, useParams } from 'react-router-dom';
import { getCourseById } from '../api';

export default function Instructors() {
  const { courseId } = useParams();

  const  {
    data: course_instructors,
    isLoading,
    isError,
  } = useQuery(['course-instructors'+courseId, courseId], () => getCourseById(courseId!));

  if (isError || isLoading) {
    return <Typography variant="subtitle1">No instructors</Typography>;
  }
  return (
    <Container>
      {course_instructors.map((instructor:any) => (
      <Stack
        direction="row"
        spacing={3}
        sx={{ margin: '3% 0' }}
        alignItems="center"
      >
        <Avatar
          alt="Kewin Wayne"
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
      ))};
    </Container>
  );
}
