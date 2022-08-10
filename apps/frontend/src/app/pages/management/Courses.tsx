import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Button, Chip, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getOrgCourses } from '../../api';

export default function Users() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery('org-courses', () => getOrgCourses());

  const draftChip = (status: string) => (
    <Chip label={status} color="warning" size="small" variant="outlined" />
  );

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
            {data &&
              data.map((row: any) => (
                <TableRow key={row.title}>
                  <TableCell sx={{ pl: theme.spacing(3) }}>
                    <Typography variant="body2">{row.title}</Typography>
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.price}$</TableCell>
                  <TableCell>{draftChip(row.status)}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<RemoveRedEyeOutlinedIcon />}
                      onClick={() => {
                        navigate(`/manage/courses/${row.courseId}`);
                      }}
                    >
                      View
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
    </Box>
  );
}
