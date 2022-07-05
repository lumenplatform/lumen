import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Chip, Typography, useTheme } from '@mui/material';
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

const UserChip = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex' }}>
      <Avatar
        alt="Remy Sharp"
        src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-3/images/avatars/1.png"
      />
      <Box
        sx={{
          ml: theme.spacing(2),
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="subtitle2">Dalana Pasindu</Typography>
        <Typography lineHeight={1} variant="caption">
          @dalanad
        </Typography>
      </Box>
    </Box>
  );
};

export default function Users() {
  const theme = useTheme();
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
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell sx={{ pl: theme.spacing(3) }}>
                  <UserChip />
                </TableCell>
                <TableCell>dalana.dhar@gmail.com</TableCell>
                <TableCell>Moderator</TableCell>
                <TableCell>
                  <Chip
                    label="Active"
                    color="success"
                    size="small"
                    variant="outlined"
                  />
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
