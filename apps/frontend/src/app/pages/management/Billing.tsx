import { PaymentsOutlined } from '@mui/icons-material';
import { Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import CourseFees  from './billing/CourseFees';
import React from 'react';
import Pagination from '@mui/material/Pagination';



export default function Billing() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

  const y = 5;
  };

  

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center">
        <PaymentsOutlined />
        <Typography ml={1} variant="h6">
          Billing
        </Typography>
      </Stack>
      <Typography my={1} variant="subtitle2">
        Summery
      </Typography>

      <Stack direction={'row'} justifyContent='space-between' alignItems='center'>
        <Box>
          <Typography>
            Account Balance : <b>$62.00</b>
          </Typography>
          <Box>
            Plan : <b>Basic</b> <Button size="small">Change</Button>
          </Box>
        </Box>
        <Button variant='contained' disableElevation>Withdraw</Button>
      </Stack>

      <Typography mt={1} mb={0} variant="subtitle2">
        Transactions
      </Typography>

      <Tabs sx={{ mb: 1 }} value={value} onChange={handleChange}>
        <Tab label="Course Fees" />
        <Tab label="Enrollment Charges" />
        <Tab label="Withdrawals / Payments" />
      </Tabs>

      {value === 0 && <CourseFees />}

         
    </Box>
  );
}
