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
import { getCourseById } from '../api';

export default function EnrollHEader() {
  const theme = useTheme();
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const enrollbutton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setValue('5');
  };

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
    <React.Fragment>
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
          <Rating name="read-only" value={4} readOnly size="small" />    
          {/* get the value from the table (total) */}

          <Typography
            display="inline"
            variant="subtitle2"
            component="h3"
            sx={{ lineHeight: 0, ml: 1 }}
          >
            34 ratings  
            {/* get the count from table */}

          </Typography>
        </Box>

        <Box
          sx={{ margin: '2% 0 0.5%', display: 'flex', alignItems: 'center' }}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU"
          />
          <Typography variant="subtitle1" style={{ margin: '0.5rem 1%' }}>
            Remy Sharp
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="Kewin Wayne"
            src="https://cdn-icons-png.flaticon.com/512/146/146031.png"
          />
          <Typography variant="subtitle1" style={{ margin: '0.5rem 1%' }}>
            Kevin Wayne
          </Typography>
        </Box>

        <Box
          sx={{ margin: '3% 1% 0 0', display: 'flex', alignItems: 'center' }}
        >
          <Button variant="contained" size="large" onClick={enrollbutton}>
            Enroll Me
          </Button>
          <Typography
            variant="subtitle2"
            display="inline"
            style={{ marginLeft: 10 }}
          >
            120 Already enrolled

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
              <Tab label="Enrollment Options" value="5" />
              <Tab label="FAQ" value="6" />
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
            <CourseEnrolmentOptions />
          </TabPanel>
          <TabPanel value="6">
            <Faq />
          </TabPanel>
        </TabContext>
      </Box>
    </React.Fragment>
  );
}
