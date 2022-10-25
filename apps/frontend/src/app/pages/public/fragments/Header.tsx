import { Box, Button, Link as MuiLink, Toolbar, useTheme } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemedLogo from '../../../components/ThemedLogo';

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
            color: theme.palette.text.primary,
            mr: 3,
            cursor: 'pointer',
            textDecoration: isActive ? 'underline' : 'none',
            textDecorationColor: theme.palette.primary.main,
            textDecorationThickness: '3px',
            fontWeight: isActive ? 600 : 400,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
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
        <ThemedLogo />
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
        <HeaderLink text="About" link="/contact" />
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
