import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
  darken,
  LinearProgress,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useQuery } from 'react-query';
import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
import { getCourseById, getCourseMaterial } from '../../../api';

const st = {
  color: 'lightgray !important',
  cursor: 'default',
  pointerEvents: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
};

export function CourseViewerNav({ topics }: { topics: any[] }) {
  const theme = useTheme();
  const { courseId, sectionId, topicId } = useParams();
  const { data: material } = useQuery('mat', () =>
    getCourseMaterial(courseId!)
  );
  const { data: course } = useQuery('course', () => getCourseById(courseId!));
  const section = material && material.filter((r: any) => r.id == sectionId)[0];

  const sectionIndex = material.findIndex((e: any) => e.id === sectionId);

  const activeIndex = section.topics.findIndex((e: any) => e.id === topicId);

  const getSectionLink = (index: number) => {
    let i = (sectionIndex + index) % material.length;
    if (i < 0) i += material.length;
    return (
      '/student/' +
      courseId +
      '/learn/' +
      material[i]?.id +
      '/' +
      material[i].topics[0]?.id
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: darken(theme.palette.background.paper, 0.02),
        minWidth: '280px',
        maxWidth: '320px',
        height: '100%',
      }}
    >
      <Box px={2} pt={2}>
        <Stack direction="row">
          <Typography>{course.title}</Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Link
            sx={sectionIndex === 0 ? st : {}}
            component={RouterLink}
            to={getSectionLink(-1)}
          >
            <ChevronLeft />
          </Link>

          <Link
            sx={sectionIndex === material.length - 1 ? st : {}}
            component={RouterLink}
            to={getSectionLink(1)}
          >
            <ChevronRight />
          </Link>
        </Stack>

        <small>
          {sectionIndex + 1} of {material.length}
        </small>
        <Stack direction="row" spacing={'6px'}>
          {material.map((r: any, index: number) => (
            <Box sx={{ flex: '1' }} key={index}>
              <LinearProgress
                variant="determinate"
                value={r.completedPercent}
                sx={{
                  background: theme.palette.grey[300],
                }}
              />
            </Box>
          ))}
        </Stack>
        <Typography my={1} mt={2} fontWeight="bold">
          {section && section.title}
        </Typography>
      </Box>
      {topics?.map((topic: any, index: any) => (
        <ContentNavItem
          key={topic.id}
          topic={topic}
          viewed={index < activeIndex}
          index={index + 1}
        />
      ))}
    </Box>
  );
}

function ContentNavItem(props: { topic: any; index: number; viewed: boolean }) {
  const { topic, index, viewed } = props;
  const { courseId, sectionId } = useParams();

  return (
    <NavLink
      to={'/student/' + courseId + '/learn/' + sectionId + '/' + topic.id}
      style={{ color: 'unset', textDecoration: 'unset' }}
    >
      {({ isActive }) => (
        <Stack
          direction="row"
          alignItems="center"
          p={1}
          sx={{
            ':hover': {
              backgroundColor: (theme) => theme.palette.background.default,
            },
            opacity: topic.completed && !isActive ? 0.4 : 1,
          }}
        >
          <CircularProgressWithLabel
            variant="determinate"
            index={index}
            value={topic.completed ? 100 : isActive ? 50 : 0}
          ></CircularProgressWithLabel>

          <Typography
            sx={{
              color: (theme) => (isActive ? theme.palette.primary.main : ''),
              fontWeight: isActive ? '600' : '',
            }}
            variant="body2"
          >
            {topic.title}
          </Typography>
        </Stack>
      )}
    </NavLink>
  );
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { index: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', px: 1 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={30}
        thickness={4}
        value={100}
      />
      <CircularProgress
        sx={{
          position: 'absolute',
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        variant="determinate"
        {...props}
        size={30}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {props.index}
        </Typography>
      </Box>
    </Box>
  );
}
