import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { Grid, Paper, SvgIcon } from '@mui/material';
import StudentHeader from '../../components/StudentHeader';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function Notification(props: any) {
  return (
    <div>
      <StudentHeader />
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Grid item xs={10}>
            <Typography variant="h4" sx={{ ml: 4 }}>
              <b>Notifications</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Paper
            elevation={3}
            sx={{ paddingY: 3, mb: 1, backgroundColor: '#E8ECEA' }}
          >
            <Stack direction="row" spacing={2} sx={{ paddingX: 2 }}>
              <Avatar alt="Lumen" src="https://i.imgur.com/trvrn2W.jpg" />
              <Typography variant="subtitle1" sx={{ ml: 3 }}>
                <b>You have upcoming activities due </b>
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ ml: 9 }}>
              Complete the Linear Algebra course activity 5 before it expires.
            </Typography>
            <Typography variant="body2" sx={{ ml: 9 }}>
              Expires at: 00.00 am on 27nd Nov 2022
            </Typography>
            <Typography variant="caption" sx={{ ml: 9 }}>
              6 hours ago
            </Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{ paddingY: 3, mb: 1, backgroundColor: '#E8ECEA' }}
          >
            <Stack direction="row" spacing={2} sx={{ paddingX: 2 }}>
              <Avatar {...stringAvatar('Kent Dodds')} />
              <Typography variant="subtitle1" sx={{ ml: 3 }}>
                <b>Activity Completed.</b>
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ ml: 9 }}>
              Aircraft System Engineering activity 3 completed. Go to the course
              to view your gradings
            </Typography>
            <Typography variant="body2" sx={{ ml: 9 }}>
              Completed at: 14.22 pm on 25nd Nov 2022
            </Typography>
            <Typography variant="caption" sx={{ ml: 9 }}>
              1 day ago
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ paddingY: 3, mb: 1 }}>
            <Stack direction="row" spacing={2} sx={{ paddingX: 2 }}>
              <Avatar
                alt="Massachusette Institute"
                src="https://i.imgur.com/42Psi7n.png"
              />
              <Typography variant="subtitle1" sx={{ ml: 3 }}>
                <b>Introduction into Propulsion System</b>
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ ml: 9 }}>
              You have successfully registered into the course Introduction into
              Propulsion Systems by Prof. Gilbert Strang. Good Luck!
            </Typography>
            <Typography variant="body2" sx={{ ml: 9 }}></Typography>
            <Typography variant="caption" sx={{ ml: 9 }}>
              3 days ago
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ paddingY: 3, mb: 1 }}>
            <Stack direction="row" spacing={2} sx={{ paddingX: 2 }}>
              <Avatar alt="Lumen" src="https://i.imgur.com/PyrXSDB.png" />
              <Typography variant="subtitle1" sx={{ ml: 3 }}>
                <b>Strat Browsing...</b>
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ ml: 9 }}>
              Start browsing courses in Lumen.
            </Typography>
            <Typography variant="body2" sx={{ ml: 9 }}></Typography>
            <Typography variant="caption" sx={{ ml: 9 }}>
              6 days ago
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ paddingY: 3, mb: 1 }}>
            <Stack direction="row" spacing={2} sx={{ paddingX: 2 }}>
              <Avatar alt="Lumen" src="https://i.imgur.com/PyrXSDB.png" />
              <Typography variant="subtitle1" sx={{ ml: 3 }}>
                <b>Successfull Registration!</b>
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ mx: 9 }}>
              You have successfully registered into Lumen educational platform.
              Lumen lets you follow 100+ different courses.
            </Typography>
            <Typography variant="body2" sx={{ ml: 9 }}></Typography>
            <Typography variant="caption" sx={{ ml: 9 }}>
              6 days ago
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}
