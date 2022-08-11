import { DeleteOutline, PersonAddAlt } from '@mui/icons-material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import {
  getOrgUsers,
  getPendingOrgInvitations,
  inviteUserToOrg,
} from '../../api';

const UserChip = ({ user }: any) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex' }}>
      <Avatar alt={user.name} src={user.picture} />
      <Box
        sx={{
          ml: theme.spacing(2),
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="subtitle2">{user.name}</Typography>
        {/* <Typography lineHeight={1} variant="caption">
          @dalanad
        </Typography> */}
      </Box>
    </Box>
  );
};

export default function Users() {
  const theme = useTheme();
  const { data: users } = useQuery('org-users', getOrgUsers);

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ my: 2 }}>
          Organization Users
        </Typography>
        <UserInviteForm />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: theme.spacing(3) }}>User</TableCell>
              <TableCell>Email</TableCell>
              {/* <TableCell>Role</TableCell> */}
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user: any) => (
                <TableRow key={user.name}>
                  <TableCell sx={{ pl: theme.spacing(3) }}>
                    <UserChip user={user} />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  {/* <TableCell>Moderator</TableCell> */}
                  <TableCell>
                    <Chip
                      label={user.status}
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Button startIcon={<RemoveRedEyeOutlinedIcon />}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users && users.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => null}
          onRowsPerPageChange={() => null}
        />
      </TableContainer>
      <PendingInvites />
    </Box>
  );
}

export function PendingInvites() {
  const { data: invites } = useQuery('invites', getPendingOrgInvitations);
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h6" sx={{ my: 3 }}>
        Pending User Invitations
      </Typography>
      <Paper>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Expires At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invites &&
              invites.map((invite: any) => (
                <TableRow key={invite.email}>
                  <TableCell>{invite.email}</TableCell>
                  <TableCell>
                    {new Date(invite.expiresAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button color="error">
                      <DeleteOutline /> &nbsp; Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

function UserInviteForm() {
  const [open, setOpen] = useState(false);
  const inviteUserMutation = useMutation(inviteUserToOrg, {
    onSuccess: () => {
      handleClose();
    },
  });
  const { register, getValues } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Invite User
      </Button>
      <Dialog open={open} maxWidth="xs" hideBackdrop={false}>
        <DialogTitle>
          <Stack direction={'row'} alignItems="center">
            <PersonAddAlt sx={{ mr: 2 }} /> Invite an user
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            We will send an email to the user asking them to join.
          </DialogContentText>
          <TextField
            autoFocus
            {...register('email')}
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
              inviteUserMutation.mutate({ email: getValues('email') });
            }}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
