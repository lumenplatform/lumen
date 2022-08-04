import React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BallotIcon from '@mui/icons-material/Ballot';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Skeleton, useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { getCourseById } from '../../../api';
import ArticleIcon from '@mui/icons-material/Article';

function CourseInfo() {
  const theme = useTheme();
  const { courseId } = useParams();
  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));
  if (isLoading || isError) {
    return <Skeleton></Skeleton>;
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ height: 70 }}>Title</TableCell>
              <TableCell>
                <Typography component="h2">{course.title}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell sx={{ height: 70 }}>Subtitle</TableCell>
              <TableCell>
                <Typography component="h2">{course.subtitle}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell sx={{ height: 70 }}>Description</TableCell>
              <TableCell>
                <Typography component="h2">{course.description}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell sx={{ height: 70 }}>Language</TableCell>

              <TableCell>
                <Typography component="h2">{course.language}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell sx={{ height: 70 }}>Subject Area</TableCell>

              <TableCell>
                <Typography component="h2">{course.subject_area}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell sx={{ height: 70 }}>Duration</TableCell>

              <TableCell>
                <Typography component="h2">{course.duration}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CourseInfo;
