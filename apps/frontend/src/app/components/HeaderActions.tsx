import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import { Avatar, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

function HeaderActions() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <IconButton color="inherit">
        {theme.palette.mode === 'dark' ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
      <IconButton color="inherit" sx={{ mr: theme.spacing(2) }}>
        <NotificationsNoneOutlinedIcon />
      </IconButton>
      <Avatar
        alt={user?.name}
        src={user?.picture}
        onClick={() => navigate('/profile')}
      />
    </>
  );
}

export default HeaderActions;
