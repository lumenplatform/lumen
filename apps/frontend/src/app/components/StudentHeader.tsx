import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import HeaderActions from './HeaderActions';

function StudentHeader() {
  return (
    <div>
      <Toolbar>
        <img src="/assets/icons/logo_horiz.png" style={{ height: '48px' }} />
        <Box sx={{ flexGrow: 1 }}></Box>
        <HeaderActions />
      </Toolbar>
    </div>
  );
}

export default StudentHeader;
