import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Link as MuiLink,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function CourseCard({
  course,
  onClick,
}: {
  course: any;
  onClick?: any;
}) {
  const theme = useTheme();
  return (
    <Link to={'/courses/' + course.courseId} style={{ textDecoration: 'none' }}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image={course.courseImage.url}
            alt="course image"
          />

          <CardContent>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{ fontWeight: 'bold', minHeight: '3em' }}
            >
              {course.title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                mb: 2,
              }}
            >
              <Avatar
                sx={{ mr: 1 }}
                src={course.organization.customizations?.logo?.path}
              />
              <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
                <MuiLink
                  to={'?organization=' + course.organization.name}
                  component={Link}
                  sx={{
                    color: 'inherit',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  underline="hover"
                >
                  <Typography sx={{}}>{course.organization.name}</Typography>
                </MuiLink>
                <Typography variant="body2">By Prof. Gilbert Strang</Typography>
              </Box>
            </Box>

            <Typography variant="caption">
              {course.subjectArea} - {course.tags}
            </Typography>

            <Stack direction="row" spacing={0.7}>
              <Rating
                name="size-small"
                defaultValue={course.rating}
                size="small"
                readOnly
                sx={{ mr: 0.5 }}
              />

              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {course.rating && String(course.rating).includes('.')
                  ? course.rating
                  : course.rating + '.0'}
              </Typography>
              <Typography variant="caption">
                (
                {course.ratingCount > 999999
                  ? (course.ratingCount / 1000000).toFixed(1) + 'm'
                  : course.ratingCount > 999
                  ? (course.ratingCount / 1000).toFixed(1) + 'k'
                  : course.ratingCount}
                )
              </Typography>
              <Typography variant="caption">{course.level}</Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
