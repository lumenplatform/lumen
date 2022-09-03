import { DisplaySettingsOutlined } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { getCurrentOrganization, updateCurrentOrganization } from '../../api';
import FilesInput from '../../components/FilesInput';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Customization() {
  const { data: org } = useQuery('org', getCurrentOrganization);
  const updateOrgMutation = useMutation(updateCurrentOrganization);

  const { register, reset, control, getValues } = useForm();

  useEffect(() => {
    if (org)
      reset({
        name: org.name,
        description: org.description,
        theme: org.theme,
        domains: org.domains,
      });
  }, [org]);

  if (!org) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 3, mb: 2 }}>
      <Stack direction="row" alignItems="center">
        <DisplaySettingsOutlined />
        <Typography ml={1} variant="h6">
          Organization Settings
        </Typography>
      </Stack>
      <Typography my={1} variant="subtitle2">
        Basic Information
      </Typography>
      <Box
        sx={{
          my: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
        }}
      >
        <TextField
          variant="filled"
          {...register('name')}
          label="Organization Name"
        />
        <Stack direction={'row'} alignItems="center">
          <span>Logo : </span>
          <Box style={{ flexGrow: 1 }}>
            <Controller
              name="theme.logo"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FilesInput
                  accept="image/*"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Box>
        </Stack>
        <TextField
          variant="filled"
          {...register('description')}
          multiline
          rows={3}
          label="Description"
        />
        <div></div>
      </Box>
      <Typography my={1} mt={4} variant="subtitle2">
        Domain Mappings
      </Typography>
      <Box>
        <TextField
          label="Subdomain"
          variant="filled"
          {...register('domains.subdomain')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">.lumenlms.xyz</InputAdornment>
            ),
          }}
        />
        {false && <Table sx={{ minWidth: 650, mt: 2 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Domain</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Added By</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ucec.cmb.ec.lk</TableCell>
              <TableCell>Aug 14, 2022</TableCell>
              <TableCell>dalana.dhar@gmail.com</TableCell>
              <TableCell>
                <Button color="inherit" size="small">
                  DNS Records
                </Button>
                |
                <Button color="error" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>}
      </Box>
      <Typography my={1} mt={4} variant="subtitle2">
        Theming
      </Typography>
      Primary Color :  &nbsp; 
      <input type="color" {...register('theme.theme.primary')} />
      &nbsp; Secondary Color :  &nbsp; 
      <input type="color" {...register('theme.theme.secondary')} />
      <Box sx={{ mt: 4 }}>
        <LoadingButton
          variant="contained"
          disableElevation
          loading={updateOrgMutation.isLoading}
          onClick={() => {
            updateOrgMutation.mutate(getValues());
          }}
        >
          Save
        </LoadingButton>
        <br />
        <br />
        {updateOrgMutation.isSuccess && (
          <Alert severity="success">Updated Successfully</Alert>
        )}
        {updateOrgMutation.isError && (
          <Alert severity="error">Update Failed</Alert>
        )}
      </Box>
    </Box>
  );
}
