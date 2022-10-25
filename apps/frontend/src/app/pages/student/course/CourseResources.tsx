import * as React from 'react';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';
import VideoIcon from '@mui/icons-material/VideoFileRounded';
import FileIcon from '@mui/icons-material/PictureAsPdfRounded';
import AudioIcon from '@mui/icons-material/AudioFileRounded';
import LinkIcon from '@mui/icons-material/LinkRounded';
import { alpha } from '@mui/system';
import { ListItemText, Typography } from '@mui/material';
import {useTheme} from '@mui/material';
import { useQuery } from 'react-query';
import { getCourseById, getCourseMaterial } from '../../../api';
import {useParams } from 'react-router-dom';

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

function CourseResources() {
  const { courseId, sectionId, topicId } = useParams();
  const { data } = useQuery('mat', () => getCourseMaterial(courseId!));
  const { data: course } = useQuery('course', () => getCourseById(courseId!));

  return (
    <List>
      {
        courseMaterials.map((material) => (
          <CourseMaterialTopics topic={material.topic} description={material.description} items={material.items} />
        ))
      }
    </List>
  );
}

function CourseMaterialTopics(props: any) {
  let resources : any [] = [];
  resources = props.items.flatMap((item: any) => (item.resources));

  return (
    <>
      <ListItem>
        <ListItemText disableTypography primary={<Typography variant="h6">{props.topic}</Typography>} />
      </ListItem>
      <List disablePadding>
        {
          resources.map((item:any) => (
            <ResourceItem item = {item} />
          ))
        }
      </List>
    </>
  );
}

function ResourceItem(props: any) {
  const theme = useTheme();
  let icon;
  if (props.item.type === "video")
    icon = <VideoIcon color="action" />;
  else if (props.item.type === "audio")
    icon = <AudioIcon color="action" />;
  else if (props.item.type === "link")
    icon = <LinkIcon color="action" />;
  else if (props.item.type === "file")
    icon = <FileIcon color="action" />;
  return (
    <ListItem sx={{pl: 6,ml:6, py: 1.2 ,mb: 0.5, borderRadius: 2 , background: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)}}>
      <ListItemIcon>
        <Badge color="primary" variant="dot" invisible={props.item.checked}>
          {icon}
        </Badge>
      </ListItemIcon>
      <Link href={props.item.url} underline="hover" sx={{ m: 0, ml: 2 }}>
        {props.item.title}
      </Link>
    </ListItem>
  );
}

export default CourseResources;