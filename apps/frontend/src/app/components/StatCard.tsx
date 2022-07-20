import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';



export default function StatCard(props: any){
    return <div>  <Card sx={{ width:350 }}>
  <CardActionArea>
  
  <CardContent>
    <Typography  component="div">
     Total Active users
    </Typography>
    <Typography  component="div">
      +67  
     </Typography>
     
     <Typography  gutterBottom variant="h6"  component="div">
      1000
     </Typography>
   
  </CardContent>
</CardActionArea>
</Card> 
 </div>;
}