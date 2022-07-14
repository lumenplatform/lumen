import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Backdrop, { backdropClasses } from '@mui/material/Backdrop';

export default function UpcomingEvents(props: any) {
  const events = [
    { course: 'compiler theory', description: 'Upcoming assignment due' },
    { course: 'compiler theory', description: 'Upcoming assignment due' },
  ];
  return (
    <List
      sx={{
        bgcolor: 'background.paper',
        overflow: 'auto',
        p: 1,
        borderRadius: 3,
      }}
    >
      {events.map((event: any) => (
        <UpcomingEventsItem
          course={event.course}
          description={event.description}
        />
      ))}
    </List>
  );
}

function UpcomingEventsItem(props: any) {
  return (
    <ListItem
      alignItems="center"
      sx={{ pr: 4, mb: 1, backdropFilter: 'blur(10px)' }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: green[500] }}>
          <AssignmentIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography noWrap variant="h6">
            {props.course}
          </Typography>
        }
        secondary={
          <Typography noWrap variant="body2">
            {props.description}
          </Typography>
        }
      />
    </ListItem>
  );
}
