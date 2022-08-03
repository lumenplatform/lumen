import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function CourseAbout() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Typography variant="h6">About this course</Typography>
        <Typography variant="subtitle2">125 recent views</Typography>

        <Typography variant="body1" sx={{ mt: 4, mb: 4 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>

        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Skills that you will gain
          </Typography>
          {/* <Stack direction="row" spacing={1}> */}
          <Grid container spacing={1}>

            <Grid item ><Chip label="Operating Systems" /></Grid>
            <Grid item ><Chip label="Computer Architecture" /></Grid>
            <Grid item ><Chip label="Memory Management" /></Grid>
          {/* </Stack> */}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
