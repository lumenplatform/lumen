import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Button, Container, Typography, useTheme, Box ,Skeleton} from '@mui/material';
import { Edit, EditOutlined } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getQuizzesByCourseId } from '../../../../api';

//sample data array with objects containg username,email,enrolled date,course title
const data = [
  { title: 'Quiz 1', submissions: '50', quizId: '1' },
  { title: 'Lab 1', submissions: '20', quizId: '1' },
  { title: 'Lab 2', submissions: '40', quizId: '1' },
  { title: 'Quiz 2', submissions: '60', quizId: '1' },
  { title: 'Quiz 3', submissions: '100', quizId: '1' },
];
export default function QuizAndAssignments() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { data: quizzes ,isLoading,isError } = useQuery(['quizzes', courseId], () => getQuizzesByCourseId(courseId!));
  
  if(isError||isLoading){
    return <Skeleton></Skeleton>
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: theme.spacing(3) }}>Quiz/Assignment</TableCell>
              <TableCell>Total Submissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map((row: any) => (
              <TableRow key={row.title}>
                <TableCell sx={{ pl: theme.spacing(3) }}>
                  <Typography variant="body2">{row.settings.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.noOfAttempts}</Typography>
                </TableCell>
                <TableCell>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      startIcon={<RemoveRedEyeOutlinedIcon />}
                      onClick={() => {
                        navigate(`/manage/courses/${row.course}/exam/${row.id}/attempts`);
                      }}
                    >
                      View
                    </Button>
                    &nbsp; | &nbsp;
                    <Button
                      startIcon={<EditOutlined />}
                      onClick={() => {
                        navigate(`/manage/courses/${row.course}/exam/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
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
    </Box >
  );
}
