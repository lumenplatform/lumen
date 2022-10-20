import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { Container, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function EssayQ(props: any) {
  const { questionId, setFlag, setAnswer, question, isFlagged, noOfQuestions, index, answer } = props;

  return (
    <Container>
      <Card sx={{ minHeight: 400 }}>
        <Box sx={{ backgroundColor: '#a0a69d', minHeight: 40, padding: 2 }}>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="subtitle1">
                Question {index} of {noOfQuestions}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <IconButton
                sx={{ padding: 0, paddingRight: 1, display: 'inline' }}
                onClick={() => setFlag(questionId)}
                color={isFlagged ? 'error' : 'default'}
              >
                <FlagOutlinedIcon />
              </IconButton>
              <Typography variant="body2" display={'inline'}>
                Flag Question
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ p: 3, width: '100%' }}>
          <FormControl sx={{ width: '100%' }}>
            <Typography variant="body1" paddingBottom={3}>
              {question}
            </Typography>
            <TextField
              id="essay"
              multiline
              variant="outlined"
              fullWidth
              rows={7}
              value={answer}
              onChange={(e) => setAnswer(questionId, e.target.value, 'essay')}
            />
          </FormControl>
        </Box>
      </Card>
    </Container >
  );
}
