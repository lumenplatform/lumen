import React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BallotIcon from '@mui/icons-material/Ballot';

function CourseInfo( 
  
) {
  return <div>
        <TableContainer component={Paper}>
     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
        
           <TableCell>Course Id</TableCell>
           <TableCell>01</TableCell>

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell>Course Name</TableCell>
           <TableCell>Software Project mangement</TableCell>

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell>Language</TableCell>
           <TableCell>English</TableCell>

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell>Course description</TableCell>
           <TableCell></TableCell>

        </TableRow>
     </TableHead>
    
     </Table>
     </TableContainer>
  </div>;
}

export default CourseInfo;
