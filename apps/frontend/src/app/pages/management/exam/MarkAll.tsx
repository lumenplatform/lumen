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
import { ArrowBack,ArrowForward } from '@mui/icons-material';

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
      type: 'mcq',
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
 
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5">{'Exam title'}</Typography>
      {/* <Typography variant="body1"> Attempt {'01'}</Typography> */}

      {/* for two buttons to go to questions. have to edit */}
      <Box> 
          <Button
            startIcon={<ArrowBack/>}
            // onClick ={()=> navigate(`/manage/courses/${courseId}/exam/${examId}/attempts`)}
            color="inherit"
            variant='contained'
            >
          </Button>
          <Button
            startIcon={<ArrowForward/>}
            // onClick ={()=> navigate(`/manage/courses/${courseId}/exam/${examId}/attempts`)}
            color="inherit"
            variant='contained'
            >
          </Button>
        </Box>
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
