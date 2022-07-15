import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Instructors() {
  return (
    <Container>
    <Stack direction="row" spacing={3} sx={{margin:'2% 0'}}>
      <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU"  sx={{ width: 90, height: 90 }}/>
      <Stack sx={{padding:'0.7% 0 0 0'}}>
        <Typography variant='h6' >Remy Sharp</Typography>
        <Typography variant='subtitle2'>1250 learners</Typography>
        <Typography variant='subtitle2'>12 courses</Typography>
      </Stack>
    </Stack>

  

    <Stack direction="row" spacing={3}>
      <Avatar alt="Kewin Wayne" src="https://cdn-icons-png.flaticon.com/512/146/146031.png"  sx={{ width: 90, height: 90 }}/>
      <Stack sx={{padding:'0.7% 0 0 0'}}>
        <Typography variant='h6' >Kevin Wayne</Typography>
        <Typography variant='subtitle2'>1340 learners</Typography>
        <Typography variant='subtitle2'>10 courses</Typography>
      </Stack>
    </Stack>

    </Container>


  );
}
