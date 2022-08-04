import React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BallotIcon from '@mui/icons-material/Ballot';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../../api';
import { useQuery } from 'react-query';
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';

function CourseInfo() {
   const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  if (isLoading || isError) {
    return <Skeleton></Skeleton>;
  }
  return <div>
        <TableContainer component={Paper}>
     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
        
           <TableCell sx={{height:70}}>Course Name</TableCell>
           <TableCell><Typography >{course.title}</Typography></TableCell>

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>Course Subtitle</TableCell>
          <TableCell><Typography >{course.subtitle}</Typography></TableCell> 

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>Description</TableCell>
           <TableCell><Typography >{course.description}</Typography></TableCell>

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>Language</TableCell>
           <TableCell><Typography >{course.language}</Typography></TableCell>
        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>Subject Area</TableCell>
          <TableCell> <Typography >{course.subject_area}</Typography></TableCell>

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>Duration</TableCell>
           <TableCell> <Typography >{course.duration}</Typography></TableCell>

        </TableRow>
     </TableHead>
    
     </Table>
     </TableContainer>
  </div>;
}

export default CourseInfo;
