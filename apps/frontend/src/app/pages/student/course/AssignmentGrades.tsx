import { Chip, Typography, Button, Skeleton, Link } from '@mui/material';
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
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


export default function Grades() {

  const { courseId } = useParams();
  const {
    data: attempts,
    isLoading,
    isError } = useQuery(['courseId', courseId], () => getCourseAttempts(courseId!));
  const navigate = useNavigate();

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
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attempts.map((attempt: any) => (
              <TableRow key={attempt.id}>
                <TableCell align="center">
                  <Typography variant="body2" component="div">
                    {attempt.quiz.settings.title}
                  </Typography>
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
                <TableCell align="center">
                  <Button
                    disabled={!attempt.quiz.settings.enableReview}
                    startIcon={attempt.quiz.settings.enableReview ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    onClick={() => {
                      navigate(`/student/${courseId}/quiz/${attempt.quiz.id}/attempt/${attempt.id}/review`);
                    }}
                  >
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


      </TableContainer>
    </Box>
  );
}
