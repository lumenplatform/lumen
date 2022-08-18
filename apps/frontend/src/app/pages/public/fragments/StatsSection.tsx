import { Box, Container, Stack, Typography, useTheme } from '@mui/material';

export function StatsSection() {
  const theme = useTheme();

  const Stat = ({ count, name }: { count: string; name: string }) => {
    return (
      <Box sx={{ textAlign: 'center', mx: 2, my: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color={theme.palette.primary.main}
        >
          {count}
        </Typography>
        <Typography>{name}</Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ background: '#fafafa' }}>
      <Container>
        <Stack direction={'row'} justifyContent="space-around">
          <Stat count="50K+" name="Students Joined" />
          <Stat count="10+" name="Awesome Courses" />
          <Stat count="75+" name="Great Teachers" />
          <Stat count="500+" name="Hours of Content" />
        </Stack>
      </Container>
    </Box>
  );
}
