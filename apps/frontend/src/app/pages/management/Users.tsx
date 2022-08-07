import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Avatar, Button, Chip, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useQuery } from 'react-query';
import { getOrgUsers } from '../../api';

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
      <Typography variant="h5" sx={{ my: theme.spacing(2) }} component="div">
        Users
      </Typography>

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
    </Box>
  );
}
