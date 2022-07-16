import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useState } from 'react';
import StudentHeader from '../../components/StudentHeader';
import UpcomingEvents from '../../components/UpcomingEvents';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CourseCard from '../../components/CourseCard';

export default function CoursePage(props: any) {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <div>
      <StudentHeader />

      <Box sx={{ maxWidth: '1440px', px: 3 }}>
        <Box sx={{ py: 1 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/student">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/student/">
              Student Home Page
            </Link>
          </Breadcrumbs>
        </Box>
        <Box sx={{ py: 1, display: 'flex' }}>
          <Box>
            <Typography variant="h5" lineHeight={1}>
              Student Home Page
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{  margin: '',  height: '200px', width: '1150px'}}>
          <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
                gap: 2,
                mt: 2,
              }}
            >
              {Array.from(Array(3).keys()).map((r) => (
                <CourseCard key={r} />
              ))}
          </Box>
        </Box>
        
        <br />
        <Box sx={{ display: 'flex', marginLeft: '950px', backgroundColor: '#EBE8E1', height: '50px', width: '200px'}}>
          <Box sx={{ p: 2 , flex:1,mr:10}}>
         
          </Box>
        </Box>

        <br />

        <Box sx={{   margin: '',   height: '500px', width: '1150px'}}>
          <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
                gap: 2,
                mt: 2,
              }}
            >
              {Array.from(Array(3).keys()).map((r) => (
                <CourseCard key={r} />
              ))}
          </Box>
        </Box>
        
      </Box>

      <Box sx={{ display: 'flex', marginLeft: '1200px', marginTop: '-800px',   width: '270px', alignContent: 'left'}}>
        <Paper sx={{ mb: 3 }}>
          <DatePickerDemo></DatePickerDemo>
        </Paper>
      </Box>
      <br />
      <Box sx={{ marginLeft: '1200px', marginTop: '0px',   height: '580px', width: '290px', alignContent: 'left'}}>
        <Paper>
          <UpcomingEvents></UpcomingEvents>
        </Paper>
      </Box>

      
    </div>
  );
}

export function DatePickerDemo() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
