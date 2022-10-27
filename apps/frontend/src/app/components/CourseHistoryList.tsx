import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { getEnrolledCourses } from '../api';
import { useNavigate } from 'react-router-dom';

function createData(name: string, EnrolledDate: string, CompletedDate: string) {
  return { name, EnrolledDate, CompletedDate }; //enter the other variable names if used
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const rows = [
  createData('Machine Learnineg', '2020-01-15', '2020-03-05'), //enter data if other variables are used
  createData('Machine Learning', '2020-01-15', '2020-03-05'),
];

export default function CourseHistoryList() {
  const navigate = useNavigate();
  const { data: enrolled, refetch } = useQuery('enrolled', () =>
    getEnrolledCourses('ALL')
  );

  if (!enrolled) {
    return null;
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Enrolled Date</TableCell>
            <TableCell>Completed Date</TableCell>
            <TableCell>Certificate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enrolled.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>
                {<LinearProgressWithLabel value={row.coursePercent} />}
              </TableCell>
              <TableCell>
                {new Date(row.enrollment.enrollmentDate).toLocaleString()}
              </TableCell>
              <TableCell>
                {row.enrollment.status == 'COMPLETED' ? (
                  <Box>
                    {new Date(row.enrollment.completionDate).toLocaleString()}
                  </Box>
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell>
                {row.enrollment.status == 'COMPLETED' ? (
                  <Button
                    onClick={() =>
                      navigate(`/student/${row.courseId}/certificate`)
                    }
                    variant="outlined"
                  >
                    View
                  </Button>
                ) : (
                  'N/A'
                )}
              </TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
