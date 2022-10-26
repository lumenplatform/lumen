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
import {
  getOrgCourseUsers,
  inviteStudentToCourse,
  inviteUserToOrg,
} from '../../../../api';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { PersonAddAlt } from '@mui/icons-material';
import { queryClient } from 'apps/frontend/src/app/providers/queryClient';
import { useForm } from 'react-hook-form';

export default function EnrolledStudents() {
  const theme = useTheme();
  const { courseId } = useParams();
  const { data: courseData } = useQuery('course-users', () =>
    getOrgCourseUsers(courseId ?? '')
  );

  // console.log("metana metana metana");
  // console.log(courseData);
  if (!courseData) return null;

  return (
    <TableContainer>
      <Stack justifyContent="end" alignItems="end">
        <StudentInviteForm />
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: theme.spacing(3) }}>User</TableCell>
            <TableCell>User mail</TableCell>
            <TableCell>Enrolled Date & Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseData &&
            courseData.length !== 0 &&
            courseData.map((row: any) => (
              <TableRow key={row.enrollmentId}>
                <TableCell sx={{ pl: theme.spacing(3) }}>
                  <Typography variant="body2">{row.user.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(row.enrollmentDate).toLocaleString()}
                  </Typography>
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

function StudentInviteForm() {
  const [open, setOpen] = useState(false);
  const inviteUserMutation = useMutation(inviteStudentToCourse, {
    onSuccess: () => {
      handleClose();
      queryClient.refetchQueries('course-users');
    },
  });
  const { register, getValues, reset } = useForm();
  const { courseId } = useParams();

  const handleClose = () => {
    setOpen(false);
    reset({ email: null });
  };

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        onClick={() => setOpen(true)}
      >
        Invite Student
      </Button>
      <Dialog open={open} maxWidth="xs" hideBackdrop={false}>
        <DialogTitle>
          <Stack direction={'row'} alignItems="center">
            <PersonAddAlt sx={{ mr: 2 }} /> Invite an student
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Student will be able to access course by creating a account using
            the given Email
          </DialogContentText>
          <TextField
            autoFocus
            {...register('email', {})}
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
            onClick={() => {
              inviteUserMutation.mutate({
                email: getValues('email'),
                courseId,
              });
            }}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
