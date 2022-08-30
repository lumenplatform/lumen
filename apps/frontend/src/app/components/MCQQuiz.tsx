import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { Card, Container, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';

export default function MCQ(props: any) {
  const { questionId, setFlag, setAnswer, question, isFlagged, index, noOfQuestions, answer, randomizeAnswers } =
    props;
  let { answers } = props;

  useEffect(() => {
    answers = randomizeAnswers ? answers.sort(() => 0.5 - Math.random()) : answers;
  }, []);

  return (
    <Container>
      <Card sx={{ minHeight: 400 }}>
        <Box sx={{ backgroundColor: '#a0a69d', minHeight: 40, padding: 2 }}>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="subtitle1">
                Question {index} of {noOfQuestions}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <IconButton
                sx={{ padding: 0, paddingRight: 1, display: 'inline' }}
                onClick={() => setFlag(questionId)}
                color={isFlagged ? 'error' : 'default'}
              >
                <FlagOutlinedIcon />
              </IconButton>
              <Typography variant="body2" display={'inline'}>
                Flag Question
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ padding: 5 }}>
          <FormControl>
            <Typography variant="body1" paddingBottom={3}>
              {question}
            </Typography>

            {answers.map((object: any) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answer && answer.map((a: any) => a.id).includes(object.id)}
                    onChange={() =>
                      setAnswer(questionId, object.id, 'mcq')
                    }
                  />
                }
                label={object.answer}
              />
            ))}
          </FormControl>
        </Box>
      </Card>
    </Container>
  );
}
