import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Container, Typography, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getOrgCoursesById } from '../../../../api';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

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
  const { courseId } = useParams();
  const { data: courseData, isLoading } = useQuery('coures' + courseId, () =>
    getOrgCoursesById(courseId ?? '')
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: theme.spacing(3) }}>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseData.instructors && courseData.instructors.map((row: any) => (
            <TableRow key={row.uid}>
              <TableCell sx={{ pl: theme.spacing(3) }}>
                <Typography variant="body2">{row.name}</Typography>
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
