import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';

const style = {
  width: '300%',
  maxWidth: 500,
  bgcolor: '#90ee90',
  height: 1000,
};

export function ListDividers() {
  return (
    <Card sx={{ width: 530, height: 950 }}>
      <CardContent>
        <List sx={style} component="nav" aria-label="mailbox folders">
          <Typography variant="h4">Notifications</Typography>
          <Divider></Divider>
          <ListItem>
            <ListItemText
              primary="you have upcoming activities due"
              secondary="7 days 6 hours age"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="you have upcoming activities due"
              secondary="7 days 6 hours age"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="you have upcoming activities due"
              secondary="7 days 6 hours age"
            />
          </ListItem>
          <Divider />
          <Divider />
        </List>
      </CardContent>
    </Card>
  );
}

export default function SimpleContainer(props: any) {
  return (
    <div
      style={{
        backgroundImage: `url(https://img.freepik.com/free-vector/green-curve-abstract-background_53876-99569.jpg?w=2000`,
      }}
    >
      <React.Fragment>
        <Container maxWidth="sm">
          <ListDividers></ListDividers>
        </Container>
      </React.Fragment>
    </div>
  );
}
