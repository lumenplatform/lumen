import { Button, Card, Grid, Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
// import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import EssayQ from '../../components/EssayQuiz';
import MCQ from '../../components/MCQQuiz';
// import NumberCard from '../../components/QuizNumberCard';
import * as React from 'react';
import { useQuery,useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import { getQuizById , submitQuiz } from '../../api';

function QBox(props: any) {
  const { isFlagged, isAnswered } = props;
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
  answer?: any;
  flag: boolean;
  answered: boolean;
};

const defaultSubmission = {
  flag: false,
  answered: false,
};

const temp = { sadsadasd: defaultSubmission };

export default function Quizpage(props: any) {
  const submissionDefault: { [key: string]: Submission } = {};
  const [submissions, setSubmssions] = React.useState<{
    [key: string]: Submission;
  }>({});
  const [quizArray, setQuizArray] = React.useState<any>([]);
  const [settings, setSettings] = React.useState<any>({});
  const examSubmitMutation = useMutation(submitQuiz);

  const { courseId, quizId } = useParams();

  const {
    data: examData,
    isLoading,
    isError,
  } = useQuery(['quiz', quizId], () => getQuizById(courseId!, quizId!));

  const submit = ()=>{
    examSubmitMutation.mutate({submission : submissions , quizId : quizId , courseId :courseId});
  }
  const { seconds, minutes, hours, isRunning,restart } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => submit,
  });

  React.useEffect(() => {
    if (examData) {
      let result = examData.questions.map((a: any) => a.id);
      const obj = result.reduce(
        (acc: any, curr: any) => (
          (acc[curr] = { flag: false, answered: false }), acc
        ),
        {}
      );
      setSubmssions(obj);
      setQuizArray([...examData.questions]);
      setSettings(examData.settings);
      const updatedDate = new Date(
        Date.now() +
          examData.settings.duration.durationSeconds * 60 * 1000 +
          examData.settings.duration.durationSeconds * 1000
      );
      restart(updatedDate,true);
    }
  }, [examData]);

  if (isError || isLoading) return <Skeleton></Skeleton>;

  const handleFlagged = (id: string) => {
    const temp = submissions;
    temp[id].flag = !temp[id].flag;
    setSubmssions((prevState: any) => ({ ...prevState, ...temp }));
  };

  const handleAnswerChanged = (id: string, answer: any, type: any) => {
    console.log(id);
    console.log(answer);
    console.log(submissions);
    const temp = submissions;
    if (type == 'mcq') {
      temp[id].answer = temp[id].answer ? temp[id].answer : [];
      temp[id].answer = temp[id].answer.some((e: any) => answer == e)
        ? temp[id].answer.filter((e: any) => answer != e)
        : [...temp[id].answer, answer];
    } else if (type == 'essay') temp[id].answer = answer;
    temp[id].answered = temp[id].answer.length != 0 ? true : false;
    setSubmssions((prevState: any) => ({ ...prevState, ...temp }));
    console.log(submissions);
  };

  const time = new Date();
  // const time = settings.duration
  time.setSeconds(time.getSeconds() + 600);
  


  return (
    <Box>
      <Box
        sx={{
          padding: 3,
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6">{settings.title}</Typography>
      </Box>

      <Grid container>
        <Grid item xs={9}>
          {quizArray.map((quiz: any, index: number, arr: any) => (
            <Stack direction={'row'} spacing={0}>
              {quiz.type == 'mcq' && (
                <MCQ
                  index={index + 1}
                  noOfQuestions={arr.length}
                  questionId={quiz.id}
                  answers={quiz.answers}
                  question={quiz.question}
                  isFlagged={submissions[quiz.id].flag}
                  setFlag={handleFlagged}
                  setAnswer={handleAnswerChanged}
                />
              )}
              {quiz.type == 'essay' && (
                <EssayQ
                  index={index + 1}
                  noOfQuestions={arr.length}
                  questionId={quiz.id}
                  question={quiz.question}
                  isFlagged={submissions[quiz.id].flag}
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
                    val={index + 1}
                    id={value}
                    isFlagged={submissions[value].flag}
                    isAnswered={submissions[value].answered}
                  />
                ))}
              </Grid>
            </Box>

            <Box sx={{ marginBottom: 5, padding: 1 }}>
              <Typography variant="subtitle2">Time Remaining</Typography>
              <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
              
            </Box>

            <Button
              variant="contained"
              sx={{ marginTop: 5, marginRight: 5, marginLeft: 15, width: 120 }}
              onClick={submit}
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
