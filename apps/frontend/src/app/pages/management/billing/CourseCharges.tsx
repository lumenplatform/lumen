import { Skeleton } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from 'react-query';
import { getPrivateCourseEnrollments } from '../../../api';

export default function CourseFees() {

  const { data: enrollments, isLoading, isError } = useQuery('quiz', () => getPrivateCourseEnrollments());


  if (isLoading || isError) {
    return <Skeleton />;
  }

  console.log(enrollments)

  return (
    <TableContainer>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Email</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Transaction Amount</TableCell>
            <TableCell>Transaction Date and Time</TableCell>
          </TableRow>
        </TableHead>
        {enrollments.map((enrollment: any) => (
          <TableRow>
            <TableCell>{enrollment.user.email}</TableCell>
            <TableCell>{enrollment.course.title}</TableCell>
            <TableCell>${enrollment.payment.amount}</TableCell>
            <TableCell>{(new Date(enrollment.payment.createdAt)).toLocaleString([], {
              hour12: false,
            })}</TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
}