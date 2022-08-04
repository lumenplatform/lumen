import {
  Box,
  Button, Grid,
  Paper, Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

//Setup & test video

export function SetupAndTestVideo() {
  return (
    <Box sx={{ px: 3 }}>
      <Box sx={{ p: 2, backgroundColor: '#f7f9fa' }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="body1" gutterBottom mt={0}>
              <Box sx={{ fontWeight: 'bold' }}>
                Arrange your ideal studio and get early feedback
              </Box>
              <Box mt={2}>
                It's important to get your audio and video set up correctly now,
                because it's much more difficult to fix your videos after you’ve
                recorded. There are many creative ways to use what you have to
                create professional looking video.
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Typography variant="body1" gutterBottom p={4}>
                <Box
                  sx={{ fontWeight: 'bold' }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  Free expert video help
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  Get personalized advice on your audio and video
                </Box>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  <Button variant="outlined">Create a test video</Button>
                </Box>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="body1" gutterBottom mt={0}>
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h5"
            gutterBottom
            component="div"
            mt={2}
            mb={2}
          >
            Tips
          </Typography>

          <Box sx={{ fontWeight: 'bold' }}>Equipment can be easy.</Box>
          <Box>
            You don’t need to buy fancy equipment. Most smartphone cameras can
            capture video in HD, and you can record audio on another phone or
            external microphone.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Students need to hear you.
          </Box>
          <Box>
            A good microphone is the most important piece of equipment you will
            choose. There are lot of affordable options.. Make sure it’s
            correctly plugged in and 6-12 inches (15-30 cm) from you.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Make a studio.
          </Box>
          <Box>
            Clean up your background and arrange props. Almost any small space
            can be transformed with a backdrop made of colored paper or an
            ironed bed sheet.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Light the scene and your face.
          </Box>
          <Box>
            Turn off overhead lights. Experiment with three point lighting by
            placing two lamps in front of you and one behind aimed on the
            background.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Reduce noise and echo.
          </Box>
          <Box>
            Turn off fans or air vents, and record at a time when it’s quiet.
            Place acoustic foam or blankets on the walls, and bring in rugs or
            furniture to dampen echo.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Be creative.
          </Box>
          <Box>
            Students won’t see behind the scenes. No one will know if you’re
            surrounded by pillows for soundproofing...unless you tell other
            instructors in the community!
          </Box>
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" gutterBottom mt={0}>
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h5"
            gutterBottom
            component="div"
            mb={2}
          >
            Requirements
          </Typography>

          <Box>
            <ul>
              <li>
                Film and export in HD to create videos of at least 720p, or
                1080p if possible
              </li>
              <li>
                Audio should come out of both the left and right channels and be
                synced to your video
              </li>
              <li>
                Audio should be free of echo and background noise so as not to
                be distracting to students
              </li>
            </ul>
          </Box>
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" gutterBottom mt={0}>
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h5"
            gutterBottom
            component="div"
            mb={2}
          >
            Resources
          </Typography>

          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            <Link to="/">Teaching Center: Guide to equipment</Link>
          </Box>
          <Box>Make a home studio on a budget</Box>

          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            <Link to="/">Udemy Trust & Safety</Link>
          </Box>
          <Box>Our policies for instructors and students</Box>

          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            <Link to="/">Join the community</Link>
          </Box>
          <Box>A place to talk with other instructors</Box>
        </Typography>
      </Box>
    </Box>
  );
}
