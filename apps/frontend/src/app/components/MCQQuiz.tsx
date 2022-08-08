import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { Card, Container, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import * as React from 'react';

export default function MCQ() {
  const [flag, setFlag] = React.useState(true);

  const handleClick = () => {
    setFlag(!flag);
  };

  return (
    <Container sx={{ padding: 5 }}>
      <Card sx={{ Width: 800, minHeight: 300 }}>
        <Box
          sx={{ backgroundColor: 'primary.main', minHeight: 40, padding: 2 }}
        >
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="subtitle1">Question 1 of 15</Typography>
            </Grid>

            <Grid item xs={2}>
              <IconButton
                sx={{ padding: 0, paddingRight: 1, display: 'inline' }}
                onClick={handleClick}
                color={flag ? 'default' : 'secondary'}
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
            <FormLabel id="quiz" sx={{ paddingBottom: 3 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat
            </FormLabel>

            <RadioGroup
              aria-labelledby="quiz"
              defaultValue="female"
              name="radio-buttons-group"
              sx={{ paddingLeft: 5 }}
            >
              <FormControlLabel
                value="c1"
                control={<Radio />}
                label="Choice 1"
              />
              <FormControlLabel
                value="c2"
                control={<Radio />}
                label="Choice 2"
              />
              <FormControlLabel
                value="c3"
                control={<Radio />}
                label="Choice 3"
              />
              <FormControlLabel
                value="c4"
                control={<Radio />}
                label="Choice 4"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Card>
    </Container>
  );
}
