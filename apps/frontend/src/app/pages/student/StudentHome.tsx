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
              Student Home Page
            </Link>
          </Breadcrumbs>
        </Box>
        <Box sx={{ py: 1, display: 'flex' }}>
          <Box>
            <Typography variant="h5" lineHeight={1}>
              Student Home Page
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', margin: '', backgroundColor: '#EBE8E1', height: '200px', width: '1150px'}}>
          <Box sx={{ p: 2 , flex:1,mr:10}}>
            <Outlet />
          </Box>
        </Box>
        
        <br />
        <Box sx={{ display: 'flex', marginLeft: '950px', backgroundColor: '#EBE8E1', height: '50px', width: '200px'}}>
          <Box sx={{ p: 2 , flex:1,mr:10}}>
            <Outlet />
          </Box>
        </Box>

        <br />

        <Box sx={{ display: 'flex', margin: '', backgroundColor: '#EBE8E1', height: '500px', width: '1150px'}}>
          <Box sx={{ p: 2 , flex:1,mr:10}}>
            <Outlet />
          </Box>
        </Box>
        
      </Box>

      <Box sx={{ display: 'flex', marginLeft: '1200px', marginTop: '-800px', backgroundColor: '#EBE8E1', height: '200px', width: '270px', alignContent: 'left'}}>
        <Box sx={{ p: 2 , flex:1,mr:10}}>
          <Outlet />
        </Box>
      </Box>
      <br />
      <Box sx={{ display: 'flex', marginLeft: '1200px', marginTop: '0px', backgroundColor: '#EBE8E1', height: '580px', width: '270px', alignContent: 'left'}}>
        <Box sx={{ p: 2 , flex:1,mr:10}}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}
