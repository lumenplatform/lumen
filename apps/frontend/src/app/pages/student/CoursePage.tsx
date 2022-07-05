import {
  Box,
  Breadcrumbs,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  Link,
  Avatar,
} from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import StudentHeader from '../../components/StudentHeader';

let sideBarItems = [
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
  return (
    <div>
      <StudentHeader />
      <Box sx={{ maxWidth: '1440px', px: 3 }}>
        <Box sx={{ py: 1 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/student">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/student/">
              Courses
            </Link>
            <Typography color="text.primary">Operating Systems I</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ py: 1, display: 'flex' }}>
          <Avatar sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6" lineHeight={1}>
              Operating Systems I
            </Typography>
            <Typography variant="caption">
              University of Colombo School of Computing
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', margin: '0 auto' }}>
          <Box sx={{ width: '200px' }}>
            <CourseNav />
          </Box>
          <Box sx={{ p: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
