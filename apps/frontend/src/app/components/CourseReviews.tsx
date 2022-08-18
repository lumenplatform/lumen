import {
  Box,
  Typography,

} from '@mui/material';

import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';

import * as React from 'react';
import { styled } from '@mui/material/styles';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { NavLink, Outlet } from 'react-router-dom';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


export default function CourseReviews(props: any) {
  return (
    

    <div>
      
      <Box sx={{ maxWidth: '100%', px: 2 }}>
     
        <Box sx={{ display: 'flex', margin: '', backgroundColor: 'white', height: '100px', width: '50%', paddingLeft: '8px'}}>
        <h1>4.7</h1>
        <Box sx={{ paddingTop: '20px', paddingLeft: '8px'}}>
        <Rating name="read-only" value={4} readOnly size="small" />
        <div style={{ height: '48px', paddingTop: '' }}> 234 Reviews </div>
        </Box>
        
        
          
        </Box>  
        <Box sx={{ display: 'flex', margin: '', backgroundColor: 'white', paddingTop: '20px', width: '50%', paddingLeft: '8px'}}>
        

        
        <Typography variant="subtitle1" lineHeight={1}> 5 stars </Typography> <Slider disabled defaultValue={84} valueLabelDisplay="auto" /> 84.97%
        </Box>
        <Box sx={{ display: 'flex', margin: '', backgroundColor: 'white', paddingTop: '20px', width: '50%', paddingLeft: '8px'}}>
          4 Stars <Slider disabled defaultValue={70} aria-label="Default" valueLabelDisplay="auto" /> 70%
        </Box>
        <Box sx={{ display: 'flex', margin: '', backgroundColor: 'white', paddingTop: '20px', width: '50%', paddingLeft: '8px'}}>
          3 Stars <Slider disabled defaultValue={20} aria-label="Default" valueLabelDisplay="auto" /> 20%
        </Box>
        <Box sx={{ display: 'flex', margin: '', backgroundColor: 'white', paddingTop: '20px', width: '50%', paddingLeft: '8px'}}>
          2 Stars <Slider disabled defaultValue={10} aria-label="Default" valueLabelDisplay="auto" /> 10%
        </Box>
        <Box sx={{ display: 'flex', margin: '', backgroundColor: 'white', paddingTop: '20px', width: '50%', paddingLeft: '8px'}}>
          1 Stars <Slider disabled defaultValue={3} aria-label="Default" valueLabelDisplay="auto" /> 3%
        </Box>
      </Box>
      
 
    

    </div>
  );
}
