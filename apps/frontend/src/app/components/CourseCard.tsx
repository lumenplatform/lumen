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
  useTheme,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function CourseCard(props: any) {
  const { course } = props
  const theme = useTheme();
  return (
    <Link to={course.courseId} style={{ textDecoration: 'none' }}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image={course.courseImage}
            alt="course image"
          />

          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                mb: 2,
              }}
            >
              <Avatar
                sx={{ width: 35, height: 35, mr: 1 }}
                src={course.organization.customizations_logo}
              />
              <Link to={'?organization=' + course.organization.name} style={{ color: 'black' }}>
                <Typography gutterBottom variant="body2" component="h2">
                  {course.organization.name}
                </Typography>
              </Link>
            </Box>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              {course.title}
            </Typography>
            <Grid container spacing={0.8}>
              <Grid item>
                <Chip
                  label="@machine-learning"
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item>
                <Chip
                  label="@python"
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item>
                <Chip
                  label="@octave"
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item>
                <Chip
                  label="@python"
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item>
                <Chip
                  label="@octave"
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{
              fontWeight: 'bold', mt: 3, overflow: 'hidden', display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: { xs: 4, sm: 2 },
            }} >
              Skills you'll gain :{' '}
              <Typography variant="caption">
                {course.learningOutcome.join(", ")}
              </Typography>
            </Typography>

            <Stack direction="row" spacing={0.7} sx={{ mt: 5 }}>
              <Rating
                name="size-small"
                defaultValue={course.rating}
                size="small"
                readOnly
                sx={{ mr: 0.5 }}
              />
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {course.rating && course.rating.includes(".") ? course.rating : course.rating + ".0"}
              </Typography>
              <Typography variant="caption">
                {course.ratingCount > 999999 ? (course.ratingCount / 1000000).toFixed(1) + 'm' : course.ratingCount > 999 ? (course.ratingCount / 1000).toFixed(1) + 'k' : course.ratingCount}
                {" reviews"}
              </Typography>
            </Stack>
            <Typography variant="caption">{course.level}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link >
  );
}
