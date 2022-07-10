import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

      <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="About" />
        <Tab value="two" label="Instructors" />
        <Tab value="three" label="Syllabus" />
        <Tab value="four" label="Reviews" />
        <Tab value="five" label="Enrollment Options" />
        <Tab value="six" label="FAQ" />
      </Tabs>
        </Box>

    </React.Fragment>
  );
}
