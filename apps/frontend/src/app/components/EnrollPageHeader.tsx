import * as React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import CourseAbout from './CourseAbout';
import Syllabus from './CourseSyllabus';
import Instructors from './EnrollmentInstructors';

export default function EnrollHEader() {
  const theme = useTheme();
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
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
          Operating Systems
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating name="read-only" value={4} readOnly size="small" />
          <Typography
            display="inline"
            variant="subtitle2"
            component="h3"
            sx={{ lineHeight: 0, ml: 1 }}
          >
            34 ratings
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
          <Button variant="contained" size="large">
            Enroll Me
          </Button>
          <Typography
            variant="subtitle2"
            display="inline"
            style={{ marginLeft: 10 }}
          >
            120 Already enrolled
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
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
          <TabPanel value="4">Item Three</TabPanel>
          <TabPanel value="5">Item Three</TabPanel>
          <TabPanel value="6">Item Three</TabPanel>
        </TabContext>
      </Box>
    </React.Fragment>
  );
}

// import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';

// //didn't make this yet. Don't review

// export default function CourseAbout() {
//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <Container maxWidth="sm">
//         <h3>About this course</h3>
//         <h5><i>125 recent views</i></h5>

//         <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

//         <Box>
//           <h3>Skills that you will gain</h3>
//         </Box>
//       </Container>
//     </React.Fragment>
//   );
// }
