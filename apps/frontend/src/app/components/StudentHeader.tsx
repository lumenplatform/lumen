import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import HeaderActions from './HeaderActions';
import ThemedLogo from './ThemedLogo';

function StudentHeader() {
  return (
    <div>
      <Toolbar>
        <ThemedLogo />
        <Box sx={{ flexGrow: 1 }}></Box>
        <HeaderActions />
      </Toolbar>
    </div>
  );
}

export default StudentHeader;
