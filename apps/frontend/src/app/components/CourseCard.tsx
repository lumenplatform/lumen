import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Typography,
  useTheme
} from '@mui/material';

export default function CourseCard(props: any) {
  const theme = useTheme();
  return <div>
    <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRLJVGf2FyO7PH2UPREdmXQH7at_MIqy-g9cu9kdphiLYzlRf5BogQtvs8ucVJtKE5GsY&usqp=CAU"
          alt="green iguana"
        />

        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 2 }}>
            <Avatar sx={{ width: 35, height: 35, mr: 1 }} src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-3/images/avatars/1.png" />
            <Typography gutterBottom variant="body2" component="h2">
              University of LMNOP
            </Typography>
          </Box>
          <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
            SCS3208 Software Project Management
          </Typography>
          <Grid container spacing={0.8}>
            <Grid item >
              <Chip label="@machine-learning" color='success' variant="outlined" size='small' />
            </Grid>
            <Grid item >
              <Chip label="@python" color='success' variant="outlined" size='small' />
            </Grid>
            <Grid item >
              <Chip label="@octave" color='success' variant="outlined" size='small' />
            </Grid>
            <Grid item >
              <Chip label="@python" color='success' variant="outlined" size='small' />
            </Grid>
            <Grid item >
              <Chip label="@octave" color='success' variant="outlined" size='small' />
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 3 }}>
            Skills you'll gain : <Typography variant="caption" >Mcahine learning is important</Typography>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mt: 5 }}>
            <Rating name="size-small" defaultValue={3} size="small" readOnly sx={{ mr: 0.5 }} />
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              3.0 <Typography variant="caption" >(250k reviews)</Typography>
            </Typography>
          </Box>
          <Typography variant="caption" >Beginner</Typography>


        </CardContent>
      </CardActionArea>
    </Card>
  </div>;
}
