import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import Divider from '@mui/material/Divider';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { getCourseById } from '../api';
import React from 'react';

export default function Syllabus() {
  const { courseId } = useParams();

  const {
    data: course_material,
    isLoading,
    isError,
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  if (isError || isLoading) {
    return <Skeleton></Skeleton>;
  } 
  return (
    
    <Container>
      <Typography variant="h6">What you will learn from this course</Typography>

      <Stack direction="row" spacing={2} sx={{ margin: '6% 0 3% 0' }} alignItems='center'>
        <Stack sx={{margin:'0 5%'}} alignItems='center'>
          <Typography variant="subtitle2">WEEK</Typography>
          <Typography variant="h2">1</Typography>
        </Stack>

        <Stack sx={{ margin: '10% 0' }}>

          <Typography variant='h6' sx={{mb:2}}>{course_material.title}</Typography>
          <Typography variant='subtitle2' display="inline" placeholder='Not Specified'> {course_material.time_estimate}</Typography>
          <Typography variant='subtitle2' display="inline"> 1 reading</Typography>

        </Stack>
      </Stack>
      <Divider variant="middle" />


      <Stack direction="row" spacing={2} sx={{ margin: '3% 0' }} alignItems='center'>
        <Stack sx={{margin:'0 5%'}} alignItems='center'>
          <Typography variant="subtitle2">WEEK</Typography>
          <Typography variant="h2">2</Typography>
        </Stack>

        <Stack sx={{ margin: '10% 0' }}>

          <Typography variant='h6' sx={{mb:2}}>Memory Management</Typography>
          <Typography variant='subtitle2' display="inline" > 1 hour to complete</Typography>
          <Typography variant='subtitle2' display="inline"> 1 reading</Typography>

        </Stack>
      </Stack>
      <Divider variant="middle" />

      <Stack direction="row" spacing={2} sx={{ margin: '3% 0' }} alignItems='center'>
        <Stack sx={{margin:'0 5%'}} alignItems='center'>
          <Typography variant="subtitle2">WEEK</Typography>
          <Typography variant="h2">3</Typography>
        </Stack>

        <Stack sx={{ margin: '10% 0' }}>

          <Typography variant='h6' sx={{mb:2}}>Concurrency</Typography>
          <Typography variant='subtitle2' display="inline" > 1 hour to complete</Typography>
          <Typography variant='subtitle2' display="inline"> 1 reading</Typography>

        </Stack>
      </Stack>
  
      

    </Container>
    
  );
}
