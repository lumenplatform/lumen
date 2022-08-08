import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

export default function EssayQ() {
  return (
    <Container sx={{ padding: 5 }}>
      <Card sx={{ Width: 800, minHeight: 300 }}>
        <Box
          sx={{ backgroundColor: 'primary.main', minHeight: 40, padding: 2 }}
        >
          <Typography variant="subtitle1">Question 1 of 15</Typography>
        </Box>

        <Box sx={{ padding: 5 }}>
          <FormControl>
            <FormLabel id="quiz" sx={{ paddingBottom: 3 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat
            </FormLabel>

            <TextField
              id="essay"
              multiline
              maxRows={20}
              variant="outlined"
              fullWidth
              rows={10}
            />
          </FormControl>
        </Box>
      </Card>
    </Container>
  );
}
