import {
  Button,
  Grid,
  List,
  ListItem,
  Skeleton,
  Typography,
  Container,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizDetails } from '../api';

  
  export default function CoursePage(props: any) {
    const navigate = useNavigate();
    const { quizId, courseId } = useParams();
    const { data : details, isLoading,isError } = useQuery('quiz', () => getQuizDetails(courseId!, quizId!));

    if(isLoading || isError) {
        return <Skeleton />
    }

    return (
      <Container>
      <Grid container spacing={2} sx={{ px: 3 }}>
        <Grid item xs={12} >
          <Typography variant="h5" lineHeight={2}>Assignment 1 </Typography>
          <Typography variant="body1" lineHeight={1}>
            
            <List>
              <ListItem>This quiz contains 20 multiple choice questions and 1 structured essay question from Lessons 1,2 and 3</ListItem>   
              <ListItem>The quiz will open exactly at 8.30 AM  and close at 9.20 A.M. The duration of the quiz will be 35 minutes.</ListItem>
              <ListItem>Some questions will have one or more correct answers. You should select all the correct answers.</ListItem>
              <ListItem>There will be a penalty for wrong answers in questions with one or more correct answers.</ListItem>
              <ListItem>Please note that you have to answer the questions sequentially ( You are not allowed to go back to previous question or skip to a later one. You cannot change the answer once you click the "Next Page" button)</ListItem>
            </List>
          </Typography>    
        </Grid>
      </Grid>
  
      <Typography variant="body1" lineHeight={2} sx={{display: 'flex', justifyContent: 'center'}}>
        Attempts Allowed: 4 
      </Typography>
      <Typography variant="body1" lineHeight={2} sx={{display: 'flex', justifyContent: 'center'}}>
        This quiz closed on Tuesday, 19 July 2022, 9:20 AM 
      </Typography>
      <Typography variant="body1" lineHeight={2} sx={{display: 'flex', justifyContent: 'center'}}>
        Time limit: 35 mins
      </Typography> 
      <Typography variant="body1" lineHeight={2} sx={{display: 'flex', justifyContent: 'center'}}>
        Grading method: Highest grade
      </Typography>
      
      <Grid container spacing={0} rowSpacing={0} sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '30px'
        }}> <Button variant="contained" sx={{display: 'flex', justifyContent: 'center'}}>Start the Quiz</Button></Grid>
      
    </Container>
    );
  }