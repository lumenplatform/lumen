import React from 'react';
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
import { Box, ListItemText, Typography } from '@mui/material';
import {useTheme} from '@mui/material';

const courseMaterials = [{
  topic: "Section 1",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolorsit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.",
  items: [
    {
      item_topic: "video and audio",
      resources: [{
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Problem Set 1 Explanation",
        checked: false,
      },
      
      ]
    },
    {
      item_topic: "all",
      resources: [{
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Problem Set 2 Explanation",
        checked: false,
      },  
        {
          type: "file",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          title: "Reference Book",
          checked: true,
      }
        ,
      {
        type: "link",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Web Activity",
        checked: false,
      }
      ]
    }
  ]
}, {
  topic: "Section 2",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolorsit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.",
  items: [
    {
      item_topic: "video and audio",
      resources: [{
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Problem Set 3 Explanation",
        checked: false,
      },
      
      ]
    },
    {
      item_topic: "all",
      resources: [{
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Problem Set 4 Explanation",
        checked: false,
      },  
        {
          type: "file",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          title: "Reference Book",
          checked: true,
      }
        ,
      {
        type: "link",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Web Activity",
        checked: false,
      }
      ]
    }
  ]
}]

function CourseResources() {
  return (
    <Box sx={{p:2}}>
      {
        courseMaterials.map((material) => (
          <CourseMaterialTopics topic={material.topic} description={material.description} items={material.items} />
        ))
      }
    </Box>
  );
}

function CourseMaterialTopics(props: any) {
  let resources : any [] = [];
  resources = props.items.flatMap((item: any) => (item.resources));

  return (
    <>
      <Typography variant="h6">{props.topic}</Typography>
      <List  >
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
    <ListItem sx={{ borderRadius: 2 , my:1,background: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)}}>
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