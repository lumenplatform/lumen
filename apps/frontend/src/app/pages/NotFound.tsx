import * as React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({

  padding: theme.spacing(0),
  textAlign: 'center',
  
}));

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

    
    <Grid item container spacing={2} columns={{ xs: 4, md: 12 }}   sx={{ background: '#229954'}}
    justifyContent="space-evenly"
    alignItems="stretch">
<Item></Item>
      <Grid item xs={8} sx={{height: '120'}}  justifyContent="space-evenly"
    alignItems="stretch" >
        <ThemeProvider theme={theme}>
          <Typography variant="h1" lineHeight={1.5} sx={{ display: 'flex', justifyContent: 'center', color: '#FEFEDF'}}>Oops!</Typography>
        </ThemeProvider> 
        <Typography variant="h5" lineHeight={2} sx={{ display: 'flex', justifyContent: 'center', color: '#FEFEDF'}}>Error Code: 404</Typography>
        <Typography variant="h5" lineHeight={2} sx={{ display: 'flex', justifyContent: 'center', color: '#FEFEDF'}}>We can't seem to find the page that you are looking for...</Typography>
   
        <Grid sx={{display: 'flex', justifyContent: 'center', mt: '30px', padding: '12px'}}  justifyContent="space-evenly"
    alignItems="stretch">
          <Button variant="contained" sx={{color: '#FEFEDF'}} > Back to Home</Button>
        </Grid>
      </Grid>

      <Grid item xs={4} sx={{ background: '#FEFEDF', display: 'flex', justifyContent: 'center',}}  justifyContent="space-evenly"
    alignItems="stretch">
        <img src="/assets/images/404_img.png" style={{height: '400px', marginBottom: '30px'}} />
      </Grid>

    </Grid>
    
  )
}