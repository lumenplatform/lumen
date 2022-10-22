import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getOrgCourseUsers } from '../../../../api';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

//sample data array with objects containg username,email,enrolled date,course title
const data = [
  {
    username: 'John Doe',
    email: 'sample@gmail.com',
    enrolledDate: '2022-08-12',
    course: 'machine learning',
  },
  {
    username: 'John Doe',
    email: 'sample@gmail.com',
    enrolledDate: '2022-08-12',
    course: 'machine learning',
  },
  {
    username: 'John Doe',
    email: 'sample@gmail.com',
    enrolledDate: '2022-08-12',
    course: 'machine learning',
  },
  {
    username: 'John Doe',
    email: 'sample@gmail.com',
    enrolledDate: '2022-08-12',
    course: 'machine learning',
  },
  {
    username: 'John Doe',
    email: 'sample@gmail.com',
    enrolledDate: '2022-08-12',
    course: 'machine learning',
  },
];
export default function EnrolledStudents() {
  const theme = useTheme();
  const { courseId } = useParams();
  const { data: courseData, isLoading } = useQuery('coures' + courseId, () =>
    getOrgCourseUsers(courseId ?? '')
  );

  if (!courseData) return null;
  return (
    <TableContainer component={Paper}>
      <AddInstructorForm />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: theme.spacing(3) }}>User</TableCell>
            <TableCell>User mail</TableCell>
            <TableCell>Enrolled Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseData &&
            courseData.length &&
            courseData.map((row: any) => (
              <TableRow key={row.enrollmentId}>
                <TableCell sx={{ pl: theme.spacing(3) }}>
                  <Typography variant="body2">{row.user.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.enrollmentDate}</Typography>
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

function AddInstructorForm() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'right', p: 2 }}>
        <Box>
          <Button color="primary" onClick={() => setOpen(true)}>
            Add instructor
          </Button>
        </Box>
      </Box>

      {/* <Button variant="contained" onClick={() => setOpen(true)}>
        Invite User
      </Button> */}
      <Dialog open={open} maxWidth="xs" hideBackdrop={false}>
        <DialogTitle>
          Add Instructor
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            We will send an email to the user asking them to join.
          </DialogContentText>
          <TextField
            autoFocus
            // {...register('email')}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{ mx: 2, mb: 2 }}>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            // onClick={() => {
            //   inviteUserMutation.mutate({ email: getValues('email') });
            // }}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
