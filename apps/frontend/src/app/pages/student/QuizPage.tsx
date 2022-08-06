import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { width } from '@mui/system';
import MCQ from '../../components/MCQQuiz';
import EssayQ from '../../components/EssayQuiz';

export default function Quizpage() {
  return (
    <Box>
    <MCQ/>
 
    <EssayQ/>
    </Box>
  );
}
