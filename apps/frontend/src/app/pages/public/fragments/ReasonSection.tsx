import { Box, Button, Container, Stack, Typography } from '@mui/material';

export function ReasonSection() {
  return (
    <Box >
      <Container>
        <Stack direction={'row'} alignItems="center" >
          <Stack flex="1" alignItems="center" justifyContent="center">
            <Typography fontSize={'2rem'} fontWeight="600" sx={{textAlign: 'left', display:'flex', flexDirection: 'column', alignItems: 'center'}}>
              Why students love <br />
              choosing Lumen
            </Typography>
            <img
              src="/assets/images/illustration_6.png"
              style={{ width: '40%'}}
              alt=""
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
