import {
  Box,
  Button,
  Link as MuiLink,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FilesInput from '../components/FilesInput';

export default function HomePage(props: any) {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: '1024px', mx: 'auto' }}>
      <Toolbar sx={{ my: 2 }}>
        <img src="/assets/icons/logo_horiz.png" style={{ height: '50px' }} />
        <MuiLink sx={{ ml: 3, mt: '3px' }} underline="hover">
          Features
        </MuiLink>{' '}
        &nbsp;
        <MuiLink sx={{ ml: 2, mt: '3px' }} underline="hover">
          Pricing
        </MuiLink>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button sx={{ mr: 2 }} onClick={() => navigate('/manage')}>
          For Teachers
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => navigate('/student')}
        >
          Start Learning
        </Button>
      </Toolbar>
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
              variant="outlined"
              disableElevation
              onClick={() => navigate('/student')}
            >
              Get Started
            </Button>
          </Box>
        </Box>
        <img src="/assets/images/illustration_3.png" style={{ width: '50%' }} />
      </Box>
      <FilesInput />
    </Box>
  );
}
