import {
  Box,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export default function CourseSettings() {
  const { register, getValues, control } = useFormContext();

  return (
    <Box sx={{ px: 3, maxWidth: '720px' }}>
      <Typography variant="h6">Enrollment</Typography>
      <Typography variant="body2">
        Public courses are listed on the site with search, recommendations etc.
        and users are able to enroll after paying the course fee.
      </Typography>
      <Box>
        <Controller
          name="settings.isPrivate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioGroup row={true} value={value} onChange={onChange}>
              <FormControlLabel
                control={<Radio value={'NO'} />}
                label="Public"
              />
              <FormControlLabel
                control={<Radio value={'YES'} />}
                label="Private"
              />
            </RadioGroup>
          )}
        />
      </Box>

      <Box
        sx={{
          mb: 2,
          mt: 1,
          opacity: getValues('settings.isPrivate') === 'NO' ? 1 : '.3',
          pointerEvents: getValues('settings.isPrivate') === 'NO' ? 1 : '.3',
        }}
      >
        <Typography variant="h6">Pricing</Typography>
        <Typography variant="body2" mb={1}>
          When setting a price, please note that price can't go below $1 per
          each hour of video content
        </Typography>
        <FormControl variant="standard" sx={{ mr: 1, minWidth: '5rem' }}>
          <InputLabel>Currency</InputLabel>
          <Select variant="standard" value={'USD'}>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem disabled value="LKR">
              LKR
            </MenuItem>
            <MenuItem disabled value="IDR">
              IDR
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Amount"
          variant="standard"
          {...register('price')}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Box>

      <Typography variant="h6">Security</Typography>
      <Box sx={{ mt: 1 }}>
        <Typography sx={{ textDecoration: 'underline' }}>App Only</Typography>
        <Typography variant="body2">
          Restrict this course to be only accessed using the app. Provides
          protection to metadata of the course material like topics,
          descriptions etc.
        </Typography>
        <Controller
          name="settings.isDesktopOnly"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioGroup row={true} value={value} onChange={onChange}>
              <FormControlLabel
                control={<Radio value={'YES'} />}
                label="Active"
              />
              <FormControlLabel
                control={<Radio value={'NO'} />}
                label="Disable"
              />
            </RadioGroup>
          )}
        />
      </Box>
    </Box>
  );
}
