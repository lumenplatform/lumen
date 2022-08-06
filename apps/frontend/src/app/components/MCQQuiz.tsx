import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export default function MCQ() {
  return (

    <Container sx={{ padding: 5 }}>

      <Card sx={{ Width: 800, minHeight: 300 }}>

        <Box
          sx={{ backgroundColor: 'primary.dark', minHeight: 40, padding: 2 }}
        >
          <Typography variant="subtitle1">Question 1 of 15</Typography>
        </Box>

        <Box sx={{ padding: 5 }}>

          <FormControl>

            <FormLabel id="quiz" sx={{ paddingBottom: 3 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
