import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TeacherHero() {
  const navigate = useNavigate();
  return (
    <Container>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            flexGrow: 1,
            pl: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2" fontWeight={600} my={3}>
            Secure <br></br>Course Delivery Platform
          </Typography>
          <Box>
            <Button
              variant="contained"
              onClick={() => navigate('/manage')}
            >
              Start Teaching
            </Button>
          </Box>
        </Box>
        <img src="/assets/images/illustration_3.png" alt='' style={{ width: '50%' }} />
      </Box>
    </Container>
  );
}
