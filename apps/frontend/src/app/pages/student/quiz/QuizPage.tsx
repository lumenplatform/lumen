import {
  Box, Button,
  Card, CircularProgress, Container, Grid, Pagination, Skeleton,
  Stack, Typography
} from '@mui/material';
import EssayQ from '../../../components/EssayQuiz';
import MCQ from '../../../components/MCQQuiz';
// import NumberCard from '../../components/QuizNumberCard';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import { useDebouncedCallback } from 'use-debounce';
import { completeAttempt, getQuizById, updateAttempt, getAttemptById } from '../../../api';

type Submission = {
  question: any;
  mcqAnswer: any;
  essayAnswer: any;
  flag: boolean;
  answered: boolean;
  type: string;
};

function QBox(props: any) {
  const { isFlagged, isAnswered, index } = props;
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
      <Typography variant="subtitle1">{index}</Typography>
    </Card>
  );
}

export default function QuizPage(props: any) {
  const navigate = useNavigate();
  const [submissions, setSubmssions] = React.useState<Submission[]>([]);
  const [quizArray, setQuizArray] = React.useState<any>([]);
  const [settings, setSettings] = React.useState<any>({});
  const [page, setPage] = React.useState<number>(0);
  const { mutate: submissionCompleteMutation, isSuccess: isQuizSubmitted, isLoading: isQuizSubmitting, isError: isQuizSubmitError } = useMutation(completeAttempt);
  const { mutate: submissionUpdateMutation } = useMutation(updateAttempt);
  const submissionUpdateDebounce = useDebouncedCallback((data:any) => { submissionUpdateMutation(data) }, 5000);
  const { courseId, quizId, attemptId } = useParams();

  const { seconds, minutes, hours, isRunning, restart } = useTimer({
    expiryTimestamp: new Date(),
  });

  const {
    data: examData,
    isLoading: isExamLoading,
    isError: isExamError,
  } = useQuery(['quiz', quizId], () => getQuizById(courseId!, quizId!), { enabled: (submissions.length == 0 && quizArray.length == 0) });

  const {
    data: attemptData,
    isLoading: isAttemptLoading,
    isError: isAttemptError
  } = useQuery(['attempt', attemptId], () => getAttemptById(courseId!, quizId!, attemptId!), { enabled: (submissions.length == 0 && quizArray.length == 0) });

  React.useEffect(() => {
    /*     keys.reduce((accumulator, key) => {
          let index = object.findIndex(x=>x.id==key);
          accumulator.push(object[index]);return accumulator;
      },[]); */
    if (examData && attemptData) {
      console.log(attemptData);
      const isOngoingAttempt = attemptData.submission.length > 0;
      const elapsedTime = isOngoingAttempt ? (new Date().getTime() - new Date(attemptData.startedAt).getTime()) / 1000 : 0;
      let questions = examData.questions;

      if (examData.settings.randomizeQuestions) {
        if (!isOngoingAttempt)
          questions = examData.questions.sort(() => 0.5 - Math.random());
        else {
          console.log('asdasdasd')
          const questionOrder = attemptData.submission.map((s: any) => s.question);
          questions.sort((a: any, b: any) => questionOrder.indexOf(a.id) - questionOrder.indexOf(b.id));
        }
      }

      const defaultSubmissions = isOngoingAttempt ? attemptData.submission
        : questions.map((question: any) => {
          return {
            question: question.id,
            flag: false,
            answered: false,
            type: question.type,
            mcqAnswer: [],
            essayAnswer: '',
          }
        });
        
      submissionUpdateMutation({ submissions: defaultSubmissions, quizId: quizId, courseId: courseId, attemptId: attemptId });
      setSettings(examData.settings);
      setQuizArray(questions);
      setSubmssions(defaultSubmissions);

      if (!examData.settings.timeBox.state) {
        const updatedDate = new Date(
          Date.now() +
          examData.settings.duration.durationMinutes * 60 * 1000 +
          examData.settings.duration.durationSeconds * 1000 -
          (isOngoingAttempt ? elapsedTime * 1000 : 0)
        );
        setPage(1);
        restart(updatedDate, true);
      }
      else {
        if (isOngoingAttempt) {
          let questionDurations: number[] = [];
          if (examData.settings.timeBox.isAllQuestions)
            questionDurations = examData.questions.map(() =>
              examData.settings.timeBox.durationMinutes * 60 + examData.settings.timeBox.durationSeconds)
          else
            questionDurations = examData.questions.map((q: any) => q.durationSeconds)

          let totalDuration = 0;
          const onGoingQuestionIndex = questionDurations.findIndex((duration: number) => {
            totalDuration += duration;
            return totalDuration > elapsedTime;
          });
          const updatedDate = new Date(Date.now() + totalDuration * 1000 - elapsedTime * 1000);
          setPage(onGoingQuestionIndex + 1);
          restart(updatedDate, true)
        }
        else
          handleTimeout();
      }
    }
  }, [examData, attemptData]);

  React.useEffect(() => {
    if (!isRunning && settings.duration.unlimited == false)
      handleTimeout();
  }, [isRunning]);

  React.useEffect(() => {
    if (isQuizSubmitted)
      navigate(`/student/${courseId}/quiz/${quizId}/attempt/${attemptId}/results`);
  }, [isQuizSubmitted]);

  if (isExamLoading || isExamError || isAttemptError || isAttemptError)
    return <Skeleton></Skeleton>;

  const submit = () => {
    restart(new Date(), true);
    setPage(quizArray.length + 1);
    submissionCompleteMutation({ submissions: submissions, quizId: quizId, courseId: courseId, attemptId: attemptId });
  }

  const handleFlagged = (id: string) => {
    const temp = submissions;
    const index = temp.map(e => e.question).indexOf(id);
    temp[index].flag = !temp[index].flag;
    setSubmssions([...temp]);
  };

  const handleAnswerChanged = (id: string, answer: any, type: any) => {
    const temp = submissions;
    const index = temp.map(e => e.question).indexOf(id);
    if (type == 'mcq')
      temp[index].mcqAnswer = temp[index].mcqAnswer.some((e: any) => answer == e.id) ? temp[index].mcqAnswer.filter((e: any) => answer != e.id) : [...temp[index].mcqAnswer, { id: answer }]; // if answer is already present remove it else add it
    else if (type == 'essay')
      temp[index].essayAnswer = answer;

    temp[index].answered = temp[index].mcqAnswer.length != 0 || temp[index].essayAnswer.length != 0 ? true : false;

    submissionUpdateDebounce({ submissions: temp, quizId: quizId, courseId: courseId, attemptId: attemptId });
    setSubmssions([...temp]);
  };

  const handleTimeout = () => {
    const s = examData ? examData.settings : settings;
    const q = examData ? examData.questions : quizArray;

    if (s.timeBox.state && page < q.length) {
      let updatedDate = new Date();
      let duration = 0;
      if (s.timeBox.isAllQuestions) {
        duration = s.timeBox.durationMinutes * 60 * 1000 + s.timeBox.durationSeconds * 1000;
        updatedDate = new Date(Date.now() + duration);
      }
      else if (!s.timeBox.isAllQuestions) {
        duration = q[page].durationSeconds * 1000;
        updatedDate = new Date(Date.now() + duration);
      }
      setPage(page + 1);
      restart(updatedDate, true);
      submissionUpdateMutation({ submissions: submissions, quizId: quizId, courseId: courseId, attemptId: attemptId });
    }
    else {
      submit();
    }
  }

  return (
    <Container>
      <Box
        sx={{
          padding: 3,
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6">{settings.title}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          {isQuizSubmitting == false && quizArray.filter((q: any, i: number) => (i == page - 1)).map((quiz: any, index: number) => (
            <Stack direction={'row'} spacing={0}>
              {quiz.type == 'mcq' && (
                <MCQ
                  index={page}
                  noOfQuestions={quizArray.length}
                  questionId={quiz.id}
                  answers={quiz.answers}
                  question={quiz.question}
                  answer={submissions[submissions.map(e => e.question).indexOf(quiz.id)].mcqAnswer}
                  isFlagged={
                    submissions[submissions.map(e => e.question).indexOf(quiz.id)].flag
                  }
                  isAnswered={
                    submissions[submissions.map(e => e.question).indexOf(quiz.id)].answered
                  }
                  randomizeAnswers={settings.randomizeAnswers}
                  setFlag={handleFlagged}
                  setAnswer={handleAnswerChanged}
                />
              )}
              {quiz.type == 'essay' && (
                <EssayQ
                  index={page}
                  noOfQuestions={quizArray.length}
                  questionId={quiz.id}
                  question={quiz.question}
                  answer={submissions[submissions.map(e => e.question).indexOf(quiz.id)].essayAnswer}
                  isFlagged={
                    submissions[submissions.map(e => e.question).indexOf(quiz.id)].flag
                  }
                  isAnswered={
                    submissions[submissions.map(e => e.question).indexOf(quiz.id)].answered
                  }
                  setFlag={handleFlagged}
                  setAnswer={handleAnswerChanged}
                />
              )}
            </Stack>
          ))}
          {(isQuizSubmitting || isQuizSubmitError) &&
            <Container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Submitting...
              <CircularProgress />
            </Container>
          }
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle2">Questions</Typography>
            <Grid container>
              {quizArray.map((quiz: any, index: any) => (
                <QBox
                  index={index + 1}
                  isFlagged={
                    submissions[submissions.map(e => e.question).indexOf(quiz.id)].flag
                  }
                  isAnswered={
                    submissions[submissions.map(e => e.question).indexOf(quiz.id)].answered
                  }
                />
              ))}
            </Grid>
            <Box>
              <Typography variant="subtitle2">Time Remaining</Typography>
              {
                settings?.duration?.unlimited == false &&
                <Box>
                  <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                </Box>
              }
            </Box>
            <Button variant="contained" onClick={submit} sx={{}}>
              Submit All
            </Button>
          </Card>
        </Grid>
        {(settings.timeBox && settings.timeBox.state == false) &&
          <Grid item xs={9}>
            <Stack spacing={5} sx={{ alignItems: 'center', marginBottom: 5 }}>
              <Pagination count={quizArray.length} page={page} onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                setPage(value);
              }} shape="rounded" />
            </Stack>
          </Grid>
        }
      </Grid>
    </Container>
  );
}