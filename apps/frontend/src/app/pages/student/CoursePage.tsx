import {
  Box,
  Breadcrumbs,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  Link as MuiLink,
  Avatar,
  Container,
  Skeleton,
} from '@mui/material';
import { useQuery } from 'react-query';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { getCourseById } from '../../api';
import StudentHeader from '../../components/StudentHeader';

const sideBarItems = [
  {
    path: 'material',
    label: 'Course Material',
  },
  {
    path: 'resources',
    label: 'Resources',
  },
  {
    path: 'info',
    label: 'Course Info',
  },
  {
    path: 'grades',
    label: 'Grades',
  },
  {
    path: 'SubmissionStatus',
    label: 'Submission Status',
  },
  {
    path: 'AssignmentSettings',
    label: 'Assignment Settings',
  },

];

export function CourseNav() {
  const theme = useTheme();
  return (
    <List>
      {sideBarItems.map((item, index) => {
        return (
          <NavLink
            to={item.path}
            style={{ color: 'unset', textDecoration: 'unset' }}
            end={item.path === '/manage'}
          >
            {({ isActive }) => (
              <ListItem
                key={item.label}
                disablePadding
                selected={isActive}
                style={{
                  color: isActive ? theme.palette.primary.dark : '',
                }}
              >
                <ListItemButton>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        );
      })}
    </List>
  );
}

export default function CoursePage(props: any) {
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
      <StudentHeader />
      <Container maxWidth="xl">
        <Box sx={{ py: 1 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink component={Link} underline="hover" color="inherit" to="/">
              Home
            </MuiLink>
            <MuiLink
              component={Link}
              underline="hover"
              color="inherit"
              to="/student/"
            >
              Courses
            </MuiLink>
            <Typography color="text.primary">{course.title}</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ py: 1, display: 'flex' }}>
          <Avatar sx={{ mr: 2 }} src={course.courseImage.path} />
          <Box>
            <Typography variant="h6" lineHeight={1}>
              {course.title}
            </Typography>
            <Typography variant="caption">
              {course.organization.name}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', margin: '0 auto' }}>
          <Box sx={{ width: '200px' }}>
            <CourseNav />
          </Box>
          <Box sx={{ p: 2, flex: 1, mr: 10 }}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </div>
  );
}
