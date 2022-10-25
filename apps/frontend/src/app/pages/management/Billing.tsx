import { PaymentsOutlined } from '@mui/icons-material';
import { Button, Skeleton, Stack, Tab, Tabs, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getPrivateCourseEnrollments, getPublicCourseEnrollments, getWithdrawals, withdrawBalance } from '../../api';
import CourseCharges from './billing/CourseCharges';
import CourseFees from './billing/CourseFees';
import Withdrawals from './billing/Withdrawals';

export default function Billing() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

  const y = 5;
  };

  const handleWithdraw = () => {
    withdrawalMutation({ amount: balance })
    setOpen(false);
  }

  const { data: withdrawals, isLoading: withdrawalsLoading, isError: withdrawalsError, refetch: withdrawalsRefetch } = useQuery('withdrawals', () => getWithdrawals());
  const { data: pvEnrollments, isLoading: pvEnrollmentsLoading, isError: pvEnrollmentsError, refetch: pvEnrollmentsRefetch } = useQuery('publicenrolleement', () => getPublicCourseEnrollments());
  const { data: pbEnrollments, isLoading: pbEnrollmentsLoading, isError: pbRnrollmentsError, refetch: pbRnrollmentsRefetch } = useQuery('privateenrolleement', () => getPrivateCourseEnrollments());
  const { mutate: withdrawalMutation, isSuccess: withdrawalSuccess } = useMutation(withdrawBalance);

  useEffect(() => {
    if (withdrawalSuccess) {
      withdrawalsRefetch();
      pvEnrollmentsRefetch();
      pbRnrollmentsRefetch();
    }
  }, [withdrawalSuccess]);

  if (withdrawalsLoading || pvEnrollmentsLoading || pbEnrollmentsLoading)
    return <Skeleton />;

  const pvTotal = pvEnrollments.reduce((acc: any, enrollment: any) => acc + enrollment.payment.amount, 0);
  const pbTotal = pbEnrollments.reduce((acc: any, enrollment: any) => acc + enrollment.payment.amount, 0);
  const withdrawalTotal = withdrawals.reduce((acc: any, withdrawal: any) => acc + withdrawal.payment.amount, 0);

  const balance = pbTotal - pvTotal - withdrawalTotal;

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
            Account Balance : <b>${balance}</b>
          </Typography>
          <Box>
            {/* Plan : <b>Basic</b> <Button size="small">Change</Button> */}
          </Box>
        </Box>
        <Button
          variant='contained'
          disableElevation
          onClick={handleClickOpen}
        >Withdraw</Button>
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
      {value === 1 && <CourseCharges />}
      {value === 2 && <Withdrawals />}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Withdraw Balance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to withdraw your balance of ${balance}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleWithdraw}>Withdraw</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
