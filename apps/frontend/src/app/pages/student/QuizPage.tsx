import { Button, Card, Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import EssayQ from '../../components/EssayQuiz';
import { CardContent } from '@mui/material';
import MCQ from '../../components/MCQQuiz';
import NumberCard from '../../components/QuizNumberCard';
import { useState } from 'react';
import * as React from 'react';
import { setMaxListeners } from 'process';

function QBox(props: any) {
  const { isFlagged, isAnswered } = props;
  console.log(isFlagged);
  return (
    <Card
      sx={{
        width: 30,
        height: 50,
        margin: 0.5,
        justifyContent: 'center',
        display: 'inline-flex',
        paddingTop: 1.5,
        backgroundColor: isFlagged
          ? 'error.light'
          : isAnswered
          ? 'primary.light'
          : 'primary',
      }}
    >
      <Typography variant="subtitle1">{props.val}</Typography>
    </Card>
  );
}

type Submission = {
  answer?: string | string[];
  flag: boolean;
  answered: boolean;
};

const defaultSubmission = {
  flag: false,
  answered: false,
};

const temp = { sadsadasd: defaultSubmission };

const quizArray = [
  {
    questionId: 'sadsadasd',
    question: 'foaihoiaehofiqheoiw',
    answers: [
      { answerId: 'fowlgyugyioif', answer: 'fqbowinhqoijfo' },
      { answerId: 'fowioif', answer: 'fqbowiiugiguigiuggynhqoijfo' },
    ],
    type: 'mcq',
  },
];

export default function Quizpage(props: any) {
  const [submissions, setSubmssions] = React.useState<any>(temp);

  /*   for (const quiz of quizArray) {
    console.log(quiz);
    obj[quiz.questionId]:defaultSubmission;
} */

  const handleFlagged = (questionId: string) => {
    const temp = submissions;
    temp[questionId].flag = !temp[questionId].flag;
    console.log(temp);
    setSubmssions((prevState: any) => ({ ...prevState, ...temp }));
  };

  const handleAnswerChanged = (questionId: string, answer: any, type: any) => {
    const temp = submissions;
    if (type == 'mcq') {
      temp[questionId].answer = temp[questionId].answer
        ? temp[questionId].answer
        : [];
      temp[questionId].answer = temp[questionId].answer.some(
        (e: any) => answer == e
      )
        ? temp[questionId].answer.filter((e: any) => answer != e)
        : [...temp[questionId].answer, answer];
    } else if (type == 'essay') temp[questionId].answer = answer;
    temp[questionId].answered =
      temp[questionId].answer.length != 0 ? true : false;
    setSubmssions((prevState: any) => ({ ...prevState, ...temp }));
    console.log(submissions);
  };

  return (
    <Box>
      <Box
        sx={{
          padding: 3,
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6">Exam Title</Typography>
      </Box>

      <Grid container>
        <Grid item xs={9}>
          {quizArray.map((quiz) => (
            <Stack direction={'row'} spacing={0}>
              {quiz.type == 'mcq' && (
                <MCQ
                  questionId={quiz.questionId}
                  answers={quiz.answers}
                  question={quiz.question}
                  isFlagged={submissions[quiz.questionId].flag}
                  setFlag={handleFlagged}
                  setAnswer={handleAnswerChanged}
                />
              )}
              {quiz.type == 'essay' && (
                <EssayQ
                  questionId={quiz.questionId}
                  question={quiz.question}
                  isFlagged={submissions[quiz.questionId].flag}
                  setFlag={handleFlagged}
                  setAnswer={handleAnswerChanged}
                />
              )}
            </Stack>
          ))}
        </Grid>

        <Grid item xs={3}>
          <Card
            sx={{ minHeight: 500, margin: 5, padding: 3, overflow: 'hidden' }}
          >
            <Box sx={{ marginBottom: 5, padding: 1 }}>
              <Typography variant="subtitle2">Questions</Typography>

              <Grid container>
                {Object.keys(submissions).map((value, index) => (
                  <QBox
                    val={index}
                    questionId={value}
                    isFlagged={submissions[value].flag}
                    isAnswered={submissions[value].answered}
                  />
                ))}
              </Grid>
            </Box>

            <Box sx={{ marginBottom: 5, padding: 1 }}>
              <Typography variant="subtitle2">Time Remaining</Typography>
            </Box>
            <Button
              variant="contained"
              sx={{ marginTop: 5, marginRight: 5, marginLeft: 15, width: 120 }}
            >
              Submit All
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* <Stack spacing={5} sx={{ alignItems: 'center', marginBottom: 5 }}>
        <Pagination count={15} color="primary" size="large" />
      </Stack> */}
    </Box>
  );
}
