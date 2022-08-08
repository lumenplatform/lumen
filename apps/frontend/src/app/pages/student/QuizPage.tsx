import { Button, Card, Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import EssayQ from '../../components/EssayQuiz';
import MCQ from '../../components/MCQQuiz';
import NumberCard from '../../components/QuizNumberCard';
import { useState } from 'react';
import * as React from 'react';

function QBox(props:any){
  return(
    <Box border={1} sx={{width:30, height:50, padding:1, margin:0.5}}>
        <Typography variant='subtitle2'>{props.val}</Typography>
    </Box>
  )
}

export default function Quizpage() {

  const quizcount=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  return (
    <Box>
      <Box
        sx={{
          // height: 100,
          backgroundColor: 'primary.light', padding:5
        }}
      >
        <Typography variant='h6'>Exam Title</Typography>
      </Box>

      <Grid container>
        <Grid item xs={9}>
          <Stack direction={'row'} spacing={0}>
            <NumberCard />
            <MCQ />
          </Stack>

          <Stack direction={'row'} spacing={0}>
            <NumberCard />
            <EssayQ />
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ minHeight: 500, margin: 5, padding: 3 }}>
            <Box sx={{ marginBottom: 5, padding:1}} border = {2} >
              <Typography variant="subtitle1">Questions</Typography>

              <Grid container>
                
                {/* <QBox/> */}
                {quizcount.map((r:number)=>(
                  <QBox val={r}></QBox>
                ))}
                
              </Grid>
            </Box>
            <Box sx={{ marginBottom: 5, padding:1}} border = {2} >
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

      <Stack spacing={5} sx={{ alignItems: 'center', marginBottom: 5 }}>
        <Pagination count={15} color="primary" size="large" />
      </Stack>
    </Box>
  );
}
