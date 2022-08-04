import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AudioIcon from '@mui/icons-material/AudioFileRounded';
import LinkIcon from '@mui/icons-material/LinkRounded';
import FileIcon from '@mui/icons-material/PictureAsPdfRounded';
import VideoIcon from '@mui/icons-material/VideoFileRounded';
import { useTheme } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/system';
import * as React from 'react';
import { useQuery } from 'react-query';
import { Link as L, useParams } from 'react-router-dom';
import { getCourseMaterial } from '../../../api';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    marginBottom: 10,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function CourseMaterial(props: any) {
  const { courseId } = useParams();

  const { data } = useQuery('material' + courseId, () =>
    getCourseMaterial(courseId!)
  );

  return (
    <div>
      {data &&
        data.map((courseMaterial: any) => (
          <CourseMaterialTopics courseMaterial={courseMaterial} />
        ))}
    </div>
  );
}

function CourseMaterialTopics(props: any) {
  const [expanded, setExpanded] = React.useState<true | false>(false);

  const handleChange =
    (panel: boolean) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? true : false);
    };

  const theme = useTheme();

  return (
    <Accordion expanded={expanded === true} onChange={handleChange(true)}>
      <AccordionSummary
        sx={{
          background: expanded
            ? alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity
              )
            : '',
        }}
      >
        <Typography sx={{ color: expanded ? theme.palette.primary.dark : '' }}>
          {props.courseMaterial.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ mb: 2 }}>
          {props.courseMaterial.description}
        </Typography>
        {props.courseMaterial.topics &&
          props.courseMaterial.topics.map((courseMaterialItem: any) => (
            <CourseMaterialItem
              courseMaterialItem={courseMaterialItem}
              sectionId={props.courseMaterial.id}
            />
          ))}
      </AccordionDetails>
    </Accordion>
  );
}

function CourseMaterialItem({
  sectionId,
  courseMaterialItem,
}: {
  sectionId: string;
  courseMaterialItem: any;
}) {
  const { courseId } = useParams();

  const [expanded, setExpanded] = React.useState<true | false>(false);

  const handleChange =
    (panel: boolean) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? true : false);
    };

  const theme = useTheme();

  return (
    <Accordion expanded={expanded === true} onChange={handleChange(true)}>
      <AccordionSummary>
        <Typography sx={{ color: expanded ? theme.palette.primary.dark : '' }}>
          {courseMaterialItem.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <L
          to={
            '/student/' +
            courseId +
            '/learn/' +
            sectionId +
            '/' +
            courseMaterialItem.id
          }
        >
          Learn
        </L>
      </AccordionDetails>
      {/* {props.courseMaterialItem.resources.map((resource: any) => (
        <Resource resource={resource} />
      ))} */}
    </Accordion>
  );
}
function Resource(props: any) {
  let Icon;
  if (props.resource.type === 'video') Icon = <VideoIcon color="action" />;
  else if (props.resource.type === 'audio') Icon = <AudioIcon color="action" />;
  else if (props.resource.type === 'link') Icon = <LinkIcon color="action" />;
  else if (props.resource.type === 'file') Icon = <FileIcon color="action" />;

  return (
    <AccordionDetails
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <Badge color="primary" variant="dot" invisible={props.resource.checked}>
        {Icon}
      </Badge>
      <L to="/student/co1/materialview">{props.resource.title}</L>
    </AccordionDetails>
  );
}

export default CourseMaterial;
