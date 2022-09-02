import CheckIcon from '@mui/icons-material/Check';
import {
  Button,
  Card,
  Divider,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getAttemptById, getQuizById, markSubmssion } from '../../../api';
import EssayQ from '../../../components/EssayQuiz';
import MCQ from '../../../components/MCQQuiz';
import Pagination from '@mui/material/Pagination';

function MarkingBox(props: any) {
  const { markEnabled, maxMarks, submissionId, marks = 0 } = props;
  const [marksInput, setMarksInput] = useState(marks);
  const { courseId, examId, attemptId } = useParams();
  const { mutate: submissionMarkMutation } = useMutation(markSubmssion);
  const mark = (mark: number) => {
    submissionMarkMutation({
      quizId: examId,
      courseId: courseId,
      attemptId: attemptId,
      submissionId: submissionId,
      mark: { submissionId: submissionId, marks: mark },
    });
  };

  return (
    <Box sx={{ m: 2, display: 'flex', justifyContent: 'end' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="subtitle1"> marks : </Typography>
        <TextField
          size="small"
          disabled={!markEnabled}
          defaultValue={marksInput}
          type="number"
          sx={{ width: '10ch', mr: 2 }}
          InputProps={{
            inputProps: { min: 0, max: maxMarks },
            endAdornment: (
              <InputAdornment position="end">/{maxMarks}</InputAdornment>
            ),
          }}
          onChange={(e) => setMarksInput(parseInt(e.target.value))}
        />
        <Button endIcon={<CheckIcon />} onClick={() => mark(marksInput)}>
          Save
        </Button>
      </Stack>
    </Box>
  );
}

//dummy data for quiz array
const quizArray = {
  title: 'exam title',
  id: '01',
  questions: [
    {
      questionid: 'q01',
      qtype: 'mcq',
      question: 'question test iggiugiugiugiu',
      answers: [
        { answerid: 'a1', answer: 'nibgyigigi' },
        { answerid: 'a2', answer: 'n2ryigigi' },
        { answerid: 'a3', answer: 'nsgigigi' },
      ],
    },
  ],
};

export default function QuizMarking() {
  // const { courseId, examId, attemptId } = useParams();
  // const [quizArray, setQuizArray] = useState<any>([]);
  // const {
  //   data: attemptData,
  //   isLoading: isAttemptLoading,
  //   isError: isAttemptError
  // } = useQuery(['attempt', attemptId], () => getAttemptById(courseId!, examId!, attemptId!));

  // const {
  //   data: examData,
  //   isLoading: isExamLoading,
  //   isError: isExamError,
  // } = useQuery(['exam', examId], () => getQuizById(courseId!, examId!));

  // useEffect(() => {
  //   if (examData && attemptData) {
  //     const quizArray = examData.questions.map((q: any) => {
  //       const [submission] = attemptData.submission.filter((s: any) => (s.question == q.id))
  //       return { submission: { ...submission }, ...q };
  //     })
  //     setQuizArray([...quizArray]);
  //   }
  // }, [examData, attemptData]);

  // if (isExamLoading || isExamError || isAttemptError || isAttemptError)
  //   return <Skeleton></Skeleton>;

  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5">{'Exam title'}</Typography>
      <Typography variant="body1"> Attempt {'01'}</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ minWidth: 800 }}>
          {quizArray.questions.map((quiz: any, index: number, arr: any) => (
            <Stack>
              {quiz.type == 'essay' && (
                <Card sx={{ marginTop: 2 }}>
                  <EssayQ
                    index={index + 1}
                    noOfQuestions={arr.length}
                    questionId={quiz.id}
                    question={quiz.question}
                    answer={quiz.submission.essayAnswer}
                    disabled={true}
                  />
                  <Divider />
                  <MarkingBox
                    markEnabled={true}
                    maxMarks={quiz.marks}
                    marks={quiz.submission.marks}
                    submissionId={quiz.submission.id}
                  />
                </Card>
              )}
              {quiz.type == 'mcq' && (
                <Card sx={{ marginTop: 2 }}>
                  <MCQ
                    index={index + 1}
                    noOfQuestions={arr.length}
                    questionId={quiz.id}
                    answers={quiz.answers}
                    answer={quiz.submission.mcqAnswer}
                    question={quiz.question}
                    disabled={true}
                  />
                  <Divider />
                  <MarkingBox
                    markEnabled={false}
                    maxMarks={quiz.marks}
                    marks={quiz.submission.marks}
                    submissionId={quiz.submission.id}
                  />
                </Card>
              )}
            </Stack>
          ))}
        </Box>
      </Box>

      <Stack spacing={10}>
        <Pagination count={0} />
      </Stack>
    </Box>
  );
}
