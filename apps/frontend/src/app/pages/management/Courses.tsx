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
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Users() {
  const theme = useTheme();
  const activeChip = <Chip label="Active" color="success" size="small" variant="outlined"/>
  const draftChip = <Chip label="Draft" color="warning" size="small" variant="outlined"/>
  const discontinuedChip = <Chip label="Discontinued" color="error" size="small" variant="outlined"/>

  return (
    <Box>
      <Typography variant="h5" sx={{ my: theme.spacing(2) }} component="div">
        Courses
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: theme.spacing(3) }}>Course</TableCell>
              <TableCell>Enrolled</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell sx={{ pl: theme.spacing(3) }}>
                <Typography variant="body2" >Operating Systems</Typography>
                </TableCell>
                <TableCell>10</TableCell>
                <TableCell>20.00$</TableCell>
                <TableCell>
                  {draftChip}
                </TableCell>
                <TableCell>
                  <Button startIcon={<RemoveRedEyeOutlinedIcon />}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </TableContainer>
    </Box>
  );
}
