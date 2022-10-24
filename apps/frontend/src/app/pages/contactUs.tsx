import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function Privacy() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ ml: 2 }}>
          <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
            <Typography variant="h3" align="center" sx={{ padding: 2, color: '#54f56f' }}>
              <b>About Us</b>
            </Typography>
            <Typography variant="h5" sx={{ padding: 2 }} align="justify">
              Lumen - Secure Course Delivary Platform
            </Typography>
            <Typography variant="body2" sx={{ padding: 2 }} align="justify">
              Lumėn is a SaaS product for online course providers that helps
              them keep control of what paying users can do with their material
              and prevent illegal copying, modification, and distribution of
              those works.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
              mt: 6,
            }}
          >
            <img
              src="/assets/images/illustration_2.png"
              alt=""
              style={{ maxWidth: '60%' }}
            />
          </Box>
        </Grid>

        <Grid item xs={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
              mt: 6,
            }}
          >
            <img
              src="/assets/images/illustration_6.png"
              alt=""
              style={{ maxWidth: '60%' }}
            />
          </Box>
        </Grid>
        <Grid item xs={7} sx={{}}>
          <Paper elevation={3} sx={{ padding: 4, mt: 4, }}>
            <Typography variant="h3" align="center" sx={{ padding: 2,  }}>
              <b>Contact Us</b>
            </Typography>
            <Typography variant="body1" align="center" sx={{ paddingBottom: 5,  }}>
              Leave us a message. We'll get back to you ASAP.
            </Typography>
            <TextField id="outlined-basic" label="Email" variant="outlined" sx={{width: '100%'}} />
            <TextField
          id="outlined-textarea"
          label="Message"
          
          margin="normal"
          multiline
          sx={{width: '100%', height: '100px'}}
        />
        <Button variant="contained" sx={{display: 'flex', flexDirection: 'row',
              alignContent: 'center',}}>Submit</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
