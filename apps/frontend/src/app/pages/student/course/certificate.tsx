import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Certificate from '../../../components/certification';
import StudentHeader from '../../../components/StudentHeader';
import DownloadIcon from '@mui/icons-material/Download';
import SvgIcon from '@mui/icons-material/Download';
import { Container } from '@mui/material';
// import { getCourseById } from '../../../api';

export default function CertificateDownload() {
  return (
    <>
      <StudentHeader />
      <Box sx={{}}>
        <Certificate />
      </Box>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Button
          variant="contained"
          disableElevation
          sx={{ my: 3, margin: '0 auto' }}
          onClick={() => window.print()}
        >
          Print Certificate
        </Button>
      </Box>
    </>
  );
}
