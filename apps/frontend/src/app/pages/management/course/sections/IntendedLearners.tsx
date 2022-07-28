import { Add, Close } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export function TextFieldList({ name }: { name: string }) {
  const { register, getValues } = useFormContext();

  useEffect(() => {
    const value = getValues(name);
  }, []);

  const { fields, append, remove } = useFieldArray({ name });

  return (
    <Box mb={2}>
      <Box
        sx={{
          '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' },
        }}
      >
        {fields.map((field, index) => (
          <Stack direction={'row'} alignItems="center">
            <TextField
              required
              key={field.id}
              {...register(`${name}.${index}`)}
              variant="outlined"
              placeholder="Example: Define the roles and responsibilities of a project"
            />
            <IconButton size="small" onClick={() => remove(index)}>
              <Close />
            </IconButton>
          </Stack>
        ))}
      </Box>
      <Button
        variant="outlined"
        startIcon={<Add />}
        size="small"
        onClick={() => append('')}
      >
        Add
      </Button>
    </Box>
  );
}

export function IntendedLearners() {
  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="body1" gutterBottom>
        The following descriptions will be publicly visible on your Course
        Landing Page and will have a direct impact on your course performance.
        These descriptions will help learners decide if your course is right for
        them.
      </Typography>

      <Typography variant="body1" gutterBottom mt={0}>
        <Box sx={{ fontWeight: 'bold' }}>
          What will students learn in your course?
        </Box>
        <Box>
          Provide learning objectives or outcomes that learners can expect to
          achieve after completing your course.
        </Box>
      </Typography>

      <TextFieldList name="learningOutcome" />

      <Typography variant="body1" gutterBottom mt={0}>
        <Box sx={{ fontWeight: 'bold' }}>
          What are the requirements or prerequisites for taking your course?
        </Box>
        <Box>
          List the required skills, experience, tools or equipment learners
          should have prior to taking your course. If there are no requirements,
          use this space as an opportunity to lower the barrier for beginners.
        </Box>
      </Typography>

      <TextFieldList name="prerequisites" />

      <Typography variant="body1" gutterBottom mt={0}>
        <Box sx={{ fontWeight: 'bold' }}>Who is this course for?</Box>
        <Box>
          Write a clear description of the intended learners for your course who
          will find your course content valuable. This will help you attract the
          right learners to your course.
        </Box>
      </Typography>
      <TextFieldList name="intendedAudience" />
    </Box>
  );
}
