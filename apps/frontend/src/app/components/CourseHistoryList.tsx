import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(
  name: string,
  EnrolledDate: string,
  CompletedDate: string,
  // carbs: number,
  // protein: number,
) {
  return { name, EnrolledDate, CompletedDate };  //enter the other variable names if used
}

const rows = [
  createData('Machine Learning', "2020-01-15", "2020-03-05"),        //enter data if other variables are used
  // createData('Ice cream sandwich', 237, 9.9),
  // createData('Eclair', 262, 16.0),
  // createData('Cupcake', 305, 3.7),
  // createData('Gingerbread', 356, 16.0),
];

export default function CourseHistoryList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell align="right">Enrolled Date</TableCell>
            <TableCell align="right">Completed Date</TableCell>
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
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
              {/* <TableCell align="right">{row.name}</TableCell> */}
              <TableCell align="right">{row.EnrolledDate}</TableCell>
              <TableCell align="right">{row.CompletedDate}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// export default function CourseHistoryList(props: any) {
//     return <div> Course History</div>;
// }