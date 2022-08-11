import {
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { getCourseById, getCourseMaterial } from '../../../api';
import { CourseViewerNav } from './CourseViewerNav';

const BreadcrumbsNav = (props: { course: any; section: any }) => {
  const { course, section } = props;
  const navigate = useNavigate();

  return (
    <Stack direction="row">
      {/* <IconButton
        onClick={() => navigate('/student/' + course.courseId)}
        color="inherit"
        size="small"
        sx={{}}
      >
        <ArrowBack></ArrowBack>
      </IconButton> */}
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
        <MuiLink
          component={Link}
          color="inherit"
          underline="hover"
          to={'/student/' + course.courseId}
        >
          {course.title}
        </MuiLink>
        <Typography color="inherit">{section.title}</Typography>
      </Breadcrumbs>
    </Stack>
  );
};

export default function ContentViewer(props: any) {
  const { courseId, sectionId, topicId } = useParams();
  const { data } = useQuery('mat', () => getCourseMaterial(courseId!));
  const { data: course } = useQuery('course', () => getCourseById(courseId!));

  const section = data && data.filter((r: any) => r.id == sectionId)[0];

  if (!course || !data) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ p: 2, flex: 1, height: '100%', overflowY: 'auto' }}>
        <Box sx={{ maxWidth: '1024px', margin: '0 auto' }}>
          <BreadcrumbsNav section={section} course={course} />
          <Outlet />
        </Box>
      </Box>
      <CourseViewerNav topics={section ? section.topics : []} />
    </Box>
  );
}
