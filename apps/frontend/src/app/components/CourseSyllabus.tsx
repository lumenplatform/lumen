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
import { getCourseById, getCourseMaterial } from '../api';
import React from 'react';

export default function Syllabus() {
  const { courseId } = useParams();

  let x = 1;

  const {
    data: course_material,
    isLoading,
    isError,
  } = useQuery(['courses-matx' + courseId, courseId], () =>
    getCourseMaterial(courseId!)
  );

  if (isError || isLoading || !course_material) {
    return <Skeleton></Skeleton>;
  }
  return (
    <Container>
      <Typography variant="h6">What you will learn from this course</Typography>
      {course_material &&
        course_material.map((syllabus: any) => (
          <Stack
            direction="row"
            spacing={2}
            sx={{ margin: '6% 0 3% 0' }}
            alignItems="center"
          >
            <>
              <Stack sx={{ margin: '0 5%' }} alignItems="center">
                <Typography variant="subtitle2">TITLE</Typography>
                <Typography variant="h2">{x++}</Typography>
              </Stack>
              <Stack sx={{ margin: '10% 0' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {syllabus.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  display="inline"
                  placeholder="Not Specified"
                >
                  {' '}
                  {syllabus.time_estimate}
                </Typography>
                <Typography variant="subtitle2" display="inline">
                  {' '}
                  {syllabus.time_estimate}
                </Typography>
                <Typography variant="subtitle2" display="inline">
                  {' '}
                  1 reading
                </Typography>
                <Divider />
              </Stack>
              
            </>
          </Stack>
        ))}
    </Container>
  );
}
