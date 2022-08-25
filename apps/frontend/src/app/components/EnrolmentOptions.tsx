import {
  Button,
  Box,
  Typography,
  Skeleton,
} from '@mui/material';
import { useQuery } from 'react-query';
import {  Outlet, useParams } from 'react-router-dom';
import { getCourseById } from '../api';

export default function CourseEnrolmentOptions(props: any) {
  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  if (isError || isLoading) {
    return <Skeleton></Skeleton>;
  }

  return (

    <div>
      <Box sx={{ maxWidth: '1440px', px: 3 }}>    
        <Box sx={{ py: 1, display: 'flex' }}>
          <Box>
            <Typography variant="h5" lineHeight={1} mb='20px'>
             Start Learning Today             
            </Typography>
            <Typography variant="body1" lineHeight={1} mb='20px'>
             Course Fee:  Rs. {course.price}.00            
            </Typography>
          </Box>
        </Box> 
        <Outlet />
        <Button variant="contained"> <Typography variant="h6" lineHeight={2} sx={{paddingRight: '40px', paddingLeft: '40px'}}> Enroll Me</Typography></Button>
      </Box>   

      <Box sx={{ maxWidth: '1440px', px: 3 }} mt='20px'>
        <Typography variant="body2" lineHeight={1} mb='20px' align='left'>
          <b>120</b> already enrolled. 
        </Typography>
      </Box>
        
        
        
        

            
       
          
        
        



        
      

      
    </div>
  );
}
