import { Box, Container, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { search } from '../../../api';
import CourseCard from '../../../components/CourseCard';

export function FeaturedCourses() {
  const { data } = useQuery('featuredCourses', () => search({}));

  return (
    <Box sx={{}}>
      <Container>
        <Box sx={{ px: 3, pt: 3 }}>
          <Typography variant="h6">Featured </Typography>
        </Box>
        <Stack direction={'row'} sx={{ p: 3 }} spacing={2}>
          {data && data.slice(0, 3).map((e: any) => <CourseCard course={e} />)}
        </Stack>
      </Container>
    </Box>
  );
}
