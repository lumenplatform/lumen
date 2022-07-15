import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';



export default function CourseAbout() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <h3>About this course</h3>
        <h5><i>125 recent views</i></h5>

        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <Box>
          <h3>Skills that you will gain</h3>
          <Stack direction="row" spacing={1}>
            <Chip label="Operating Systems" />
            <Chip label="Computer Architecture" />
            <Chip label="Memory Management" />
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
