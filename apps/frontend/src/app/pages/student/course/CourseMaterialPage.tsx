import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Box,
  Breadcrumbs,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  Link as MuiLink,
} from '@mui/material';
import * as React from 'react';
import { useQuery } from 'react-query';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { getCourseById, getCourseMaterial } from '../../../api';
import StudentHeader from '../../../components/StudentHeader';

export function CourseNav({ topics }: { topics: any[] }) {
  const { courseId, sectionId, topicId } = useParams();

  return (
    <Box>
      <List>
        {topics &&
          topics.map((item: any, index: any) => {
            if (Object.prototype.hasOwnProperty.call(item, 'items')) {
              return <CourseNavItemNested sideBarItems={item} index={index} />;
            } else {
              return <CourseNavItem sideBarItem={item} index={index} />;
            }
          })}
      </List>
    </Box>
  );
}

function CourseNavItem(props: any) {
  const { courseId, sectionId } = useParams();

  const theme = useTheme();
  return (
    <NavLink
      to={
        '/student/' +
        courseId +
        '/learn/' +
        sectionId +
        '/' +
        props.sideBarItem.id
      }
      style={{ color: 'unset', textDecoration: 'unset' }}
      end={props.sideBarItem.path === '/manage'}
    >
      {({ isActive }) => (
        <ListItem
          key={props.sideBarItem.label}
          disablePadding
          selected={isActive}
          style={{
            color: isActive ? theme.palette.primary.dark : '',
          }}
        >
          <ListItemButton>
            <ListItemText
              primary={props.index + 1 + '. ' + props.sideBarItem.title}
            />
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  );
}
function CourseNavItemNested(props: any) {
  const { materialId } = useParams();
  const [open, setOpen] = React.useState(
    props.sideBarItems.items.some((item: any) => item.path === materialId)
  );
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={props.index + 1 + '. ' + props.sideBarItems.label}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout={50}>
        <List component="div" sx={{ p: 0, pl: 1 }}>
          {props.sideBarItems.items.map((item: any, index: any) => {
            return <CourseNavItem sideBarItem={item} index={index} />;
          })}
        </List>
      </Collapse>
    </>
  );
}

export default function CoursePage(props: any) {
  const { courseId, sectionId, topicId } = useParams();
  const { data } = useQuery('mat', () => getCourseMaterial(courseId!));
  const { data: course } = useQuery('course', () => getCourseById(courseId!));

  const section = data && data.filter((r: any) => r.id == sectionId)[0];

  if (!course || !data) {
    return null;
  }

  return (
    <div>
      <StudentHeader />
      <Box sx={{ maxWidth: '1440px', px: 3 }}>
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
        </Box>

        <Box sx={{ margin: '0 auto' }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {section && section.title}
            </Typography>
            <Box sx={{ display: 'flex', margin: '0 auto' }}>
              <Box sx={{ minWidth: '200px' }}>
                <CourseNav topics={section ? section.topics : []} />
              </Box>
              <Box sx={{ p: 2, flex: 1, mr: 10 }}>
                <Outlet />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
