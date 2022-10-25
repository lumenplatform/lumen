import {
  Box,
  Button,
  Container,
  Divider,
  InputAdornment, Stack,
  TextField, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


export function BusinessSection() {
  const navigate = useNavigate();
  return (
    <Box sx={{ background: '#fafafa' }}>
      <Container>
        <Stack direction={'row'} alignItems="center">
          <Stack flex="1" p={3}>
            <Box sx={{ maxWidth: '30rem' }}>
              <Typography sx={{ mb: 2, fontWeight: 600 }} fontSize={'1.5rem'}>
                Learn how Lumen can help your organization
              </Typography>
              <Typography>
                We have great features for the organizations. whether you are an
                academic or a business organization
              </Typography>
              <br></br>
              <Button variant="outlined" onClick={() => navigate('/manage')}> Register Organization </Button>
              <Divider textAlign="left" sx={{ my: 2 }}>
                OR
              </Divider>
              <Stack direction={'row'}>
                <TextField
                  size="small"
                  placeholder="Your Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">@</InputAdornment>
                    ),
                  }} />
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  disableElevation
                >
                  Get a Demo
                </Button>
              </Stack>
            </Box>
          </Stack>
          <Stack flex="1">
            <img
              src="/assets/images/illustration_1.png"
              style={{ width: '80%' }}
              alt="" />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
