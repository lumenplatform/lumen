import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
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
import { addInstrucotorsToCourse, getOrgCoursesById, getOrgUsers } from '../../../../api';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

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
      <AddInstructorForm />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: theme.spacing(3) }}>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseData.instructors &&
            courseData.instructors.map((row: any) => (
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

function AddInstructorForm() {
  const { courseId } = useParams();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [checked, setChecked] = useState([courseId]);
  const { data: orgUsers, isLoading } = useQuery('/manage/users' , () =>
    getOrgUsers()
  );

  const addInstructorMutation = useMutation(addInstrucotorsToCourse);

  // console.log(orgUsers);


  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    // console.log(checked);
    
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
        <DialogTitle>Add Instructor</DialogTitle>
        <DialogContent>
          <List
            dense
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {orgUsers && orgUsers.map((row:any) => {
              const labelId = `checkbox-list-secondary-label-${row.uid}`;
              return (
                <ListItem
                  key={row.uid}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(row.uid)}
                      checked={checked.indexOf(row.uid) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${row.uid + 1}`}
                        src={`${row.picture}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={`${row.name}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions sx={{ mx: 2, mb: 2 }}>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={checked.length===1}
            variant="contained"
            onClick={() => {
              addInstructorMutation.mutate(checked);
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
