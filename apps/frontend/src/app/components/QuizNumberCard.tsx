import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import * as React from 'react';

export default function NumberCard() {

    const [value, setValue] = React.useState('one');

  return (
    <Card
      sx={{
        height: 100,
        width: 250,
        // margin: 5,
        // marginTop: 20,
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body2" sx={{ paddingBottom: 1 }}>
          Not Answered
        </Typography>

        <Typography variant="body2" sx={{ paddingBottom: 1 }}>
          Marked 0.00 out of 1.00
        </Typography>
      </CardContent>
    </Card>
  );
}
