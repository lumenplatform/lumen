import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Skeleton, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import CourseAbout from './CourseAbout';
import CourseReviews from './CourseReviews';
import Syllabus from './CourseSyllabus';
import Instructors from './EnrollmentInstructors';
import CourseEnrolmentOptions from './EnrolmentOptions';
import Faq from './FAQ';

import { useQuery } from 'react-query';
import { Outlet, useParams } from 'react-router-dom';

import { enrollInCourse, getCourseById, getCourseReview } from '../api';
import { Header } from '../pages/public/fragments/Header';
import StudentHeader from './StudentHeader';

export default function EnrollHEader() {
  const theme = useTheme();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const enrollbutton = (event: React.MouseEvent<HTMLButtonElement>) => {
    enrollInCourse(courseId!).then((r) => {
      // eslint-disable-next-line no-restricted-globals
      location.href = r.paymentUrl;
    });
  };

  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  const { data: course_reviews } = useQuery(
    ['course-reviews' + courseId, courseId],
    () => getCourseReview(courseId!)
  );

  if (isError || isLoading || !course_reviews || course_reviews.length === 0) {
    return <Typography variant="subtitle1">No Reviews Yet.</Typography>;
  }

  const totalReviews = course_reviews.length;
  const overallRating =
    course_reviews.reduce((p: any, c: any) => p + c.rating, 0) / totalReviews;

  return (
    <React.Fragment>
      <StudentHeader />
      <Box
        sx={{
          backgroundImage:
            'url(' +
            'https://media.istockphoto.com/photos/bokeh-picture-id1248398407?b=1&k=20&m=1248398407&s=170667a&w=0&h=Th_6hTCGv-exKITb_lOleR5duCisQB1T1V8Y7Xyd-hM=' +
            ')',
          backgroundSize: 'cover',
          padding: '40px',
        }}
      >
        <Typography variant="h3" component="h3">
          {course.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            name="read-only"
            value={overallRating}
            readOnly
            size="small"
          />

          {/* get the value from the table (total) */}

          <Typography
            display="inline"
            variant="subtitle2"
            component="h3"
            sx={{ lineHeight: 0, ml: 1 }}
          >
            {totalReviews} reviews
            {/* get the count from table */}
          </Typography>
        </Box>

        {course.instructors.map((instructor: any) => (
          <Box
            sx={{ margin: '2% 0 0.5%', display: 'flex', alignItems: 'center' }}
          >
            <Avatar alt={instructor.name} src={instructor.picture} />
            <Typography variant="subtitle1" style={{ margin: '0.5rem 1%' }}>
              {instructor.name}
            </Typography>
          </Box>
        ))}

        <Box
          sx={{ margin: '1.5% 0 0 0', display: 'flex', alignItems: 'center' }}
        >
          {' '}
          <Typography variant="h6" lineHeight={1} mb="20px">
            Course Fee: ${course.price}.00
          </Typography>
        </Box>

        <Box
          sx={{ margin: '1% 1% 0 0', display: 'flex', alignItems: 'center' }}
        >
          <Button variant="contained" size="large" onClick={enrollbutton}>
            Enroll Me
          </Button>
          <Typography
            variant="subtitle2"
            display="inline"
            style={{ marginLeft: 10 }}
          >
            3 Already enrolled
            {/* get the total */}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons={true}
              allowScrollButtonsMobile
            >
              <Tab label="About" value="1" />
              <Tab label="Instructors" value="2" />
              <Tab label="Syllabus" value="3" />
              <Tab label="Reviews" value="4" />
              <Tab label="FAQ" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CourseAbout />
          </TabPanel>
          <TabPanel value="2">
            <Instructors />
          </TabPanel>
          <TabPanel value="3">
            <Syllabus />
          </TabPanel>
          <TabPanel value="4">
            <CourseReviews />
          </TabPanel>
          <TabPanel value="5">
            <Faq />
          </TabPanel>
        </TabContext>
      </Box>
    </React.Fragment>
  );
}
