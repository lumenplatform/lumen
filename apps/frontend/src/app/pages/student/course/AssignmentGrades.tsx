import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Chip, Typography, useTheme } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import TablePagination from '@mui/material/TablePagination';

function createData(
  Grade_item: string,
  grade: number,
  range: number,
  Precentage: number,
  contribution_to_course_total: number
) {
  return { Grade_item, grade, range, Precentage, contribution_to_course_total };
}

const rows = [
  createData('Activity 1', 159, 50, 24, 4.0),
  createData('Activity 2', 237, 70, 37, 4.3),
  createData('Activity 3', 262, 16, 24, 6.0),
  
];

export default function Users() {
  const theme = useTheme();
  const activeChip = <Chip label="Active" color="success" size="small" variant="outlined"/>
  const draftChip = <Chip label="Draft" color="warning" size="small" variant="outlined"/>
  const discontinuedChip = <Chip label="Discontinued" color="error" size="small" variant="outlined"/>

  return (
    <Box>
      

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell  align="center">Grade item</TableCell>
              <TableCell align="center">Grade</TableCell>
              <TableCell align="center">range</TableCell>
              <TableCell align="center">preccentage</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
           
            {rows.map((row) => (
              <TableRow key={row.Grade_item}>
                <TableCell align="center">
                <Typography variant="body2" >Ativity 1</Typography>
                </TableCell>
                <TableCell align="center">10</TableCell>
                <TableCell align="center">0-40</TableCell>
                <TableCell align="center">
                 50%
                </TableCell>
                
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center">
               <Typography ><b>Total</b></Typography> 
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>

            </TableRow>
          </TableBody>
        </Table>
        
        
      </TableContainer>
    </Box>
  );
}
