import {
  Box,
  Button,
  Container,
  Divider,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { completeCourse, getCourseById } from '../../../api';
import StudentHeader from '../../../components/StudentHeader';

export default function CompleteCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { rating: 3, review: '' },
  });

  const completeCourseMutation = useMutation(completeCourse);

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  if (isLoading || isError || !courseId) {
    return <div>Loading</div>;
  }

  const postReview = (data: any) => {
    completeCourseMutation.mutate(
      {
        courseId,
        review: data.review,
        rating: data.rating,
      },
      {
        onSuccess: () => {
          // todo: navigate to certificate page instead
          navigate('/student');
        },
      }
    );
  };

  return (
    <>
      <StudentHeader />
      <Divider />
      <Container maxWidth="sm" sx={{ my: 3 }}>
        <form onSubmit={handleSubmit(postReview)}>
          <Typography>Course Completion</Typography>
          <Typography variant="h6" lineHeight={1} mt={1}>
            {course.title}
          </Typography>
          <Typography variant="caption" component="div" mb={2}>
            by {course.organization.name}
          </Typography>
          <Stack direction="row">
            <Typography component="span">Rate the Course : </Typography> &nbsp;
            <Controller
              name="rating"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
          <Box my={2}>
            <TextField
              fullWidth
              rows={3}
              {...register('review', { required: true })}
              label="Your Feedback / Comments"
              multiline
              variant="outlined"
              error={!!errors.review}
              helperText={errors.review ? 'Feedback is Required' : ''}
            ></TextField>
          </Box>
          <Stack justifyContent="space-between" flexDirection="row">
            <Button
              onClick={() => navigate('/student')}
              color="secondary"
              variant="outlined"
              type="button"
            >
              Back
            </Button>
            <Button variant="contained" type="submit" disableElevation>
              Complete
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}
