import {
  Button,
  Grid,
  List,
  ListItem,
  Skeleton,
  Typography,
  Container,
} from '@mui/material';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizDetails, createNewAttempt } from '../../../api';


export default function CoursePage(props: any) {
  const navigate = useNavigate();
  const { quizId, courseId } = useParams();
  const { data: details, isLoading, isError } = useQuery('quiz', () => getQuizDetails(courseId!, quizId!));
  const { data: attemptData, mutate: attemptCreateMutation, isSuccess: attemptCreateSuccess, } = useMutation(createNewAttempt);

  if (attemptCreateSuccess) {
    navigate(`/student/${courseId}/quiz/${quizId}/attempt/${attemptData}`);
  }

  if (isLoading || isError) {
    return <Skeleton />
  }

  return (
    <Container sx={{ p: 3, m: 'auto' }}>
      <Grid container spacing={2} sx={{ px: 3 }}>
        <Grid item xs={12} >
          <Typography variant="h5" lineHeight={2}>{details.settings.title}</Typography>
          <Typography variant="h6">Instructions</Typography>
          <Typography variant="body1" lineHeight={1}>
            {details.settings.instructions}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="body1" lineHeight={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        Time limit:&nbsp;
        {
        details.settings.duration.unlimited ? 'Unlimited' 
        :<>{details.settings.duration.durationMinutes}mins {details.settings.duration.durationSeconds}secs</>
        }
      </Typography>
      <Typography variant="body1" lineHeight={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        Passing Grade: {details.settings.passGrade}%
      </Typography>

      <Grid container spacing={0} rowSpacing={0} sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '30px'
      }}>
        <Button variant="contained" sx={{ display: 'flex', justifyContent: 'center' }} onClick={() => attemptCreateMutation({ quizId: quizId!, courseId: courseId! })} >Start the Quiz</Button>
      </Grid>
    </Container>
  );
}