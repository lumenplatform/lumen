import * as React from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import {
  Button,
  FormControl,
  MenuItem,
  Skeleton,
  TableCell,
} from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizById } from '../../../api';
import SubmissionMarking from './SubmissionMarking';

export default function QuizMarkingAll() {
  const { courseId, examId, questionId } = useParams();
  const navigate = useNavigate();

  const {
    data: examData,
    isLoading: isExamLoading,
    isError: isExamError,
  } = useQuery(['exam', examId], () => getQuizById(courseId!, examId!));

  const [nextQuestionId, setNextQuestionId] = useState<string | null>(null);
  const [prevQuestionId, setPrevQuestionId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (examData) {
      const questionIndex = examData.questions.findIndex(
        (question: any) => question.id === questionId
      );
      setCurrentQuestionIndex(questionIndex);
      if (questionIndex !== -1) {
        if (questionIndex !== 0)
          setPrevQuestionId(examData.questions[questionIndex - 1].id);
        else setPrevQuestionId(null);

        if (questionIndex !== examData.questions.length - 1)
          setNextQuestionId(examData.questions[questionIndex + 1].id);
        else setNextQuestionId(null);
      }
    }
  }, [examData, questionId]);

  if (isExamLoading || isExamError) return <Skeleton />;

  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5">{examData.settings.title}</Typography>

      <Button
        startIcon={<ArrowBack />}
        onClick={() =>
          navigate(`/manage/courses/${courseId}/exam/${examId}/questions`)
        }
        color="inherit"
        sx={{ marginTop: 4 }}
      >
        Back to Questions
      </Button>

      <Table sx={{ marginTop: 1 }}>
        <TableCell>
          <Button
            startIcon={<ArrowBack />}
            onClick={() =>
              navigate(
                `/manage/courses/${courseId}/exam/${examId}/question/${prevQuestionId}/submission`
              )
            }
            color="inherit"
            variant="contained"
            disabled={prevQuestionId === null}
          >
            Previous Question
          </Button>
        </TableCell>

        <TableCell align="right">
          <Button
            startIcon={<ArrowForward />}
            onClick={() =>
              navigate(
                `/manage/courses/${courseId}/exam/${examId}/question/${nextQuestionId}/submission`
              )
            }
            color="inherit"
            variant="contained"
            disabled={nextQuestionId === null}
          >
            Next Question
          </Button>
        </TableCell>
      </Table>

      <SubmissionMarking
        index={currentQuestionIndex}
        noOfQuestions={examData.questions.length}
      />
    </Box>
  );
}
