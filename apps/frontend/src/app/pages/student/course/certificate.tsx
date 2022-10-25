import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Typography from '@mui/material/Typography';

import { Skeleton, useTheme } from '@mui/material';

import { useQuery } from 'react-query';
import { Outlet, useParams } from 'react-router-dom';
import { getCourseById } from '../../../api';



export default function Certificate() {
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          xs=8
        </Grid>
        <Grid item xs={4}>
          xs=4
        </Grid>
        <Grid item xs={4}>
          xs=4
        </Grid>
        <Grid item xs={8}>
          xs=8
        </Grid>
      </Grid>
    </Box>
  );
}
