import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export function StudentHero() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box sx={{ background: alpha(theme.palette.primary.main, 0.1) }}>
      <Container>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              flex: 1,
              pl: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h2" fontWeight={600} my={3}>
              Learning, Reimagined.
            </Typography>
            <Typography mb={3}>
              Improve to your knowledge, wherever you are.
            </Typography>
            <Box>
              <Button
                variant="contained"
                // color="secondary"
                size="large"
                onClick={() => navigate('/student')}
              >
                Get Started
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <img
              src="/assets/images/img_1.png"
              alt=""
              style={{ minWidth: '150%' }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
