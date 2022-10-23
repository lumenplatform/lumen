import { PaymentsOutlined } from '@mui/icons-material';
import { Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
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

      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Student Email</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Transaction Amount</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Transaction Time</TableCell>
            </TableRow>
          </TableHead>

          <TableRow>
            <TableCell>dalana.dhar@gmail.com</TableCell>
            <TableCell>Linear Algebra</TableCell>
            <TableCell>$12</TableCell>
            <TableCell>Aug 17, 2022</TableCell>
            <TableCell>10.11PM</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>2019cs033@stu.ucsc.lk</TableCell>
            <TableCell>Linear Algebra</TableCell>
            <TableCell>$12</TableCell>
            <TableCell>Aug 14, 2022</TableCell>
            <TableCell>08.34PM</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>dalana.dhar@gmail.com</TableCell>
            <TableCell>Propulsion Systems</TableCell>
            <TableCell>$13</TableCell>
            <TableCell>Aug 13, 2022</TableCell>
            <TableCell>09.30PM</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>2019cs066@stu.ucsc.lk</TableCell>
            <TableCell>Linear Algebra</TableCell>
            <TableCell>$12</TableCell>
            <TableCell>Aug 13, 2022</TableCell>
            <TableCell>06.32PM</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>2019cs137@stu.ucsc.lk</TableCell>
            <TableCell>Propulsion Systems</TableCell>
            <TableCell>$13</TableCell>
            <TableCell>Aug 11, 2022</TableCell>
            <TableCell>03.21PM</TableCell>
          </TableRow>
        </Table>

        <Stack sx={{ mt: '20px', display: 'flex', justifyContent: 'flex-end', ml: '45%', mb: '20px' }}>
          <Pagination count={1} variant="outlined" shape="rounded" />
          </Stack>
      </TableContainer>
    </Box>
  );
}
