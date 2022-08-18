import {
  Button,
  Box,
  Typography,
} from '@mui/material';
import {  Outlet } from 'react-router-dom';



export default function CourseEnrolmentOptions(props: any) {
  return (
    <div>
      
      <Box sx={{ maxWidth: '1440px', px: 3 }}>
    
        <Box sx={{ py: 1, display: 'flex' }}>
          <Box>
            <Typography variant="h5" lineHeight={1}>
             <b>Start Learning Today</b>
             
            </Typography>
            <br />
          </Box>
        </Box>
        
        
          
            <Outlet />
            <Button variant="contained"> <Typography variant="h6" lineHeight={2}> Enroll for Free </Typography> <br /><br />Starts Jul 12th </Button>

            
            <br />
          <br />
          
            
           <b>123, 678 </b> already enrolled.

            
       
          
        
        



        
      </Box>

      
    </div>
  );
}
