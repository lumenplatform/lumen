import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormContext } from 'react-hook-form';

export function Pricing() {
  const { register } = useFormContext();

  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="body1" gutterBottom mt={0}>
        <Box sx={{ fontWeight: 'bold' }}>Course Price Tier</Box>
        <Box>
          Please select the price tier for your course below and click 'Save'.
          The list price that students will see in other currencies is
          determined using the price tier matrix. If you intend to offer your
          course for free, the total length of video content must be less than 2
          hours.
        </Box>
      </Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={8}>
          <Grid container>
            <Grid xs={3} m={1}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select value={'USD'}>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem disabled value="LKR">
                    LKR
                  </MenuItem>
                  <MenuItem disabled value="IDR">
                    IDR
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={5} m={1}>
              <FormControl fullWidth>
                <InputLabel>Price</InputLabel>
                <Select {...register('price')}>
                  <MenuItem value="Free">Free</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
