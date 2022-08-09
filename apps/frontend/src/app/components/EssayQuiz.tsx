import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { Container, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function EssayQ(props:any) {
  const { questionId, setFlag, setAnswer, question, isFlagged } = props;

  return (
    <Container sx={{ padding: 5 }}>
        <Card sx={{ Width: 800, minHeight: 300 }}>
          <Box sx={{ backgroundColor: '#a0a69d', minHeight: 40, padding: 2 }}>
            <Grid container>
              <Grid item xs={10}>
                <Typography variant="subtitle1">
                  Question {questionId} of 15
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <IconButton
                  sx={{ padding: 0, paddingRight: 1, display: 'inline' }}
                  onClick={() => setFlag(questionId)}
                  color={isFlagged ? 'default' : 'secondary'}
                >
                  <FlagOutlinedIcon />
                </IconButton>
                <Typography variant="body2" display={'inline'}>
                  Flag Question
                </Typography>
              </Grid>
            </Grid>

          </Box>

          <Box sx={{ padding: 5 }}>
            <FormControl>
             
              <Typography variant="body1" paddingBottom={3}>
                {question}
              </Typography>

              <TextField
                id="essay"
                multiline
                maxRows={20}
                variant="outlined"
                fullWidth
                rows={10}
                onChange={(e)=>setAnswer(questionId,e.target.value,'essay')}
              />
            </FormControl>
          </Box>
        </Card>

      
    </Container>
  );
}
