import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Skeleton, useTheme } from '@mui/material';

import { useQuery } from 'react-query';
import { Outlet, useParams } from 'react-router-dom';
import { getCourseById } from '../api';

export default function CourseAbout() {
  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  if (isError || isLoading) {
    return <Skeleton></Skeleton>;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Typography variant="h6">About this course</Typography>
        {/* <Typography variant="subtitle2">12 recent views</Typography> */}

        <Typography variant="body1" sx={{ mt: 4, mb: 4 }}>
          {course.description}
        </Typography>

        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Skills that you will gain
          </Typography>
          {/* <Stack direction="row" spacing={1}> */}
          <Grid container spacing={1}>
            <Grid item>
              {/* <Chip label="Operating Systems" /> */}
              {course.description}   
            </Grid>
            {/* <Grid item>
              <Chip label="Computer Architecture" />
            </Grid>
            <Grid item>
              <Chip label="Memory Management" />
            </Grid> */}
            {/* </Stack> */}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
