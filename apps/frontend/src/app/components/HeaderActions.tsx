import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { Avatar, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { ThemeContext } from '../providers/ThemeModeProvider';

function HeaderActions() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const colorMode = React.useContext(ThemeContext);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => {
          colorMode.toggleColorMode();
        }}
      >
        {theme.palette.mode === 'dark' ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
      <BasicPopover />

      <Avatar
        alt={user?.name}
        src={user?.picture}
        onClick={() => navigate('/profile')}
      />
    </>
  );
}
function Notification() {
  return (
    <List sx={{ bgcolor: 'background.paper' }}>
      <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CheckIcon />
      </ListItem>
      <ListItem>
        <ListItemText
          primary=" you have upcoming activities due"
          secondary="7 days 6 hours age"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="you have upcoming activities due"
          secondary="7 days 6 hours age"
        />
      </ListItem>

      <Grid container justifyContent="center">
        <Grid item>
          <Button variant="text" href="/notification/">
            See all
          </Button>
        </Grid>
      </Grid>
    </List>
  );
}

export function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick} sx={{ mr: 2 }}>
        <NotificationsNoneOutlinedIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Notification></Notification>
      </Popover>
    </div>
  );
}

export default HeaderActions;
