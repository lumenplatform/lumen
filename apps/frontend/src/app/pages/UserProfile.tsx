import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchUser } from '../api';
import { useAuth } from '../components/Auth';
import CourseHistoryList from '../components/CourseHistoryList';
import StudentHeader from '../components/StudentHeader';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function OverviewTab() {
  return (
    <div>
      <Paper sx={{ py: 3, mb: 2 }}>
        <Typography variant="h6" sx={{ mx: 3, lineHeight: 1 }}>
          Course History
        </Typography>
        <CourseHistoryList />
      </Paper>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" sx={{ lineHeight: 1, mb: 3 }}>
          Profile Information
        </Typography>
        <Box
          sx={{
            my: 2,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
          }}
        >
          <TextField label="Username" disabled={true} value="@dalanad" />
          <TextField label="Full Name" value={'Dalana Dharmathilake'} />
          <TextField label="Email" value={'dalana.dhar@gmail.com'} />
          <TextField label="Timezone" value="+05.30" />
        </Box>
        <Button variant="contained">Update Profile</Button>
      </Paper>
    </div>
  );
}

function CommunicationsTab() {
  return (
    <div>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" sx={{ lineHeight: 1, mb: 2 }}>
          Communications from Lumėn
        </Typography>

        <Box sx={{ my: 2 }}>
          <Typography>I want to receive the following:</Typography>
          <FormGroup sx={{ ml: 2 }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Weekly personalized course recommendations"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Weekly notifications about promotions, new courses and programs, and special events"
            />
          </FormGroup>
        </Box>
        <Button variant="outlined">Save</Button>
      </Paper>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" sx={{ lineHeight: 1, mb: 2 }}>
          Communication about courses you are enrolled in
        </Typography>
        <Alert severity="info">
          These are the defaults for the courses. you can override the
          preference for each course inside the course settings
        </Alert>
        <Box sx={{ my: 2 }}>
          <FormGroup sx={{ ml: 2 }}>
            <FormControlLabel control={<Checkbox />} label="Announcements" />
            <FormControlLabel control={<Checkbox />} label="Reminders" />
            <FormControlLabel
              control={<Checkbox />}
              label="Discussion Forums"
            />
          </FormGroup>
        </Box>
        <Button variant="outlined">Update</Button>
      </Paper>
    </div>
  );
}

function SecurityTab() {
  const theme = useTheme();

  const PasswordInput = ({ label }: { label: string }) => (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        label={label}
        type={'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              // onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              <VisibilityOff />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );

  return (
    <div>
      <Paper
        sx={{
          p: theme.spacing(3),
          mb: theme.spacing(2),
        }}
      >
        <Typography variant="h6" sx={{ lineHeight: 1, mb: 2 }}>
          Change Password
        </Typography>
        <Alert severity="warning">
          Minimum 8 characters long, uppercase & symbol
        </Alert>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { mr: 2 },
            my: 2,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
          noValidate
          autoComplete="off"
        >
          <PasswordInput label="New Password" />
          <PasswordInput label="Confirm New Password" />
        </Box>
        <Button variant="contained">Change Password</Button>
      </Paper>
    </div>
  );
}

function ProfileSections() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ mb: 3 }}
        >
          <Tab
            icon={<PersonOutlineOutlinedIcon />}
            iconPosition="start"
            label="Overview"
            sx={{ minHeight: '48px' }}
          />
          <Tab
            icon={<LockOutlinedIcon />}
            iconPosition="start"
            label="Security"
            sx={{ minHeight: '48px' }}
          />
          <Tab
            icon={<NotificationsNoneOutlinedIcon />}
            iconPosition="start"
            label="Communications"
            sx={{ minHeight: '48px' }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OverviewTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SecurityTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CommunicationsTab />
      </TabPanel>
    </Box>
  );
}

function ProfileCard() {
  const theme = useTheme();
  const { user, signOut } = useAuth();
  const { isLoading, data } = useQuery('fetchUser', fetchUser);

  if (!user) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  return (
    <Box sx={{ p: theme.spacing(2) }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: theme.spacing(1),
        }}
      >
        <Avatar sx={{ width: 72, height: 72 }} src={user.picture}></Avatar>
        <Typography variant="h6">{user.name}</Typography>
        <Typography>@{user.nickname}</Typography>
      </Box>
      <Typography variant="subtitle2" my={theme.spacing(1)}>
        Details
      </Typography>
      <Box>
        <Typography>
          <b>Username:</b> @{user.nickname}
        </Typography>
        <Typography>
          <b>Full Name</b> {user.name}
        </Typography>
        <Typography>
          <b>Email:</b> {user.email}
        </Typography>
        <Typography>
          <b>Timezone:</b> +05.30
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Edit
        </Button>
        <Button variant="outlined" color="error">
          Deactivate
        </Button>
        <br></br>
      </Box>
      <Button variant="outlined" sx={{ mr: 2 }} onClick={signOut}>
        Logout
      </Button>
    </Box>
  );
}

export default function UserProfile(props: any) {
  return (
    <Container>
      <StudentHeader />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}>
          <ProfileCard />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <ProfileSections />
        </Grid>
      </Grid>
    </Container>
  );
}
