import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

function CourseLandingPage() {
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
            Course landing page
          </Typography>
        </CardContent>

        <CardContent>
          <Box
            sx={{
              '& .MuiTextField-root': { mt: 2, mb: 2, width: '100%' },
            }}
          >
            <TextField
              required
              id="objective-1"
              label="Course title"
              variant="outlined"
            />
            <TextField
              required
              id="objective-1"
              label="Course subtitle"
              variant="outlined"
            />
            <TextField
              required
              id="objective-1"
              label="Course description"
              variant="outlined"
              multiline
              rows={4}
            />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="language">Language</InputLabel>
                  <Select
                    labelId="language"
                    id="language"
                    // value={age}
                    label="Language"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="level">Level</InputLabel>
                  <Select
                    labelId="level"
                    id="level"
                    // value={age}
                    label="Level"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    // value={age}
                    label="Category"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  id="objective-1"
                  label="What is priliminary taught in course?"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom>
                  <Box sx={{ fontWeight: 'bold' }}>Course Image</Box>
                </Typography>

                <Card sx={{ maxWidth: '100%' }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://s.udemycdn.com/course/750x422/placeholder.jpg"
                    alt="Paella dish"
                  />
                </Card>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom mt={3}>
                  <Box>
                    Upload your course image here. It must meet our course image
                    quality standards to be accepted. Important guidelines:
                    750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the
                    image.
                  </Box>
                </Typography>

                <input type="file" id="myFile" name="filename" />
                <input type="submit"></input>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom>
                  <Box sx={{ fontWeight: 'bold' }}>Promotianal video</Box>
                </Typography>

                <Card sx={{ maxWidth: '100%' }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://s.udemycdn.com/course/750x422/placeholder.jpg"
                    alt="Paella dish"
                  />
                </Card>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom mt={3}>
                  <Box>
                    Students who watch a well-made promo video are 5X more
                    likely to enroll in your course. We've seen that statistic
                    go up to 10X for exceptionally awesome videos. Learn how to
                    make yours awesome!
                  </Box>
                </Typography>

                <input type="file" id="myFile" name="filename" />
                <input type="submit"></input>
              </Grid>
            </Grid>
            <Typography variant="body1" gutterBottom mt={2}>
              <Box sx={{ fontWeight: 'bold' }}>Instructors profile(s)</Box>
            </Typography>

            <CardHeader
              avatar={
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              }
              title="Profile Name"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function Pricing() {
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
            Pricing
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body1" gutterBottom mt={0}>
            <Box sx={{ fontWeight: 'bold' }}>Course Price Tier</Box>
            <Box>
              Please select the price tier for your course below and click
              'Save'. The list price that students will see in other currencies
              is determined using the price tier matrix. If you intend to offer
              your course for free, the total length of video content must be
              less than 2 hours.
            </Box>
          </Typography>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={8}>
              <Grid container>
                <Grid xs={2} m={1}>
                  <FormControl fullWidth>
                    <Select
                      id="category"
                      // value={age}
                      displayEmpty
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>USD</MenuItem>
                      <MenuItem value={20}>LKR</MenuItem>
                      <MenuItem value={30}>IDR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={4} m={1}>
                  <FormControl fullWidth>
                    <InputLabel id="tier">Tier</InputLabel>
                    <Select
                      labelId="tier"
                      id="tier"
                      // value={age}
                      label="Tier"
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Free</MenuItem>
                      <MenuItem value={20}>10</MenuItem>
                      <MenuItem value={30}>20</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={2} m={1}>
                  <Button variant="contained" sx={{ height: '100%' }}>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

function Promotions() {
  return <Box>implement promotion section here</Box>;
}

function CourseMessage() {
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
            Course messages
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body1" gutterBottom mt={0}>
            <Box>
              Write messages to your students (optional) that will be sent
              automatically when they join or complete your course to encourage
              students to engage with course content. If you do not wish to send
              a welcome or congratulations message, leave the text box blank.
            </Box>
          </Typography>
          <Box
            sx={{
              '& .MuiTextField-root': { mt: 2, mb: 2, width: '100%' },
            }}
          >
            <TextField
              id="objective-1"
              label="Welcome Message"
              variant="outlined"
              multiline
              rows={4}
            />
            <TextField
              id="objective-1"
              label="Congratulations Message"
              variant="outlined"
              multiline
              rows={4}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export function PublishCourse() {
  return (
    <Box>
      <CourseLandingPage />
      <Pricing />
      <Promotions />
      <CourseMessage />
    </Box>
  );
}
