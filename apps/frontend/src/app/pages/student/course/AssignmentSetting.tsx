import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Divider, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { width } from '@mui/system';


export default function MultilineTextFields() {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > <div style={{margin:50}}>
      <Typography variant='h6'>Assignment Settings</Typography>
      </div>
      <div style={{margin:50,}}>
      
        <TextField
         sx={{
          "& .MuiInputBase-root": {
              height: 80,
              width :1000
          }
      }}
          id="outlined-multiline-flexible"
          label="Title"
          multiline
          maxRows={10}
          value={value}
          variant="filled"
          placeholder="Enter title here"
          onChange={handleChange}
        />
      </div>
      <div style={{margin:50}}>
      <TextField
         sx={{
          "& .MuiInputBase-root": {
              height: 100,
              width :1000
          }
      }}
          id="outlined-multiline-flexible"
          label="instructions"
          multiline
          maxRows={10}
          value={value}
          variant="filled"
          placeholder="Enter instructions here"
          onChange={handleChange}
        />
      </div>
      <Divider ></Divider>
      <div style={{margin:50,marginBottom:10}}>
        <Typography variant="subtitle2" sx={{ ml: 1 }}>
          Allow Submission from
        </Typography>
      </div>
      <div style={{margin:50,marginTop:15}}>
        <MaterialUIPickers></MaterialUIPickers>
      </div>
      <div style={{margin:50,marginBottom:15}}>
        <Typography variant="subtitle2" sx={{ ml: 1 }}>
          Allow Submission Until
        </Typography>
        <MaterialUIPickers></MaterialUIPickers>
      </div>
      <div style={{margin:50,marginTop:15}}>
        <CheckboxLabels></CheckboxLabels>
      </div>
    </Box>
  );
}

export function MaterialUIPickers() {
  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export function CheckboxLabels() {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
    </FormGroup>
  );
}
