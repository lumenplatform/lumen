import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function JoinForFree() {
  const navigate = useNavigate();
  return (
    <Box sx={{}}>
      <Container>
        <Stack direction={'row'} alignItems="center">
          <Stack flex="1" alignItems="end">
            <img
              src="/assets/images/illustration_4.png"
              style={{ width: '90%', margin: '2rem 0' }}
              alt=""
            />
          </Stack>
          <Stack flex="1">
            <Box sx={{ maxWidth: '40rem' }}>
              <Typography fontSize={'2rem'} fontWeight="600" sx={{ mb: 2 }}>
                We help You to Succeed in <br /> Your Dream
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Join now to receive personalized recommendations from the full
                course catalog.
              </Typography>
              <Button variant="contained" onClick={() => navigate('/student')} disableElevation>
                Join Today
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
