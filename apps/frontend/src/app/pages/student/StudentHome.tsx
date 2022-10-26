import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  FormControl,
  Grid,
  LinearProgress,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useEffect, useState } from 'react';
import StudentHeader from '../../components/StudentHeader';

import { Container } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import '../../../styles.css';
import { getEnrolledCourses, getRecommendedCourses, search } from '../../api';
import CourseCard from '../../components/CourseCard';
import { Footer } from '../public/fragments/Footer';

export function InProgressCourseCard(props: { course: any; onClick: any }) {
  const { course, onClick } = props;
  const navigate = useNavigate();
  const completion = course.coursePercent;

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
            {String(completion).substring(0, 2)}% Completed
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
        <Stack
          sx={{ p: 2, display: { xs: 'none', sm: 'flex' }, width: '20%' }}
          justifyContent="center"
          alignItems="center"
        >
          {course.next && (
            <>
              <Typography variant="body2" fontWeight={600} mb={1}>
                Next
              </Typography>
              <Typography variant="body2">{course.next?.title}</Typography>
            </>
          )}
          {!course.next && course.enrollment.status === 'ACTIVE' && (
            <Button
              onClick={() =>
                navigate(`/student/${course.courseId}/complete-course`)
              }
              variant="outlined"
              size="small"
            >
              Complete Course
            </Button>
          )}
          {course.enrollment.status === 'COMPLETED' && (
            <Button
              onClick={() =>
                navigate(`/student/${course.courseId}/certificate`)
              }
              size="small"
            >
              View Certificate
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default function CoursePage(props: any) {
  const navigate = useNavigate();
  const { data } = useQuery('courses', () => search({}));
  const [statusFilter, setStatusFilter] = useState('ACTIVE');

  const { data: enrolled, refetch } = useQuery('enrolled', () =>
    getEnrolledCourses(statusFilter)
  );
  const { data: recommended } = useQuery('recom', () =>
    getRecommendedCourses()
  );

  useEffect(() => {
    refetch();
  }, [statusFilter]);

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
                <FormControl size="small" variant="standard">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={statusFilter}
                    label="Age"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value={'ACTIVE'}>In Progress</MenuItem>
                    <MenuItem value={'COMPLETED'}>Completed</MenuItem>
                    <MenuItem value={'ALL'}>All</MenuItem>
                  </Select>
                </FormControl>
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
              {enrolled && enrolled.length === 0 && (
                <Typography>No Enrolled Courses</Typography>
              )}
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
