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
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  if (isError || isLoading) {
    return <Typography variant="subtitle1">No instructors</Typography>;
  }
  return (
    <Container>
      <Stack
        direction="row"
        spacing={3}
        sx={{ margin: '2% 0' }}
        alignItems="center"
      >
        <Avatar
          alt="Remy Sharp"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU"
          sx={{ width: 90, height: 90 }}
        />
        <Stack>
          <Typography variant="h6" sx={{ mb: 1 }}>
          {course_instructors.first_name} {course_instructors.last_name}
          </Typography>
          <Typography variant="subtitle1">2 learners</Typography>
          <Typography variant="subtitle1">1 courses</Typography>
        </Stack>
      </Stack>

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
            {course_instructors.first_name} {course_instructors.last_name}
          </Typography>
          <Typography variant="subtitle1">1 learners</Typography>
          <Typography variant="subtitle1">3 courses</Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
