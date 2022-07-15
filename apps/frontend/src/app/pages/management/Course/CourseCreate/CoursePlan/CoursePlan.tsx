import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";

//Plan your course

//Intended learners
function IntendedLeraners() {
    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h4" gutterBottom component="div">
                        Intended learners
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        The following descriptions will be publicly visible on your Course Landing Page and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.
                    </Typography>

                </CardContent>

                <CardContent>
                    <Typography variant="body1" gutterBottom mt={0}>
                        <Box sx={{ fontWeight: 'bold' }}>What will students learn in your course?</Box>
                        <Box>
                            You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.
                        </Box>
                    </Typography>
                    <Box mt={2} sx={{
                        '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' },
                    }}>
                        <TextField required id="objective-1" variant="outlined" placeholder="Example: Define the roles and responsibilities of a project" />
                        <TextField required id="objective-2" variant="outlined" placeholder="Example: Define the roles and responsibilities of a project" />
                        <TextField required id="objective-3" variant="outlined" placeholder="Example: Define the roles and responsibilities of a project" />
                        <TextField required id="objective-4" variant="outlined" placeholder="Example: Define the roles and responsibilities of a project" />

                    </Box>

                    <CardActions>
                        <Button size="small">+ Add more to your response</Button>
                    </CardActions>
                </CardContent>

                <CardContent>
                    <Typography variant="body1" gutterBottom mt={0}>
                        <Box sx={{ fontWeight: 'bold' }}>What are the requirements or prerequisites for taking your course?</Box>
                        <Box>
                            List the required skills, experience, tools or equipment learners should have prior to taking your course.
                            If there are no requirements, use this space as an opportunity to lower the barrier for beginners.
                        </Box>
                        <Box mt={2} sx={{
                            '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' },
                        }}>
                            <TextField required id="objective-1" variant="outlined" placeholder="Example: No programming experience needed. You will learn everything you need to know" />

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
                            Write a clear description of the intended learners for your course who will find your course content valuable.
                            This will help you attract the right learners to your course.
                        </Box>
                        <Box mt={2} sx={{
                            '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' },
                        }}>
                            <TextField required id="objective-1" variant="outlined" placeholder="Example: Beginner Python developers curious about data science" />

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
        <div>
            implement course structure
        </div>
    );
}

//Setup & test video
function SetupAndTestVideo() {
    return (
        <div>
            implement setup and test video here
        </div>
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