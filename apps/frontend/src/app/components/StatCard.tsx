import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';

 
import { Grid, Paper, Typography, useTheme } from '@mui/material';

export default function StatCard(props: any) {
  const { image, heading, subheading, stat, caption,imageSize } = props;
  const theme = useTheme();
  return (
    <Paper
      elevation={2}
      sx={{
        height: '150px',
        background: image,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'right',
        backgroundPositionY: 'bottom',
        backgroundSize: imageSize,
        p: 3,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Typography variant="h6"> {heading}</Typography>
      <Typography variant="h4"> {subheading}</Typography>
      <Typography
        fontWeight="700"
        fontSize={'2rem'}
        color={theme.palette.success.main}
      >
        {stat}
      </Typography>
      <Typography variant="caption">
        <span>{caption}</span>
      </Typography>
    </Paper>
  );
}
