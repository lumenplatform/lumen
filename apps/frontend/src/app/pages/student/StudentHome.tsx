import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useState } from 'react';
import StudentHeader from '../../components/StudentHeader';

import { ArrowDropDown, MoreHoriz } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import '../../../styles.css';
import { getEnrolledCourses, getRecommendedCourses, search } from '../../api';
import CourseCard from '../../components/CourseCard';
import { Footer } from '../public/fragments/Footer';
import { Container } from '@mui/system';

export function InProgressCourseCard(props: { course: any; onClick: any }) {
  const { course, onClick } = props;

  const completion = ((course.price * 3) % 100) + 5;

  return (
    <Paper sx={{ my: 2, overflow: 'clip' }}>
      <Stack direction="row">
        <Box
          sx={{
            background: `url(${course.courseImage.url})`,
            width: 180,
            backgroundSize: 'cover',
            aspectRatio: '16 / 9',
            display: { xs: 'none', sm: 'block' },
          }}
        ></Box>
        <Box
          onClick={onClick}
          sx={{
            p: 2,
            flexGrow: 1,
            cursor: 'pointer',
            ':hover': { background: (theme) => theme.palette.grey[100] },
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>{course.title}</Typography>
          <Typography variant="body2">{course.organization.name}</Typography>
          <Typography variant="caption" component="div" mt={1}>
            {completion}% Completed
          </Typography>
          <LinearProgress
            variant="determinate"
            value={completion}
            sx={{
              background: (theme) => theme.palette.grey[300],
            }}
          />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: 'none', sm: 'block' } }}
        />
        <Stack sx={{ p: 2, display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="body2" fontWeight={600}>
            Next
          </Typography>
          <Typography variant="body2">...........</Typography>
        </Stack>
        <Box>
          <Link sx={{ m: 1 }} component="div">
            <MoreHoriz />
          </Link>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function CoursePage(props: any) {
  const navigate = useNavigate();
  const { data } = useQuery('courses', () => search({}));
  const { data: enrolled } = useQuery('enrolled', () => getEnrolledCourses());
  const { data: recommended } = useQuery('recom', () =>
    getRecommendedCourses()
  );

  return (
    <div>
      <StudentHeader />
      <Divider />
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={9}>
            <Box>
              <Box>
                <Box sx={{ pt: 2 }}>
                  <Breadcrumbs>
                    <Link underline="hover" color="inherit" href="/">
                      Home
                    </Link>
                    <Typography>Learning Dashboard</Typography>
                  </Breadcrumbs>
                </Box>
              </Box>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">My Courses</Typography>
                <Button>
                  In Progress <ArrowDropDown />
                </Button>
              </Stack>

              <Box>
                {enrolled &&
                  enrolled.map((r: any) => (
                    <InProgressCourseCard
                      course={r}
                      key={r}
                      onClick={() => navigate('/student/' + r.courseId)}
                    />
                  ))}
              </Box>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Recommended For You</Typography>
                <Button onClick={() => navigate('/courses')}>View More</Button>
              </Stack>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
                  gap: 2,
                  mt: 2,
                  mb: 6,
                }}
              >
                {recommended &&
                  recommended.map((r: any) => (
                    <CourseCard course={r} key={r} />
                  ))}
              </Box>
            </Box>
          </Grid>
          {/* <Grid item xs={3}>
            <Box sx={{ pt: 3 }}>
              <Paper>Learn</Paper>
            </Box>
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export function DatePickerDemo() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
