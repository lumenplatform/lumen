import SearchOutlined from '@mui/icons-material/SearchOutlined';
import {
  Box,
  Button,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


export function Header() {
  const navigate = useNavigate();
  const theme = useTheme();

  const HeaderLink = ({ text, link }: { text: string; link: string; }) => (
    <MuiLink
      sx={{
        color: 'black',
        mr: 3,
        cursor: 'pointer',
        fontWeight: 600,
        '&:hover': {
          color: theme.palette.primary.main,
        },
      }}
      onClick={() => navigate(link)}
      underline="none"
    >
      {text}
    </MuiLink>
  );

  return (
    <Box>
      <Toolbar sx={{ my: 2 }}>
        <img
          src="/assets/icons/logo_avatar.png"
          style={{ height: '48px', marginRight: '1rem' }} />
        <Typography fontWeight={700} fontSize="1.5rem">
          Lum<span style={{ color: theme.palette.primary.main }}>ė</span>n
        </Typography>
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
          sx={{ ml: 2 }} />
        {/* <Button sx={{ mr: 2 }} onClick={() => navigate('/manage')}>
              Teach
            </Button>  */}
        <Box sx={{ flexGrow: 1 }}></Box>
        <HeaderLink text="Home" link="/" />
        <HeaderLink text="Courses" link="/courses" />
        <HeaderLink text="For Instructors" link="/teaching" />
        <HeaderLink text="About" link="/courses" />
        <Button
          variant="contained"
          disableElevation
          onClick={() => navigate('/student')}
        >
          Start Learning
        </Button>
      </Toolbar>
    </Box>
  );
}
