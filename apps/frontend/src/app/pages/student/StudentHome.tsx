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
import { useNavigate } from 'react-router-dom';
import '../../../styles.css';

export default function CoursePage(props: any) {
  const [value, setValue] = useState<Date | null>(new Date());
  const navigate = useNavigate()
  return (
    <div>
      <StudentHeader />
      
      <Box sx={{ maxWidth: 'sx', px: 3 }}>
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
      </Box>

  <Grid container spacing={2}>
    <Grid item xs={8}>
      <Box sx={{ maxWidth: 'sx', px: 3 }}>
        <Typography variant="h5" lineHeight={1}>
          Student Home Page
        </Typography>
      </Box>
      
      <Box sx={{ maxWidth: 'sx', px: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
            gap: 2,
            mt: 2,
          }}
        >
          {Array.from(Array(3).keys()).map((r) => (
            <CourseCard key={r}   onClick={() => {
              navigate('/student/co1');
            }} />
          ))}
        </Box>

        <Box>
          <Box sx={{ display: 'flex', backgroundColor: '#EBE8E1', height: '50px', width: '150px', margin: '10px 10px 10px 10px', justifyContent: 'flex-end'}}>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
            gap: 2,
            mt: 2,
          }}
        >
          {Array.from(Array(3).keys()).map((r) => (
            <CourseCard key={r}   onClick={() => {
              navigate('/student/co1');
            }} />
          ))}
        </Box>

      </Box>
  </Grid>

  
  <Grid item xs={4}>
  <div className='calendar'>
    <Box sx={{maxWidth: 'sx', px: 3, py: 1 , marginTop: '7%'}}>
      <Paper sx={{ mb: 3 }}>
          <DatePickerDemo></DatePickerDemo>
        </Paper>
      </Box>

      <Box sx={{ maxWidth: 'sx', px: 3, py: 1}}>
        <Paper>
          <UpcomingEvents></UpcomingEvents>
        </Paper>
      </Box>
  </div>

  </Grid>
      </Grid>


       
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