import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';

import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCourseReview } from '../api';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CourseReviews(props: any) {
  const { courseId } = useParams();

  const {
    data: course_reviews,
    isLoading,
    isError,
  } = useQuery(['course-reviews' + courseId, courseId], () =>
    getCourseReview(courseId!)
  );

  if (isError || isLoading || !course_reviews || course_reviews.length === 0) {
    return <Typography variant="subtitle1">No Reviews Yet.</Typography>;
  }

  const totalReviews = course_reviews.length;
  const overallRating =
    course_reviews.reduce((p: any, c: any) => p + c.rating, 0) / totalReviews;

  const counts = course_reviews.reduce(
    (p: any, c: any) => {
      const r = [...p];
      r[c.rating - 1] += 1;
      return r;
    },
    [0, 0, 0, 0, 0]
  );

  return (
    <div>
      <Grid container spacing={2} rowSpacing={1}>
        <Grid item xs={3} md={3}>
          <Box
            sx={{
              display: 'flex',
              margin: '',
              backgroundColor: 'white',
              height: '100px',
              width: '50%',
              paddingLeft: '8px',
            }}
          >
            <h1>{overallRating}</h1>
            <Box sx={{ paddingTop: '20px', paddingLeft: '8px' }}>
              <Rating name="read-only" value={overallRating} readOnly size="small" />
              <div style={{ height: '48px', paddingTop: '' }}>
                {totalReviews} Reviews{' '}
              </div>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Item>
            {counts &&
              counts
                .map((k: number, index: number) => (
                  <Grid container spacing={2}>
                    <Grid item xs={2} md={2}>
                      {index + 1} stars
                    </Grid>
                    <Grid item xs={8} md={8}>
                      <Box sx={{ mt: '6px' }}>
                        <LinearProgress
                          variant="determinate"
                          value={(k / totalReviews) * 100}
                        />{' '}
                      </Box>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      {(k / totalReviews) * 100}%
                    </Grid>
                  </Grid>
                ))
                .reverse()}
          </Item>
        </Grid>

        <Grid item xs={10} md={10}>
          <Item>
            {course_reviews.map((review: any) => (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={review.user.name} src={review.user.picture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box>
                          <Typography
                            sx={{ display: 'inline', fontWeight: 600 }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {review.user.name}
                          </Typography>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="caption"
                            color="text.primary"
                          >
                            {/* {' - ' + review.courseName} */}
                          </Typography>
                        </Box>
                        <Rating
                          name="size-small"
                          defaultValue={review.rating}
                          size="small"
                          readOnly
                          sx={{ mr: 0.5 }}
                        />
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                          color="text.primary"
                        >
                          {/* {review.date} */}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {review.review}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="middle" />
              </>
            ))}
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}
