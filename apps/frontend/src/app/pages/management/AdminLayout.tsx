import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';

import { ListSubheader } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import HeaderActions from '../../components/HeaderActions';

const drawerWidth = 220;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  maxWidth: '1440px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

const sideBarItems = [
  {
    label: 'Dashboard',
    path: '/manage',
    icon: <PieChartOutlineOutlinedIcon />,
  },
  { subHeading: 'Courses', path: '' },
  {
    label: 'All Courses',
    path: '/manage/courses',
    icon: <AssignmentOutlinedIcon />,
  },
  {
    label: 'New Course',
    path: '/manage/new-course',
    icon: <NoteAddOutlinedIcon />,
  },
  { subHeading: 'Settings', path: '' },
  {
    label: 'Users',
    path: '/manage/users',
    icon: <GroupOutlinedIcon />,
  },
  {
    label: 'Billing & Payments',
    path: '/manage/billing',
    icon: <PaymentsOutlinedIcon />,
  },
  {
    label: 'Customizations',
    path: '/manage/customize',
    icon: <DisplaySettingsOutlinedIcon />,
  },
];

const AdminToolbar = (props: {
  handleDrawerClose: any;
  handleDrawerOpen: any;
  open: boolean;
}) => {
  const theme = useTheme();

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        onClick={props.handleDrawerClose}
        sx={{ mr: 2, ...(!props.open && { display: 'none' }) }}
        edge="start"
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={props.handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(props.open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
      ></Typography>
      <HeaderActions />
    </Toolbar>
  );
};

const SideNavItems = () => {
  const theme = useTheme();

  return (
    <List>
      {sideBarItems.map((item, index) => {
        if (item.subHeading) {
          return (
            <ListSubheader key={index} component="div">
              {item.subHeading}
            </ListSubheader>
          );
        }

        return (
          <NavLink
            key={index}
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
                  <ListItemIcon
                    sx={{ minWidth: '38px' }}
                    style={{
                      color: isActive ? theme.palette.primary.dark : '',
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
};

export default function AdminLayout() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img
            src="/assets/icons/logo_horiz.png"
            style={{ height: '48px' }}
          ></img>
        </DrawerHeader>
        <SideNavItems />
      </Drawer>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Main open={open}>
          <AdminToolbar
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
            open={open}
          />
          <Box
            sx={{
              px: theme.spacing(3),
            }}
          >
            <Outlet />
          </Box>
        </Main>
      </Box>
    </Box>
  );
}
