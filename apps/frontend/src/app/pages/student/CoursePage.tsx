import { Grade } from '@mui/icons-material';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Container,
  LinearProgress,
  Link as MuiLink,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { useQuery } from 'react-query';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { getCourseById, getCourseMaterial } from '../../api';
import CourseToC from '../../components/CourseToC';
import StudentHeader from '../../components/StudentHeader';

const sideBarItems = [
  {
    path: 'material',
    label: 'Course Material',
    icon: <MenuBookOutlinedIcon />,
  },
  {
    path: 'resources',
    label: 'Resources',
    icon: <CollectionsBookmarkOutlinedIcon />,
  },
  {
    path: 'grades',
    label: 'Grades',
    icon: <Grade />,
  },
  {
    path: 'info',
    label: 'Course Info',
    icon: <InfoOutlinedIcon />,
  },
  // {
  //   path: 'SubmissionStatus',
  //   label: 'Submission Status',
  //   icon: <InfoOutlinedIcon />,
  // },
  // {
  //   path: 'AssignmentSettings',
  //   label: 'Assignment Settings',
  // },
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
                  color: isActive ? theme.palette.primary.main : '',
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      minWidth: '38px',
                      color: isActive ? theme.palette.primary.main : '',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
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
  const theme = useTheme();

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  const { data: material } = useQuery('material' + courseId, () =>
    getCourseMaterial(courseId!)
  );

  if (isLoading || isError || !material) {
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
        <Box sx={{ display: 'flex', margin: '0 auto' }}>
          <Box sx={{ width: '250px' }}>
            <Box sx={{ my: 2 }}>
              <Box
                sx={{
                  background: `url(${course.courseImage.url})`,
                  width: '100%',
                  maxWidth: '250px',
                  backgroundSize: 'cover',
                  aspectRatio: '16 / 9',
                  borderRadius: theme.shape.borderRadius,
                }}
              ></Box>

              <Box sx={{ mx: 1 }}>
                <Typography variant="body1" mt={2} lineHeight={1}>
                  {course.title}
                </Typography>
                <Typography variant="caption">
                  {course.organization.name}
                </Typography>
              </Box>
            </Box>

            <CourseNav />
          </Box>
          <Box
            sx={{
              mx: 2,
              flex: 1,
              maxHeight: 'calc(100vh - 108px)',
              overflowY: 'auto',
            }}
          >
            <Outlet />
          </Box>
          <Box sx={{ width: '240px', pr: 1 }}>
            <Box sx={{ ml: 1, mb: 3 }}>
              <Typography variant="body2" display={'flex'} flexDirection="row">
                Course Progress <Box sx={{ flexGrow: 1 }}></Box>30%
              </Typography>
              <LinearProgress sx={{ mt: 1 }} value={30} variant="determinate" />
            </Box>
            <CourseToC items={material.map((r: any) => ({ text: r.title }))} />
          </Box>
        </Box>
      </Container>
    </div>
  );
}
