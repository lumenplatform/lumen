import { Box, Button, Stack, Typography } from '@mui/material';
import StudentHeader from './StudentHeader';

export default function AppBanner({ link }: { link: string }) {
  return (
    <>
      <StudentHeader />
      <Stack
        alignItems={'center'}
        justifyContent="center"
        sx={{ height: '80vh' }}
      >
        <img height={'300px'} src="/assets/images/illustration_security.svg" />
        <Typography variant="h5">Access Restricted</Typography>
        <Typography>
          This course can only be accessed through our app
        </Typography>
        <Button
          variant="contained"
          disableElevation
          sx={{ my: 3 }}
          onClick={() => window.open(link, '_blank')}
        >
          Continue in App
        </Button>
        <Button sx={{ my: 3 }} onClick={() => history.back()}>
          Go Back
        </Button>
      </Stack>
    </>
  );
}
