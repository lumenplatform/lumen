import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { search } from '../../../api';
import CourseCard from '../../../components/CourseCard';

export function FeaturedCourses() {
  const { data } = useQuery('featuredCourses', () => search({}));

  return (
    <Box sx={{}}>
      <Container>
        <Grid container sx={{ p: 3 }} spacing={2}>
          <Grid item xs={3}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'end',
              }}
            >
              <Typography variant="h6">
                Most Popular
                <br />
                Courses
              </Typography>
              <Box sx={{ textAlign: 'right' }}>
                <img
                  src="/assets/images/illustration_5.png"
                  style={{
                    width: '100%',
                    alignSelf: 'right',
                    transform: 'scaleX(-1)',
                  }}
                  alt=""
                />
              </Box>
            </Box>
          </Grid>
          {data &&
            data.slice(0, 3).map((e: any) => (
              <Grid item xs={3}>
                <CourseCard course={e} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
