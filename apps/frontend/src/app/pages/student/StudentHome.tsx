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
      <Container maxWidth="xl">
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

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto min-content',
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h5"> Learning Dashboard</Typography>

            <Tabs value={0}>
              {/* <Tab label="Home" /> */}
              <Tab label="In Progress" />
              <Tab label="Completed" />
            </Tabs>

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
          <Box>
            <Paper sx={{ mb: 3 }}>
              <DatePickerDemo></DatePickerDemo>
            </Paper>
            <Paper>
              <UpcomingEvents></UpcomingEvents>
            </Paper>
          </Box>
        </Box>
      </Container>
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
