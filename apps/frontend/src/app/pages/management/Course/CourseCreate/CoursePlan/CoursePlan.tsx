import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

//Plan your course

//Intended learners
function IntendedLeraners() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h4"
            gutterBottom
            component="div"
          >
            Intended learners
          </Typography>
          <Typography variant="body1" gutterBottom>
            The following descriptions will be publicly visible on your Course
            Landing Page and will have a direct impact on your course
            performance. These descriptions will help learners decide if your
            course is right for them.
          </Typography>
        </CardContent>

        <CardContent>
          <Typography variant="body1" gutterBottom mt={0}>
            <Box sx={{ fontWeight: 'bold' }}>
              What will students learn in your course?
            </Box>
            <Box>
              You must enter at least 4 learning objectives or outcomes that
              learners can expect to achieve after completing your course.
            </Box>
          </Typography>
          <Box
            mt={2}
            sx={{
              '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' },
            }}
          >
            <TextField
              required
              id="objective-1"
              variant="outlined"
              placeholder="Example: Define the roles and responsibilities of a project"
            />
            <TextField
              required
              id="objective-2"
              variant="outlined"
              placeholder="Example: Define the roles and responsibilities of a project"
            />
            <TextField
              required
              id="objective-3"
              variant="outlined"
              placeholder="Example: Define the roles and responsibilities of a project"
            />
            <TextField
              required
              id="objective-4"
              variant="outlined"
              placeholder="Example: Define the roles and responsibilities of a project"
            />
          </Box>

          <CardActions>
            <Button size="small">+ Add more to your response</Button>
          </CardActions>
        </CardContent>

        <CardContent>
          <Typography variant="body1" gutterBottom mt={0}>
            <Box sx={{ fontWeight: 'bold' }}>
              What are the requirements or prerequisites for taking your course?
            </Box>
            <Box>
              List the required skills, experience, tools or equipment learners
              should have prior to taking your course. If there are no
              requirements, use this space as an opportunity to lower the
              barrier for beginners.
            </Box>
            <Box
              mt={2}
              sx={{
                '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' },
              }}
            >
              <TextField
                required
                id="objective-1"
                variant="outlined"
                placeholder="Example: No programming experience needed. You will learn everything you need to know"
              />
            </Box>
          </Typography>
          <CardActions>
            <Button size="small">+ Add more to your response</Button>
          </CardActions>
        </CardContent>

        <CardContent>
          <Typography variant="body1" gutterBottom mt={0}>
            <Box sx={{ fontWeight: 'bold' }}>Who is this course for?</Box>
            <Box>
              Write a clear description of the intended learners for your course
              who will find your course content valuable. This will help you
              attract the right learners to your course.
            </Box>
            <Box
              mt={2}
              sx={{
                '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' },
              }}
            >
              <TextField
                required
                id="objective-1"
                variant="outlined"
                placeholder="Example: Beginner Python developers curious about data science"
              />
            </Box>
          </Typography>
          <CardActions>
            <Button size="small">+ Add more to your response</Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}

//Course structure
function CourseStructure() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h4"
            gutterBottom
            component="div"
          >
            Course Structure
          </Typography>
        </CardContent>
        <CardContent style={{ backgroundColor: '#f7f9fa' }}>
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

            <Box sx={{ fontWeight: 'bold' }}>Start with your goals.</Box>
            <Box>
              Setting goals for what learners will accomplish in your course
              (also known as learning objectives) at the beginning will help you
              determine what content to include in your course and how you will
              teach the content to help your learners achieve the goals.
            </Box>
            <Box sx={{ fontWeight: 'bold' }} mt={2}>
              Create an outline.
            </Box>
            <Box>
              Decide what skills you’ll teach and how you’ll teach them. Group
              related lectures into sections. Each section should have at least
              3 lectures, and include at least one assignment or practical
              activity. Learn more.
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
              Introduce each section by describing the section's goal and why
              it’s important. Give lectures and sections titles that reflect
              their content and have a logical flow.
            </Box>
            <Box sx={{ fontWeight: 'bold' }} mt={2}>
              Lectures cover one concept.
            </Box>
            <Box>
              A good lecture length is 2-7 minutes to keep students interested
              and help them study in short bursts. Cover a single topic in each
              lecture so learners can easily find and re-watch them later.
            </Box>
            <Box sx={{ fontWeight: 'bold' }} mt={2}>
              Mix and match your lecture types.
            </Box>
            <Box>
              Alternate between filming yourself, your screen, and slides or
              other visuals. Showing yourself can help learners feel connected.
            </Box>
            <Box sx={{ fontWeight: 'bold' }} mt={2}>
              Practice activities create hands-on learning.
            </Box>
            <Box>
              Help learners apply your lessons to their real world with
              projects, assignments, coding exercises, or worksheets.
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
                <li>See the complete list of course quality requirements</li>
                <li>Your course must have at least five lectures</li>
                <li>
                  All lectures must add up to at least 30+ minutes of total
                  video
                </li>
                <li>
                  Your course is composed of valuable educational content and
                  free of promotional or distracting materials
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
              <Link to="/">Udemy Trust & Safety</Link>
            </Box>
            <Box>Our policies for instructors and students</Box>

            <Box sx={{ fontWeight: 'bold' }} mt={2}>
              <Link to="/">Join the instructor community</Link>
            </Box>
            <Box>A place to connect with other instructors</Box>

            <Box sx={{ fontWeight: 'bold' }} mt={2}>
              <Link to="/">
                Official Udemy Course: How to Create an Online Course
              </Link>
            </Box>
            <Box>
              Learn about course creation from the Udemy Instructor Team and
              experienced instructors
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

//Setup & test video
function SetupAndTestVideo() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h4"
            gutterBottom
            component="div"
          >
            Setup & test video
          </Typography>
        </CardContent>
        <CardContent style={{ backgroundColor: '#f7f9fa' }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="body1" gutterBottom mt={0}>
                <Box sx={{ fontWeight: 'bold' }}>
                  Arrange your ideal studio and get early feedback
                </Box>
                <Box mt={2}>
                  It's important to get your audio and video set up correctly
                  now, because it's much more difficult to fix your videos after
                  you’ve recorded. There are many creative ways to use what you
                  have to create professional looking video.
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
              A good microphone is the most important piece of equipment you
              will choose. There are lot of affordable options.. Make sure it’s
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
                  Audio should come out of both the left and right channels and
                  be synced to your video
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
        </CardContent>
      </Card>
    </Box>
  );
}

export default function CoursePlan() {
  return (
    <Box>
      <IntendedLeraners />
      <CourseStructure />
      <SetupAndTestVideo />
    </Box>
  );
}
