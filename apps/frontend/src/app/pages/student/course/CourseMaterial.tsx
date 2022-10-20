import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OndemandVideoOutlined from '@mui/icons-material/OndemandVideoOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseMaterial } from '../../../api';

function CourseMaterial(props: any) {
  const { courseId } = useParams();

  const { data } = useQuery('material' + courseId, () =>
    getCourseMaterial(courseId!)
  );

  if (!data) return <Box>'Loading..'</Box>;

  return (
    <Box sx={{ p: 1, position: 'relative' }}>
      {data.map((section: any) => (
        <CourseSection section={section} />
      ))}
    </Box>
  );
}

function CourseSection({ section }: { section: any }) {
  const [expanded, setExpanded] = useState<true | false>(true);

  const handleChange = () => setExpanded(expanded ? false : true);
  const theme = useTheme();

  return (
    <Accordion
      expanded={expanded === true}
      onChange={handleChange}
      elevation={0}
      sx={{
        borderRadius: '.2rem',
        border: '1px solid ' + theme.palette.divider,
      }}
    >
      <AccordionSummary
        sx={{
          minHeight: '48px',
          position: 'sticky',
          top: 0,
          background: theme.palette.background.paper,
          zIndex: 1,
          borderBottom: '1px solid ' + theme.palette.divider,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="body1" fontWeight={'600'} px={2}>
          {section.title}
        </Typography>
        {section.totalTime} Minutes
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ mt: 1, mx: 2 }}>{section.description}</Typography>
        <List>
          {section.topics &&
            section.topics.map((topic: any) => (
              <CourseTopic topic={topic} sectionId={section.id} />
            ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

const TopicIcon = ({ type }: { type: string }) => {
  if (type === 'video') return <OndemandVideoOutlined />;
  if (type === 'quiz') return <QuizOutlinedIcon />;
  return <ArticleOutlinedIcon />;
};

function CourseTopic(props: { sectionId: string; topic: any }) {
  const { courseId } = useParams();
  const { sectionId, topic } = props;
  const navigate = useNavigate();

  return (
    <ListItem disablePadding secondaryAction={<CheckCircleOutlineIcon />}>
      <ListItemButton
        sx={{ py: 0 }}
        onClick={() =>
          navigate(`/student/${courseId}/learn/${sectionId}/${topic.id}`)
        }
      >
        <ListItemIcon sx={{ color: 'inherit' }}>
          <TopicIcon type={topic.contentType} />
        </ListItemIcon>
        <ListItemText
          primary={topic.title}
          secondary={
            <Box sx={{ textTransform: 'capitalize' }}>
              {topic.contentType || 'Lesson'}
              {topic.timeEstimate && ' - ' + topic.timeEstimate + ' Minutes'}
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

export default CourseMaterial;
