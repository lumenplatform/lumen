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
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  acceptInvite,
  getPendingInvites,
  registerOrganization,
} from '../../api';
import FilesInput from '../../components/FilesInput';

const RegisterForm = () => {
  const { register, watch, control } = useForm();
  const formValue = watch();
  const navigate = useNavigate();

  const registerOrganizationMutation = useMutation(registerOrganization, {
    onSuccess: () => navigate(0),
  });

  return (
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
  );
};

const AcceptInvite = ({ invites }: { invites: any[] }) => {
  const navigate = useNavigate();

  const acceptInviteMutation = useMutation(acceptInvite, {
    onSuccess: () => navigate(0),
  });

  return (
    <Stack alignItems="center">
      <Typography>
        You have been invited to join <b>{invites[0].organization.name}</b>
      </Typography>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Button
          disableElevation
          variant="contained"
          onClick={() => {
            acceptInviteMutation.mutate(invites[0].id);
          }}
        >
          Accept & Join
        </Button>
      </Box>
    </Stack>
  );
};

export default function InstructorOnboarding() {
  const { data: invites } = useQuery('user-invites', getPendingInvites);

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
        {invites && invites.length === 0 && <RegisterForm />}
        {invites && invites.length !== 0 && <AcceptInvite invites={invites} />}
      </Stack>
    </Container>
  );
}
