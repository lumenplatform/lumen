import { Box, Container, Stack, Typography } from '@mui/material';
import CourseCard from '../../../components/CourseCard';

export function FeaturedCourses() {
  return (
    <Box sx={{}}>
      <Container>
        <Box sx={{ px: 3, pt: 3 }}>
          <Typography variant="h6">Featured </Typography>
        </Box>
        <Stack direction={'row'} sx={{ p: 3 }} spacing={2}>
          {[1, 2, 3].map((e) => (
            <CourseCard />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
