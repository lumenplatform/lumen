import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Certificate from '../../../components/certification';
import StudentHeader from '../../../components/StudentHeader';
import DownloadIcon from '@mui/icons-material/Download';
import SvgIcon from '@mui/icons-material/Download';
// import { getCourseById } from '../../../api';

export default function CertificateDownload() {
 

  return (

    <><StudentHeader />
    <Grid container spacing={2}>
          <Grid item xs={1} md={1}>

          </Grid>
          <Grid item xs={10} md={10}>
              <Box sx={{}}>
                  <Certificate />
              </Box>
          </Grid>
          <Grid item xs={1} md={1}></Grid>

          <Button variant="contained" sx={{ ml: 100, my: 3, paddingX: 22 }}>
          <SvgIcon component={DownloadIcon} />
              Download
          </Button>
      </Grid></>
  );
}
