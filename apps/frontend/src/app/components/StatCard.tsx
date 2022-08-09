import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function StatCard(props: any) {
  return (
    <div>
      <Card
        sx={{
          height: '150px',
          borderRadius: 4,
        }}
        elevation={2}
      >
        <CardActionArea>
          <CardContent>
            <Typography component="div">Total Active users</Typography>
            <Typography component="div">+67</Typography>
            <Typography gutterBottom variant="h6" component="div">
              1000
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
