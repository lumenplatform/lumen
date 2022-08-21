import { DisplaySettingsOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import FilesInput from '../../components/FilesInput';

export default function Customization() {
  const [inputs, setInputs] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(inputs);
  };

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
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            my: 2,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
          }}
        >
          <TextField variant="filled" label="Organization Name" />
          <Stack direction={'row'} alignItems="center">
            <span>Logo : </span>
            <FilesInput />
          </Stack>
          <TextField variant="filled" multiline rows={3} label="Description" />
          <div></div>
        </Box>
      </form>
      <Typography my={1} mt={4} variant="subtitle2">
        Domain Mappings
      </Typography>
      <Box>
        <TextField
          label="Subdomain"
          variant="filled"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">.lumenlms.xyz</InputAdornment>
            ),
          }}
        />
        <Table sx={{ minWidth: 650, mt: 2 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Domain</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Added By</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>

          <TableRow>
            <TableCell>ucec.cmb.ec.lk</TableCell>
            <TableCell>Aug 14, 2022</TableCell>
            <TableCell>dalana.dhar@gmail.com</TableCell>
            <TableCell>
              <Button color="inherit" size="small">
                DNS Records 
              </Button>{' '}
              |
              <Button color="error" size="small">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </Table>
      </Box>
      <Typography my={1} mt={4} variant="subtitle2">
        Theming
      </Typography>
      Primary Color : <input type="color" value="#1dbf7b" />
      &nbsp; Secondary Color : <input type="color" value={'#ffff00'} />
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" disableElevation>
          Save
        </Button>
      </Box>
    </Box>
  );
}
