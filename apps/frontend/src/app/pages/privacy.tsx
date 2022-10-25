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
      <Grid container xs={8} sx={{ border: 1 }}>
        <Grid container xs={1} sx={{ border: 1, mt: 3 }}>
          <Avatar alt="Remy Sharp" src="https://i.imgur.com/42Psi7n.png" />
        </Grid>
        <Grid container xs={8} sx={{ border: 1 }}>
          <Grid container xs={12} sx={{ border: 1 }}>
            <Typography variant="h6" style={{ whiteSpace: 'pre-line' }}>
              Univerity of Colombo,{' '}
            </Typography>
          </Grid>
          <Grid container xs={12} sx={{ border: 1 }}>
            <Typography variant="body1" display="block">
              Colombo,
            </Typography>
          </Grid>
          <Grid container xs={12} sx={{ border: 1 }}>
            <Typography variant="body1">Sri Lanka.</Typography>
          </Grid>
        </Grid>
        <Grid container xs={3} sx={{ border: 1 }}>
          2.3
        </Grid>
        <Grid container xs={9} sx={{ border: 1 }}>
          <Grid container xs={12} sx={{}}>
            <Typography variant="body1">20th of Nov, 2022</Typography>
          </Grid>
          <Grid container xs={12} sx={{}}>
            <Typography variant="h4">Cardan Greenbriar</Typography>
          </Grid>
          <Grid container xs={12} sx={{}}>
            <Typography variant="body1">
              has successfully completed the
            </Typography>
          </Grid>
          <Grid container xs={12} sx={{}}>
            <Typography variant="h6">
              Operations Research Introduction{' '}
            </Typography>
          </Grid>
          <Grid container xs={12} sx={{}}>
            <Typography variant="body1" sx={{ paddingRight: 1 }}>
              an online non-credit course offered by{' '}
            </Typography>
            <Typography variant="body1" sx={{ paddingRight: 1 }}>
              <b>University of Colombo</b>
            </Typography>
            <Typography variant="body1" sx={{ paddingRight: 1 }}>
              through Lumén.
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={3} sx={{ border: 1 }}>
          2.5
        </Grid>
        <Grid container xs={12} sx={{ border: 1 }}>
          <Grid container xs={12} sx={{}}>
            <Typography variant="h6" sx={{ mt: 30 }}>
              ________________________________{' '}
            </Typography>
          </Grid>
          <Grid container xs={12} sx={{}}>
            <Typography variant="subtitle2" sx={{}}>
              {' '}
              Jude Duarte{' '}
            </Typography>
          </Grid>
          <Grid container xs={12} sx={{}}>
            <Typography variant="subtitle2" sx={{}}>
              {' '}
              Bank of America Research Professor of Business Administration{' '}
            </Typography>
          </Grid>
          <Grid container xs={12} sx={{}}>
            <Typography variant="subtitle2" sx={{}}>
              {' '}
              Darden School of Business{' '}
            </Typography>
          </Grid>
          <Grid container xs={12} sx={{}}>
            <Typography variant="subtitle2" sx={{}}>
              University of Virginia
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs={4} sx={{ border: 1 }}>
        <img
          src="https://i.imgur.com/lUVc3lb.png"
          style={{ maxHeight: '400px', marginLeft: '40%' }}
        />

        <Grid container xs={12} sx={{}}>
          <Typography variant="subtitle2" sx={{ mt: 4 }}>
            Verify at Lumén.org/verify/3DJKASHD2 Lumén has confirmed the
            identity of this new individual and their participation in the the
            course.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{}}>
        <img
          src="https://i.imgur.com/6hSyKOZ.png"
          style={{ maxHeight: '400px' }}
        />
      </Grid>
    </Grid>
  );
}
