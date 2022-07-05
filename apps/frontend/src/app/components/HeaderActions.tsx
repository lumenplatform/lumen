import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import { Avatar, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';

function HeaderActions() {
  const theme = useTheme();
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
        alt="Remy Sharp"
        src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-3/images/avatars/1.png"
      />
    </>
  );
}

export default HeaderActions;
