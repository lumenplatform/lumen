import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Typography from '@mui/material/Typography';

import { Avatar, Skeleton, useTheme } from '@mui/material';

import { useQuery } from 'react-query';
import { Outlet, useParams } from 'react-router-dom';

import Button from '@mui/material/Button';

// import { getCourseById } from '../../../api';

export default function Certificate() {
  // const { courseId } = useParams();
  // const {
  //     data: course,
  //     isLoading,
  //     isError,
  //   } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  //   if (isError || isLoading) {
  //     return <Skeleton></Skeleton>;
  //   }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ border: 1 }}>
        <img
          src="https://i.imgur.com/6hSyKOZ.png"
          style={{ maxHeight: '400px' }}
        />
      </Grid>
      <Grid container xs={6} sx={{ border: 1 }}>
        <Grid container xs={1} sx={{ border: 1 }}>
          <Avatar alt="Remy Sharp" src="https://i.imgur.com/42Psi7n.png" />
        </Grid>
        <Grid container xs={8} sx={{ border: 1 }}>
          <Typography variant='h6'   style={{whiteSpace: 'pre-line'}}>Univerity of Colombo, </Typography>
          <Typography variant='body1' display="block">Colombo,</Typography>
          <Typography variant='body1'>Sri Lanka.</Typography>
        </Grid>
        <Grid container xs={3} sx={{ border: 1 }}>
          2.3
        </Grid>
        <Grid container xs={9} sx={{ border: 1 }}>
          2.4
        </Grid>
        <Grid container xs={3} sx={{ border: 1 }}>
          2.5
        </Grid>
        <Grid container xs={12} sx={{ border: 1 }}>
          2.6
        </Grid>
      </Grid>
      <Grid container xs={6} sx={{ border: 1 }}>
        3
      </Grid>
      <Grid item xs={12} sx={{ border: 1 }}>
        4
      </Grid>
    </Grid>
  );
}
