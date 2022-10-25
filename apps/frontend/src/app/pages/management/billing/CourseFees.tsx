import { PaymentsOutlined } from '@mui/icons-material';
import { Button, Stack, Tab, Tabs, Typography ,Skeleton} from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import {useQuery} from 'react-query';
import { getPublicCourseEnrollments } from '../../../api';

export default function CourseFees() {

  const { data: enrollments, isLoading, isError } = useQuery('quiz', () => getPublicCourseEnrollments());


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
      </TableContainer>
    );
}