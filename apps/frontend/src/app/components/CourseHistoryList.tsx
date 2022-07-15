import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

function createData(name: string, EnrolledDate: string, CompletedDate: string) {
  return { name, EnrolledDate, CompletedDate }; //enter the other variable names if used
}

const rows = [
  createData('Machine Learning', '2020-01-15', '2020-03-05'), //enter data if other variables are used
  createData('Machine Learning', '2020-01-15', '2020-03-05'),
];

export default function CourseHistoryList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Enrolled Date</TableCell>
            <TableCell>Completed Date</TableCell>
            <TableCell>Certificate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>
                {<CircularProgress variant="determinate" value={80} />}
              </TableCell>
              <TableCell>{row.EnrolledDate}</TableCell>
              <TableCell>{row.CompletedDate}</TableCell>
              <TableCell>{<Button variant="outlined">View</Button>}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


