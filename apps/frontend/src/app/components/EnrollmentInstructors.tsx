import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Instructors() {
  return (
    <Container>
      <Stack
        direction="row"
        spacing={3}
        sx={{ margin: '2% 0' }}
        alignItems="center"
      >
        <Avatar
          alt="Remy Sharp"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU"
          sx={{ width: 90, height: 90 }}
        />
        <Stack>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Remy Sharp
          </Typography>
          <Typography variant="subtitle1">1250 learners</Typography>
          <Typography variant="subtitle1">12 courses</Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={3}
        sx={{ margin: '3% 0' }}
        alignItems="center"
      >
        <Avatar
          alt="Kewin Wayne"
          src="https://cdn-icons-png.flaticon.com/512/146/146031.png"
          sx={{ width: 90, height: 90 }}
        />
        <Stack>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Kevin Wayne
          </Typography>
          <Typography variant="subtitle1">1340 learners</Typography>
          <Typography variant="subtitle1">10 courses</Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
