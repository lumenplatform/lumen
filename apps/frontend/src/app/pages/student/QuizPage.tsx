import { Button, Card, Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import EssayQ from '../../components/EssayQuiz';
import MCQ from '../../components/MCQQuiz';
import NumberCard from '../../components/QuizNumberCard';

const quizCount = 15;
let i: number;

export default function Quizpage() {
  return (
    <Box>
      <Box
        sx={{
          height: 30,
          backgroundColor: 'primary.light',
        }}
      ></Box>

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
            <Box sx={{ marginBottom: 5, border: '3px primary.dark' }}>
              <Typography variant="subtitle1">Questions</Typography>

              <Grid container>
                for(i in quizCount) {
                  console.log(i)
                }
                {/* <Box border={1} sx={{width:30, height:50, padding:1.5, margin:0.5}}><Typography variant="subtitle2">1</Typography></Box>
                <Box border={1} sx={{width:30, height:50, padding:1.5,margin:0.5}}><Typography variant="subtitle2">1</Typography></Box>
                <Box border={1} sx={{width:30, height:50, padding:1.5,margin:0.5}}><Typography variant="subtitle2">1</Typography></Box>
                <Box border={1} sx={{width:30, height:50, padding:1.5,margin:0.5}}><Typography variant="subtitle2">1</Typography></Box>
                <Box border={1} sx={{width:30, height:50, padding:1.5,margin:0.5}}><Typography variant="subtitle2">1</Typography></Box> */}
              

                
              </Grid>
            </Box>

            <Typography variant="subtitle2">Time Remaining</Typography>

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
