import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useTheme} from '@mui/material';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import CourseAbout from './CourseAbout';
import Stack from '@mui/material/Stack';


export default function EnrollHEader() {
  const theme = useTheme();
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>


        <Box sx={{ bgcolor:'#9fc9ae', padding:'40px' }}>
            <h2>Operating Systems</h2> 
            <Rating name="read-only" value= {4} readOnly />  &nbsp; &nbsp; 34 ratings
            <br/><br/>

            Instructors : <br/><br/>
            <Stack direction="row" spacing={2}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> &nbsp; &nbsp;Remy Sharp
            </Stack><br/>
            <Stack direction="row" spacing={2}>
              <Avatar alt="Kewin Wayne" src="/static/images/avatar/1.jpg" /> &nbsp; &nbsp;Kevin Wayne
            </Stack>
            <br/><br/>
            
            <Button variant="contained" size='large'>Enroll Me</Button>
            <p>120 Already enrolled</p>
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
        <TabPanel value="1"><CourseAbout/></TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
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

