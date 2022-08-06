import {
  Card,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import FilesInput from '../../../../components/FilesInput';
import { Controller, useFormContext } from 'react-hook-form';

export function CourseLandingPage() {
  const {
    register,
    control,
    formState: { errors },
    getValues,
  } = useFormContext();
  const values = getValues();

  return (
    <Box sx={{ px: 3 }}>
      <Box
        sx={{
          '& .MuiTextField-root': { mt: 2, mb: 2, width: '100%' },
        }}
      >
        <TextField
          label="Course Title"
          variant="outlined"
          {...register('title', { required: 'Title is Required' })}
          error={!!errors['title']}
          helperText={errors['title']?.['message']!.toString()}
        />
        <TextField
          label="Course Subtitle"
          variant="outlined"
          {...register('subtitle')}
          error={!!errors['subtitle']}
          helperText={errors['subtitle']?.['message']!.toString()}
        />
        <TextField
          label="Course description"
          variant="outlined"
          multiline
          rows={4}
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 100,
              message: 'Description should have at least 100 characters',
            },
          })}
          error={!!errors['description']}
          helperText={errors['description']?.['message']!.toString()}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select label="Language" {...register('language')}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Sinhala">Sinhala</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select label="Level" {...register('level')}>
                <MenuItem value="Beginner">Beginner </MenuItem>
                <MenuItem value="Intermediate">Intermediate </MenuItem>
                <MenuItem value="Expert">Expert </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Course Subject Area</InputLabel>
              <Select label="Course Subject Area" {...register('subjectArea')}>
                <MenuItem value={'Computer Science'}>Computer Science</MenuItem>
                <MenuItem value={'Physics'}>Physics</MenuItem>
                <MenuItem value={'Mathematics'}>Mathematics</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              <Box sx={{ fontWeight: 'bold' }}>Course Image</Box>
            </Typography>

            <Card sx={{ maxWidth: '100%' }}>
              <CardMedia
                component="img"
                height="194"
                image={values['courseImage']?.url ?? 'https://via.placeholder.com/750x425.png'}
                alt="Paella dish"
              />
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom mt={3}>
              <Box>
                Upload your course image here. It must meet our course image
                quality standards to be accepted. Important guidelines: 750x425
                pixels; .jpg, .jpeg,. gif, or .png. no text on the image.
              </Box>
            </Typography>
            <Controller
              name="courseImage"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilesInput
                  accept="image/*"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              <Box sx={{ fontWeight: 'bold' }}>Promotianal video</Box>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Card sx={{ maxWidth: '100%' }}>
              <CardMedia
                component="video"
                height="194"
                src={values['promotionalVideo']?.url}
                controls={true}
              />
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom mt={3}>
              <Box>
                Students who watch a well-made promo video are 5X more likely to
                enroll in your course. We've seen that statistic go up to 10X
                for exceptionally awesome videos. Learn how to make yours
                awesome!
              </Box>
            </Typography>
            <Controller
              name="promotionalVideo"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilesInput
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}