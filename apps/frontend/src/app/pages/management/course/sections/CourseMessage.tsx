import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormContext } from 'react-hook-form';

export function CourseMessage() {
  const { register } = useFormContext();

  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="body1" gutterBottom mt={0}>
        Write messages to your students (optional) that will be sent
        automatically when they join or complete your course to encourage
        students to engage with course content. If you do not wish to send a
        welcome or congratulations message, leave the text box blank.
      </Typography>
      <Box
        sx={{
          '& .MuiTextField-root': { mt: 2, mb: 2, width: '100%' },
        }}
      >
        <TextField
          label="Welcome Message"
          variant="outlined"
          multiline
          rows={4}
          {...register('welcomeMessage')}
        />
        <TextField
          label="Congratulations Message"
          variant="outlined"
          multiline
          rows={4}
          {...register('congratsMessage')}
        />
      </Box>
    </Box>
  );
}
