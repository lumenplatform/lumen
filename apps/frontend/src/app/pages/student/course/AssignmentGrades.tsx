import { Chip, Typography, useTheme, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from 'react-query';
import { getCourseAttempts } from '../../../api';
import { useNavigate, useParams } from 'react-router-dom';

function createData(
  Grade_item: string,
  grade: number,
  range: number,
  Precentage: number,
  contribution_to_course_total: number
) {
  return { Grade_item, grade, range, Precentage, contribution_to_course_total };
}

const rows = [
  createData('Activity 1', 159, 50, 24, 4.0),
  createData('Activity 2', 237, 70, 37, 4.3),
  createData('Activity 3', 262, 16, 24, 6.0),

];

export default function Grades() {

  const { courseId } = useParams();
  const {
    data: attempts,
    isLoading,
    isError } = useQuery(['courseId', courseId], () => getCourseAttempts(courseId!));


  if (isLoading || isError) return <Skeleton></Skeleton>;

  console.log(attempts);

  return (
    <Box>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Quiz</TableCell>
              <TableCell align="center">Grade</TableCell>
              <TableCell align="center">Pass/Fail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attempts.map((attempt: any) => (
              <TableRow key={attempt.id}>
                <TableCell align="center">
                  <Typography variant="body2" >{attempt.quiz.settings.title}</Typography>
                </TableCell>
                {(attempt.markingStatus == 'MARKED' && attempt.releasedStatus == 'RELEASED') ?
                  <>
                    <TableCell align="center"> {attempt.submission.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.marks, 0) / attempt.submission.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.question.marks, 0) * 100}%</TableCell>
                    <TableCell align="center">{attempt.submission.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.marks, 0) / attempt.submission.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.question.marks, 0) * 100 < attempt.quiz.settings.passGrade ? 'Fail' : 'Pass'}</TableCell>
                  </>
                  :
                  <>
                  <TableCell align="center"><Chip label={'pending'} color="default" /></TableCell>
                  <TableCell align="center"><Chip label={'pending'} color="default" /></TableCell>
                  </>
                }

              </TableRow>
            ))}
          </TableBody>
        </Table>


      </TableContainer>
    </Box>
  );
}
