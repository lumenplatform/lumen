import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Container, Typography, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//sample data array with objects containg username,email,enrolled date,course title
const data = [
  { username: 'John Doe', role: 'Teacher', course: 'machine learning' },
  { username: 'John Doe', role: 'Modreator', course: 'machine learning' },
  { username: 'John Doe', role: 'Teacher', course: 'machine learning' },
  { username: 'John Doe', role: 'Modreator', course: 'machine learning' },
  { username: 'John Doe', role: 'Modreator', course: 'machine learning' },
];
export default function CourseInstructors() {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: theme.spacing(3) }}>User</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow key={row.title}>
              <TableCell sx={{ pl: theme.spacing(3) }}>
                <Typography variant="body2">{row.username}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.role}</Typography>
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  startIcon={<DeleteOutlineIcon />}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        /> */}
    </TableContainer>
  );
}
