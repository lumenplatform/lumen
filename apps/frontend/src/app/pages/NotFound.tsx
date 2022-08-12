import * as React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';


const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

export default function NotFound() {
  return (
    
    <div style={{height: '100%'}}> 
      <Grid>
        <Grid item xs={12} sx={{ background: '#35523A', height: '50%', maxHeight: '100%', display: 'flex', justifyContent: 'center',}}>
          <img src="/assets/images/404_img.png" style={{height: '400px'}} />
        </Grid>

        <Grid item xs={12} sx={{ background: '#E4C7FF', height: '50%'}}>
          <ThemeProvider theme={theme}>
            <Typography variant="h1" lineHeight={1} sx={{ display: 'flex', justifyContent: 'center'}}>Oops!</Typography>
          </ThemeProvider>    
      <Typography variant="h5" lineHeight={2} sx={{ display: 'flex', justifyContent: 'center'}}>We can't seem to find the page that you are looking for...</Typography>
      <Grid container spacing={0} rowSpacing={0} sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '30px'
        }}> <Button variant="contained" sx={{display: 'flex', justifyContent: 'center'}}>Back to Home</Button></Grid>
      </Grid>
      
      
    </Grid>


    </div>
  )
}