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

const subjectsList = [
  'Mathematics',
  'Engineering',
  'Business',
  'Computer Science',
  'Data Science',
  'Health',
  'Information Technology',
];
const levelsList = ['Beginner', 'Intermediate', 'Expert'];
const languageList = ['English', 'Sinhala', 'Mandarin', 'Hindi', 'Spanish'];

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
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is Required' }}
          render={({ field }) => (
            <TextField
              label="Course Title"
              variant="outlined"
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value || ''}
              error={!!errors['title']}
              helperText={errors['title']?.['message']!.toString()}
            />
          )}
        />
        <Controller
          name="subtitle"
          control={control}
          render={({ field }) => (
            <TextField
              label="Course Subtitle"
              variant="outlined"
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value || ''}
              error={!!errors['subtitle']}
              helperText={errors['subtitle']?.['message']!.toString()}
            />
          )}
        />
        <Controller
          name="description"
          rules={{
            required: 'Description is required',
            minLength: {
              value: 100,
              message: 'Description should have at least 100 characters',
            },
          }}
          control={control}
          render={({ field }) => (
            <TextField
              label="Course description"
              variant="outlined"
              multiline
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value || ''}
              rows={4}
              error={!!errors['description']}
              helperText={errors['description']?.['message']!.toString()}
            />
          )}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Language"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    value={field.value || ''}
                  >
                    {languageList.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>

              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Level"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value || ''}
                  >
                    {levelsList.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Course Subject Area</InputLabel>
              <Controller
                name="subjectArea"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Course Subject Area"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value || ''}
                  >
                    {subjectsList.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Course Image
            </Typography>

            <Card sx={{ maxWidth: '100%' }}>
              <CardMedia
                component="img"
                height="194"
                image={
                  values['courseImage']?.url ??
                  'https://via.placeholder.com/750x425.png'
                }
                alt="Paella dish"
              />
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom mt={3}>
              Upload your course image here. It must meet our course image
              quality standards to be accepted. Important guidelines: 750x425
              pixels; .jpg, .jpeg,. gif, or .png. no text on the image.
            </Typography>
            <Controller
              name="courseImage"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilesInput
                  accept="image/*"
                  onChange={onChange}
                  value={value || ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              Promotional video
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
              Students who watch a well-made promo video are 5X more likely to
              enroll in your course. We've seen that statistic go up to 10X for
              exceptionally awesome videos. Learn how to make yours awesome!
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
