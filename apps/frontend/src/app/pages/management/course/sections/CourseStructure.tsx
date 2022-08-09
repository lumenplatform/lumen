import {
  Box,
  Button, Grid,
  Paper, Typography
} from '@mui/material';

//Course structure

export function CourseStructure() {
  return (
    <Box sx={{ px: 3 }}>
      <Box sx={{ p: 2, backgroundColor: '#f7f9fa' }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="body1" gutterBottom mt={0}>
              <Box sx={{ fontWeight: 'bold' }}>
                There's a course in you. Plan it out.
              </Box>
              <Box mt={2}>
                You must enter at least 4 learning objectives or outcomes that
                learners can expect to achieve after completing your course.
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
                  Our library of resources
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  Tips and guides to structuring a course students love
                </Box>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  <Button variant="outlined">Teaching Center</Button>
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

          <Box sx={{ fontWeight: 'bold' }}>Start with your goals.</Box>
          <Box>
            Setting goals for what learners will accomplish in your course (also
            known as learning objectives) at the beginning will help you
            determine what content to include in your course and how you will
            teach the content to help your learners achieve the goals.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Create an outline.
          </Box>
          <Box>
            Decide what skills you’ll teach and how you’ll teach them. Group
            related lectures into sections. Each section should have at least 3
            lectures, and include at least one assignment or practical activity.
            Learn more.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Introduce yourself and create momentum.
          </Box>
          <Box>
            People online want to start learning quickly. Make an introduction
            section that gives learners something to be excited about in the
            first 10 minutes.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Sections have a clear learning objective.
          </Box>
          <Box>
            Introduce each section by describing the section's goal and why it’s
            important. Give lectures and sections titles that reflect their
            content and have a logical flow.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Lectures cover one concept.
          </Box>
          <Box>
            A good lecture length is 2-7 minutes to keep students interested and
            help them study in short bursts. Cover a single topic in each
            lecture so learners can easily find and re-watch them later.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Mix and match your lecture types.
          </Box>
          <Box>
            Alternate between filming yourself, your screen, and slides or other
            visuals. Showing yourself can help learners feel connected.
          </Box>
          <Box sx={{ fontWeight: 'bold' }} mt={2}>
            Practice activities create hands-on learning.
          </Box>
          <Box>
            Help learners apply your lessons to their real world with projects,
            assignments, coding exercises, or worksheets.
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
              <li>See the complete list of course quality requirements</li>
              <li>Your course must have at least five lectures</li>
              <li>
                All lectures must add up to at least 30+ minutes of total video
              </li>
              <li>
                Your course is composed of valuable educational content and free
                of promotional or distracting materials
              </li>
            </ul>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
