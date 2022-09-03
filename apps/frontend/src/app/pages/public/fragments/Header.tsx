import SearchOutlined from '@mui/icons-material/SearchOutlined';
import {
  Box,
  Button,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const theme = useTheme();

  const HeaderLink = ({ text, link }: { text: string; link: string }) => (
    <NavLink
      to={link}
      style={({ isActive }) => ({
        textDecoration: 'none',
      })}
    >
      {({ isActive }) => (
        <MuiLink
          sx={{
            color: 'black',
            mr: 3,
            cursor: 'pointer',
            textDecoration: isActive ? 'underline' : 'none',
            textDecorationColor: (t) => theme.palette.primary.main,
            textDecorationThickness: '3px',
            fontWeight: isActive ? 600 : 400,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
          // style={({ isActive }: any) => ({ color: 'red' })}
          underline="none"
        >
          {text}
        </MuiLink>
      )}
    </NavLink>
  );

  return (
    <Box>
      <Toolbar sx={{ my: 2 }}>
        <img
          src="/assets/icons/logo_avatar.png"
          style={{ height: '48px', marginRight: '1rem' }}
          alt=""
        />
        <Typography fontWeight={700} fontSize="1.5rem" sx={{ mr: 2 }}>
          Lum<span style={{ color: theme.palette.primary.main }}>ė</span>n
        </Typography>
        {/* <Button  variant="outlined" disableElevation>
          Courses
        </Button> 
        <TextField
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined></SearchOutlined>
              </InputAdornment>
            ),
          }}
        />*/}
        {/* <Button sx={{ mr: 2 }} onClick={() => navigate('/manage')}>
              Teach
            </Button>  */}
        <Box sx={{ flexGrow: 1 }}></Box>
        <HeaderLink text="Home" link="/" />
        <HeaderLink text="Courses" link="/courses" />
        <HeaderLink text="For Instructors" link="/teaching" />
        <HeaderLink text="About" link="/courses" />
        <Button
          sx={{ mr: 2 }}
          variant="outlined"
          onClick={() => navigate('/student')}
        >
          Login
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => navigate('/student')}
        >
          Sign Up
        </Button>
      </Toolbar>
    </Box>
  );
}
