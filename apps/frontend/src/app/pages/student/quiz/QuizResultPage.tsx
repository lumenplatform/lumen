import {
  Button, Container, Skeleton, Typography, Card, CardContent
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getResults } from '../../../api';

export default function QuizResultPage() {

  const { courseId, quizId, attemptId } = useParams();
  const navigate = useNavigate();
  const {
    data: results,
    isError,
    isLoading,
  } = useQuery(['results', attemptId!], () => getResults(courseId!, quizId!, attemptId!));

  if (isError || isLoading) {
    return <Skeleton></Skeleton>
  }

  return (
    <Container sx={{ minHeight: '100vh', p: 2 }}>
      <Typography variant="h5">
        Assignment Grades
      </Typography>
      <Container>
        {results.markingStatus == 'MARKED'&& results.releasedStatus=='RELEASED' ?
          <TableContainer component={Paper} sx={{ my: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.submission.map((row: any, index: number) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                    {row.question.type == 'essay' ?
                      <TableCell align="right" >-</TableCell>
                      : <TableCell align="right">{row.correct ? 'Correct' : 'Incorrect'}</TableCell>
                    }
                    <TableCell align="right">{row.marks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" lineHeight={1}>Total</Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" lineHeight={1}>{results.submission.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.marks, 0)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography variant="h6" lineHeight={1}>Grade</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" lineHeight={1}>
                      {results.submission.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.marks, 0) / results.submission.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.question.marks, 0) * 100 < results.quiz.settings.passGrade ? 'Fail' : 'Pass'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" lineHeight={1}>
                      {results.submission.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.marks, 0) / results.submission.reduce((previousValue: any, currentValue: any) => previousValue + currentValue.question.marks, 0) * 100}%
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          :
          <Card sx={{ p: 5, my: 2 }}>
            <CardContent>
              <Typography variant="h6">
                Pending to be marked by the Instructor
              </Typography>
            </CardContent>
          </Card>
        }
        <Button variant="contained" onClick={() => navigate(`/student/${courseId}`)}>
          Back to course
        </Button>
      </Container>
    </Container>
  );
}
