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


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
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

const course_materials = [{
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
      },{
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
},{
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
      },{
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
        course_materials.map((course_material: any) => (
          <CourseMaterialTopics course_material={course_material} />
        ))
      }
    </div>
  );
}

function CourseMaterialTopics(props: any) {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{props.course_material.topic}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ mb: 2 }}>
          {props.course_material.description}
        </Typography>
        {
          props.course_material.items.map((course_material_item: any) => (
            <CourseMaterialItem course_material_item={course_material_item} />
          ))
        }
      </AccordionDetails>
    </Accordion>
  );
}

function CourseMaterialItem(props: any) {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>
          {props.course_material_item.item_topic}
        </Typography>
      </AccordionSummary>
      {
        props.course_material_item.resources.map((resource: any) => {
          if (resource.type === "video")
            return <VideoResource resource={resource} />
          else if (resource.type === "audio")
            return <AudioResource resource={resource} />
          else if (resource.type === "link")
            return <LinkResource resource={resource} />
          else if (resource.type === "file")
            return <FileResource resource={resource} />
          return null;
        })
      }
    </Accordion>
  );
}

function VideoResource(props: any) {
  return (
    <AccordionDetails sx={{ alignItems: "center", display: "flex", justifyContent: "flex-start" }}>
      <Badge color="primary" variant="dot" invisible={props.resource.checked}>
        <VideoIcon color="action" />
      </Badge>
      <Link href={props.resource.url} underline="hover" sx={{ m: 0, ml: 2 }}>
        {props.resource.title}
      </Link>
    </AccordionDetails>
  );
}

function AudioResource(props: any) {
  return (
    <AccordionDetails sx={{ alignItems: "center", display: "flex", justifyContent: "flex-start" }}>
      <Badge color="primary" variant="dot" invisible={props.resource.checked}>
        <AudioIcon color="action" />
      </Badge>
      <Link href={props.resource.url} underline="hover" sx={{ m: 0, ml: 2 }}>
        {props.resource.title}
      </Link>
    </AccordionDetails>
  );
}

function FileResource(props: any) {
  return (
    <AccordionDetails sx={{ alignItems: "center", display: "flex", justifyContent: "flex-start" }}>
      <Badge color="primary" variant="dot" invisible={props.resource.checked}>
        <FileIcon color="action" />
      </Badge>
      <Link href={props.resource.url} underline="hover" sx={{ m: 0, ml: 2 }}>
        {props.resource.title}
      </Link>
    </AccordionDetails>
  );
}

function LinkResource(props: any) {
  return (
    <AccordionDetails sx={{ alignItems: "center", display: "flex", justifyContent: "flex-start" }}>
      <Badge color="primary" variant="dot" invisible={props.resource.checked}> {/* invisble = props.visibilty */}
        <LinkIcon color="action" />
      </Badge>
      <Link href={props.resource.url} underline="hover" sx={{ m: 0, ml: 2 }}>
        {props.resource.title}
      </Link>
    </AccordionDetails>
  );
}

export default CourseMaterial;