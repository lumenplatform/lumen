import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Billing() {
  return (
    <Box>
      <Box sx={{ marginBottom: 7 }}>
        <Typography variant="h4">Billing and Payments</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Income</Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Student Email</TableCell>
              <TableCell>Transaction Amount</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Transaction Time</TableCell>
            </TableRow>
          </TableHead>

          <TableRow>
            <TableCell>blajbalba</TableCell>
            <TableCell>7498729</TableCell>
            <TableCell>201564684</TableCell>
            <TableCell>nfianoiwn</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>blajbalba</TableCell>
            <TableCell>7498729</TableCell>
            <TableCell>201564684</TableCell>
            <TableCell>nfianoiwn</TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h6">Expenses</Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Student Email</TableCell>
              <TableCell>Transaction Amount</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Transaction Time</TableCell>
            </TableRow>
          </TableHead>

          <TableRow>
            <TableCell>blajbalba</TableCell>
            <TableCell>7498729</TableCell>
            <TableCell>201564684</TableCell>
            <TableCell>nfianoiwn</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>blajbalba</TableCell>
            <TableCell>7498729</TableCell>
            <TableCell>201564684</TableCell>
            <TableCell>nfianoiwn</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>blajbalba</TableCell>
            <TableCell>7498729</TableCell>
            <TableCell>201564684</TableCell>
            <TableCell>nfianoiwn</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </Box>
  );
}
