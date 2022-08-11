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
import { useFormContext } from 'react-hook-form';

export default function CourseSettings() {
  const { register, getValues } = useFormContext();

  return (
    <Box sx={{ px: 3, maxWidth: '720px' }}>
      <Typography variant="h6">Enrollment</Typography>
      <Typography variant="body2">
        Public courses are listed on the site with search, recommendations etc.
        and users are able to enroll after paying the course fee.
      </Typography>
      <Box>
        <RadioGroup row={true} {...register('settings.isPrivate')}>
          <FormControlLabel
            control={<Radio value={'0'} defaultChecked />}
            label="Public"
          />
          <FormControlLabel control={<Radio />} value={'1'} label="Private" />
        </RadioGroup>
      </Box>

      <Box
        sx={{
          mb: 2,
          mt: 1,
          opacity: getValues('settings.isPrivate') ? 1 : '.3',
          pointerEvents: getValues('settings.isPrivate') ? 1 : '.3',
        }}
      >
        <Typography variant="h6">Pricing</Typography>
        <Typography variant="body2" mb={1}>
          When setting a price, please note that price can't go below $0.25 per
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
        <RadioGroup row={true} {...register('settings.isDesktopOnly')}>
          <FormControlLabel
            control={<Radio defaultChecked />}
            value={true}
            label="Active"
          />
          <FormControlLabel control={<Radio />} value={false} label="Disable" />
        </RadioGroup>
      </Box>
    </Box>
  );
}
