import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function CourseCard(props: any) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate('/student/course-x')}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRLJVGf2FyO7PH2UPREdmXQH7at_MIqy-g9cu9kdphiLYzlRf5BogQtvs8ucVJtKE5GsY&usqp=CAU"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            SCS3208 Software Project Management
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
