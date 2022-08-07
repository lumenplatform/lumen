import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { registerOrganization } from '../../api';
import FilesInput from '../../components/FilesInput';

export default function InstructorOnboarding() {
  const navigate = useNavigate();
  const { register, watch, control } = useForm();
  const formValue = watch();

  const registerOrganizationMutation = useMutation(registerOrganization, {
    onSuccess: () => navigate(0),
  });

  return (
    <Container maxWidth="xs" sx={{ minHeight: '100vh' }}>
      <Stack sx={{ py: 3 }}>
        <img
          src="/assets/icons/logo_horiz.png"
          style={{ maxWidth: '150px', margin: '0 auto' }}
          alt="logo"
        />
        <Typography variant="h6" mb={4} mt={2} textAlign="center">
          Instructor Registration
        </Typography>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Register As : &nbsp;</Typography>
            <ToggleButtonGroup color="primary" {...register('type')}>
              <ToggleButton value="individual">Individual</ToggleButton>
              <ToggleButton value="organization">Organization</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <TextField fullWidth label="Name" {...register('orgName')} />
          <TextField
            label="Bio / Description"
            {...register('description')}
            multiline
            rows={4}
          />
          <Typography>Logo</Typography>
          <Controller
            name="logo"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FilesInput accept="image/*" onChange={onChange} value={value} />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'end', mb: 5 }}>
            <Button
              disableElevation
              variant="contained"
              size="large"
              disabled={registerOrganizationMutation.isLoading}
              onClick={() => {
                registerOrganizationMutation.mutate(formValue);
              }}
            >
              Continue
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
