import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from '../components/Auth';
import Typography from '@mui/material/Typography';

import { Avatar, Skeleton, useTheme } from '@mui/material';

import { useQuery } from 'react-query';
import { Outlet, useParams } from 'react-router-dom';

import Button from '@mui/material/Button';

import { fetchUser, getCourseById } from '../api';

export default function Certificate() {
  const { courseId } = useParams();
  const {
      data: course,
      isLoading,
      isError,
    } = useQuery(['courses', courseId], () => getCourseById(courseId!));

    const { user } = useAuth();

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    
    if (!user) {
      return <Skeleton variant="rectangular" width={210} height={118} />;
    }

    if (isError || isLoading) {
      return <Skeleton></Skeleton>;
    }

  return (

<Grid container spacing={2} sx={{}}>
    <Grid container xs={1} sx={{  }}></Grid>
    <Grid container xs={10} sx={{  }}>

  <Grid container spacing={2} sx={{mt: 3}}>
    <Grid container xs={1} sx={{  }}></Grid>
    <Grid container xs={10} sx={{border: 1  }}>
      <Grid container sx={{}}>
        <Grid item xs={12} sx={{  }}>
          <img
            src="https://i.imgur.com/6hSyKOZ.png"
            style={{ maxWidth: '100%' }}
          />
        </Grid>
        <Grid container xs={8} sx={{ paddingLeft: 2}}>
          <Grid container xs={1} sx={{  mt: 3, }}>
            <Avatar alt="Remy Sharp" src={course.organization.theme?.logo?.path}  />
          </Grid>
          <Grid container xs={8} >
            <Grid container xs={12} sx={{  }}>
              <Typography variant="h6" style={{ whiteSpace: 'pre-line' }}>
              {course.organization.name}
              </Typography>
            </Grid>
            <Grid container xs={12} sx={{ }}>
              <Typography variant="body1" display="block">
                Stanford,
              </Typography>
            </Grid>
            <Grid container xs={12} sx={{ }}>
              <Typography variant="body1">California.</Typography>
            </Grid>
          </Grid>
          <Grid container xs={3} sx={{}}>
            
          </Grid>
          <Grid container xs={9} sx={{ mt: 4 }}>
            <Grid container xs={12} sx={{}}>
              <Typography variant="body1">Completed on: {date}</Typography>
            </Grid>
            <Grid container xs={12} sx={{}}>
              <Typography variant="h4">{user.name}</Typography>
            </Grid>
            <Grid container xs={12} sx={{}}>
              <Typography variant="body1">
                has successfully completed the
              </Typography>
            </Grid>
            <Grid container xs={12} sx={{}}>
              <Typography variant="h6">
              {course.title}
              </Typography>
            </Grid>
            <Grid container xs={12} sx={{}}>
              <Typography variant="body1" sx={{ paddingRight: 1 }}>
                an online non-credit course offered by
              </Typography>
              <Typography variant="body1" sx={{ paddingRight: 1 }}>
                <b>{course.organization.name}</b>
              </Typography>
              <Typography variant="body1" sx={{ paddingRight: 1 }}>
                through Lumén.
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={3} sx={{  }}>
            
          </Grid>
          <Grid container xs={12} sx={{  }}>
            <Grid container xs={12} sx={{}}>
              <Typography variant="h6" sx={{ mt: 12 }}>
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
        <Grid container xs={4} sx={{  }}>
          <img
            src="https://i.imgur.com/lUVc3lb.png"
            style={{ maxHeight: '300px', marginLeft: '40%' }}
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
            style={{ maxWidth: '100%' }}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid container xs={1} sx={{ }}></Grid>
  </Grid>

  </Grid>
  </Grid>

  );
}

