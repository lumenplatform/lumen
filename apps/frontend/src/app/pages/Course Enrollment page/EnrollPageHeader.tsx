import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

export default function FixedContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#3dff7b', height: '100vh' }}>
            <h2>Operating Systems</h2>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <p>Kevin Wayne</p>
            
            <Button variant="contained">Enroll Me</Button>
            <p>120 Already enrolled</p>
        </Box>
      </Container>

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
        <TabPanel value="1">import CourseAbout from 'course_about';</TabPanel>
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
