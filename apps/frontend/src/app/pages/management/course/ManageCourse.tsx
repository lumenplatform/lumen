import {
  Box,
  Button,
  ButtonGroup,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, updateCourse, updateCourseStatus } from '../../../api';
import { TabPanel } from '../../../components/TabPanel';
import CourseInstructors from './sections/CourseInstructors';
import EnrolledStudents from './sections/EnrolledStudents';
import QuizAndAssignments from './sections/QuizAndAssignments';
import UserLogs from './sections/UserLogs';

const sections = [
  { component: <EnrolledStudents />, label: 'Enrolled Users' },
  { component: <CourseInstructors />, label: 'Instructors' },
  { component: <QuizAndAssignments />, label: 'Quizzes and Assignments' },
  { component: <UserLogs />, label: 'User Logs' },
];

export default function ManageCourse() {
  const { courseId } = useParams();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  const updateCourseMutation = useMutation(updateCourseStatus);

  const navigate = useNavigate();

  if (isError || isLoading) {
    return <Skeleton></Skeleton>;
  }

  return (
    <Container sx={{ heigh: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">{course.title}</Typography>
        <Box>
          {course.status === 'UN-PUBLISH' && (
            <Button
              color="primary"
              onClick={() => {
                updateCourseMutation.mutate(
                  { courseId, status: 'PUBLISHED' },
                  { onSuccess: () => navigate('/manage/courses') }
                );
              }}
            >
              Publish
            </Button>
          )}
          {course.status === 'PUBLISHED' && (
            <Button
              color="primary"
              onClick={() => {
                updateCourseMutation.mutate(
                  { courseId, status: 'UNPUBLISHED' },
                  { onSuccess: () => navigate('/manage/courses') }
                );
              }}
            >
              Unpublished
            </Button>
          )}
          <Button>Edit</Button>
          <Button color="error">Delete</Button>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, mb: 2, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={(event, newValue: number) => setValue(newValue)}
            sx={{ textAlign: 'right', pt: 2 }}
          >
            {sections.map(({ label }) => (
              <Tab sx={{ alignItems: 'end' }} key={label} label={label} />
            ))}
          </Tabs>
        </Box>
        {sections.map(({ component }, index) => (
          <TabPanel
            value={value}
            key={index}
            index={index}
            style={{ padding: '1rem ' }}
          >
            {component}
          </TabPanel>
        ))}
      </Box>
    </Container>
  );
}
