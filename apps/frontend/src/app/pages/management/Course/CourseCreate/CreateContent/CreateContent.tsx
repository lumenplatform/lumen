import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

export function FilmAndEdit() {
  return (
    <Box sx={{ px: 3 }}>
      <CardContent style={{ backgroundColor: '#f7f9fa' }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="body1" gutterBottom mt={0}>
              <Box sx={{ fontWeight: 'bold' }}>
                You’re ready to share your knowledge.
              </Box>
              <Box mt={2}>
                This is your moment! If you’ve structured your course and used
                our guides, you're well prepared for the actual shoot. Pace
                yourself, take time to make it just right, and fine-tune when
                you edit.
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
                  You’re in good company
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  Chat and get production help with other Udemy instructors
                </Box>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  <Button variant="outlined">Join the community</Button>
                </Box>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
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

          <Box sx={{ fontWeight: 'bold' }}>
            Take breaks and review frequently..
          </Box>
          <Box>
            Check often for any changes such as new noises. Be aware of your own
            energy levels--filming can tire you out and that translates to the
            screen.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Build rapport.
          </Box>
          <Box>
            Students want to know who’s teaching them. Even for a course that is
            mostly screencasts, film yourself for your introduction. Or go the
            extra mile and film yourself introducing each section!
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Being on camera takes practice.
          </Box>
          <Box>
            Make eye contact with the camera and speak clearly. Do as many
            retakes as you need to get it right.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Set yourself up for editing success.
          </Box>
          <Box>
            You can edit out long pauses, mistakes, and ums or ahs. Film a few
            extra activities or images that you can add in later to cover those
            cuts.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Create audio marks.
          </Box>
          <Box>
            Clap when you start each take to easily locate the audio spike
            during editing. Use our guides to manage your recording day
            efficiently.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            For screencasts, clean up.
          </Box>
          <Box>
            Move unrelated files and folders off your desktop and open any tabs
            in advance. Make on-screen text at least 24pt and use zooming to
            highlight.
          </Box>
        </Typography>
      </CardContent>
      <CardContent>
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
      </CardContent>

      <CardContent>
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
            <Link to="/">Create a test video</Link>
          </Box>
          <Box>Get feedback before filming your whole course</Box>

          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            <Link to="/">Teaching Center: Guide to quality A/V</Link>
          </Box>
          <Box>Film and edit with confidence</Box>

          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            <Link to="/">Udemy trust & safety</Link>
          </Box>
          <Box>Our policies for instructors and students</Box>
        </Typography>
      </CardContent>
    </Box>
  );
}

function Curriculum() {
  return <Box>implement curriculum here</Box>;
}

export function Captions() {
  return <Box>implement captions here</Box>;
}

export function CreateContent() {
  return (
    <Box>
      <FilmAndEdit />
      <Curriculum />
      <Captions />
    </Box>
  );
}
