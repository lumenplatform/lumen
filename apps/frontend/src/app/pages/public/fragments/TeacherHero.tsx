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
          <Typography variant="h3" fontWeight={600} mt={3}>
            The Secure <br></br>Course Delivery Platform
          </Typography>
          <Typography variant="body1" mb={3} mt={1}>
            Advanced Protection For Your Content
          </Typography>
          <Box>
            <Button
              variant="contained"
              onClick={() => navigate('/manage')}
              disableElevation
            >
              Start Teaching
            </Button>
          </Box>
        </Box>
        <img
          src="/assets/images/illustration_3.png"
          alt=""
          style={{ width: '50%' }}
        />
      </Box>
    </Container>
  );
}
