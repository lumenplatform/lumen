import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';
import VideoIcon from '@mui/icons-material/VideoFileRounded';
import FileIcon from '@mui/icons-material/PictureAsPdfRounded';
import AudioIcon from '@mui/icons-material/AudioFileRounded';
import LinkIcon from '@mui/icons-material/LinkRounded';
import { alpha } from '@mui/system';
import { useTheme } from '@mui/material'

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

const courseMaterials = [{
  topic: "Week_1",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolorsit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.",
  items: [
    {
      item_topic: "video and audio",
      resources: [{
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Video 1",
        checked: false,
      },
      {
        type: "audio",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Audio 1",
        checked: false,
      }
      ]
    },
    {
      item_topic: "all",
      resources: [{
        type: "audio",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Audio 1",
        checked: false,
      }, {
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Video 1",
        checked: true,
      },
      {
        type: "file",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "File 1",
        checked: true,
      }
        ,
      {
        type: "link",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Link 1",
        checked: false,
      }
      ]
    }
  ]
}, {
  topic: "Week_2",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolorsit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.",
  items: [
    {
      item_topic: "video and audio",
      resources: [{
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Video 1",
        checked: false,
      },
      {
        type: "audio",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Audio 1",
        checked: false,
      }
      ]
    },
    {
      item_topic: "all",
      resources: [{
        type: "audio",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Audio 1",
        checked: false,
      }, {
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Video 1",
        checked: true,
      },
      {
        type: "file",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "File 1",
        checked: true,
      }
        ,
      {
        type: "link",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Link 1",
        checked: false,
      }
      ]
    }
  ]
}]

function CourseMaterial(props: any) {
  return (
    <div>
      {
        courseMaterials.map((courseMaterial: any) => (
          <CourseMaterialTopics courseMaterial={courseMaterial} />
        ))
      }
    </div>
  );
}

function CourseMaterialTopics(props: any) {
  const [expanded, setExpanded] = React.useState<true | false>(false);

  const handleChange =
    (panel: boolean) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? true : false);
      console.log("case");
    };

  const theme = useTheme();

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{props.courseMaterial.topic}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ mb: 2 }}>
          {props.courseMaterial.description}
        </Typography>
        {
          props.courseMaterial.items.map((courseMaterialItem: any) => (
            <CourseMaterialItem courseMaterialItem={courseMaterialItem} />
          ))
        }
      </AccordionDetails>
    </Accordion>
  );
}

function CourseMaterialItem(props: any) {
  const [expanded, setExpanded] = React.useState<true | false>(false);

  const handleChange =
    (panel: boolean) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? true : false);
      console.log("case");
    };

  const theme = useTheme();

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>
          {props.courseMaterialItem.item_topic}
        </Typography>
      </AccordionSummary>
      {
        props.courseMaterialItem.resources.map((resource: any) => (
          <Resource resource={resource} />
        ))
      }
    </Accordion>
  );
}
function Resource(props: any) {
  let Icon;
  if (props.resource.type === "video")
    Icon = <VideoIcon color="action" />;
  else if (props.resource.type === "audio")
    Icon = <AudioIcon color="action" />;
  else if (props.resource.type === "link")
    Icon = <LinkIcon color="action" />;
  else if (props.resource.type === "file")
    Icon = <FileIcon color="action" />;
    
  return (
    <AccordionDetails sx={{ alignItems: "center", display: "flex", justifyContent: "flex-start" }}>
      <Badge color="primary" variant="dot" invisible={props.resource.checked}>
        {Icon}
      </Badge>
      <Link href={props.resource.url} underline="hover" sx={{ m: 0, ml: 2 }}>
        {props.resource.title}
      </Link>
    </AccordionDetails>
  );
}

export default CourseMaterial;