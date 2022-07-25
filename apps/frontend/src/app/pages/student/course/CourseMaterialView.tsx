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
import { useTheme } from '@mui/material';

function CourseResources() {
    return (
        <>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                1. Partial Derivatives
            </Typography>
            <Box alignItems="center" sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </Box>
            <Box sx={{my:5}}>
                <Typography variant="body1" gutterBottom>
                    <h1>Intorduction</h1>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolorsit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolorsit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolorsit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.
                    <h1>Hello</h1>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolorsit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolorsit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolorsit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.
                </Typography>
            </Box>

        </>
    );
}

export default CourseResources;