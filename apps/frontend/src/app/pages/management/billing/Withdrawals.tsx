import { Skeleton } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from 'react-query';
import { getWithdrawals } from '../../../api';

export default function Withdrawals() {

  const { data: withdrawals, isLoading, isError } = useQuery('withdrawals', () => getWithdrawals());


  if (isLoading || isError) {
    return <Skeleton />;
  }

  console.log(withdrawals)

  return (
    <TableContainer>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction Date and Time</TableCell>
            <TableCell>Transaction Amount</TableCell>
          </TableRow>
        </TableHead>
        {
          withdrawals.map((withdrawal: any) => (
            <TableRow>
              <TableCell>{(new Date(withdrawal.payment.createdAt)).toLocaleString([], {
                hour12: false,
              })}</TableCell>
              <TableCell>${withdrawal.payment.amount}</TableCell>

            </TableRow>
          ))
        }
      </Table>
    </TableContainer>
  );
}