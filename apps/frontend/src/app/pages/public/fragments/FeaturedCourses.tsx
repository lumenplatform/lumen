import { Box, Card, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
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
            <Container sx={{ height: '100%' , display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center'  }}>
              <Typography fontSize={'2rem'} fontWeight="600">
                Most<br/>Popular<br/>Courses
              </Typography>
              <Box sx={{textAlign:'right'}}>
              <img
              src="/assets/images/illustration_5.png"
              style={{ width: '60%' ,alignSelf:'right'}}
              alt=""
            />
            </Box>
            </Container>
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
