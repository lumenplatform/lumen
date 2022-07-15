import { Box } from "@mui/material";
import CoursePlan from "./CoursePlan/CoursePlan";
import { CreateContent } from "./CreateContent/CreateContent";
import { PublishCourse } from "./PublishCourse/PublishCourse";


export default function CourseCreate() {
    return (<Box>
        **this is the course plan section
        <CoursePlan />
        **this is the create content section
        <CreateContent />
        **this is the publish course section
        <PublishCourse />
    </Box>);
}