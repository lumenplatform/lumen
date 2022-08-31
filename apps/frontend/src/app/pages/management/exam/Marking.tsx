import { Card, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EssayQ from '../../../components/EssayQuiz';
import MCQ from '../../../components/MCQQuiz';
import Divider from '@mui/material/Divider';

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
    {
      questionid: 'q02',
      qtype: 'essay',
      question: 'question2 test iggiugiugiugiu',
      answer: 'test answer2 fbaifbaufbiaufebiuba',
    },
  ],
};
function MarkingBox(props: any) {
  let typeflag;

  return (
    <Box sx={{ paddingLeft: 6, marginBottom: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="subtitle1">marks : </Typography>
        {typeflag && <TextField id="marks" variant="outlined" size="small" />}
        {!typeflag && (
          <TextField disabled id="marks" variant="outlined" size="small" />
        )}
      </Stack>
    </Box>
  );
}

export default function QuizMarking() {
  return (
    <Box>
      <Typography variant="h5">{quizArray.title}</Typography>
      <Typography variant="body1">Student Name or ID</Typography>

      {quizArray.questions.map((quiz: any, index: number, arr: any) => (
        <Stack>
          {quiz.qtype == 'essay' && (
            <Box>
              <Card>
                <EssayQ
                  index={index + 1}
                  noOfQuestions={arr.length}
                  questionId={quiz.id}
                  question={quiz.question}
                />
                <MarkingBox flag="false" />
              </Card>
              <Divider />
            </Box>
          )}

          {quiz.qtype == 'mcq' && (
            <Box>
              <Card>
                <MCQ
                  index={index + 1}
                  noOfQuestions={arr.length}
                  questionId={quiz.id}
                  answers={quiz.answers}
                  question={quiz.question}
                />
                <MarkingBox flag="true" />
              </Card>
              <Divider />
            </Box>
          )}
        </Stack>
      ))}
    </Box>
  );
}
