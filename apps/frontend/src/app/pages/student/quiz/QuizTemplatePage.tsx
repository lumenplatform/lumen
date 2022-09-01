import { Container, Skeleton, Typography, Box, Toolbar } from "@mui/material";
import { useQuery } from "react-query";
import { Outlet, useParams } from "react-router-dom";
import { getCourseById } from "../../../api";
import HeaderActions from "../../../components/HeaderActions";

export default function QuizTemplatePage(props: any) {
    const { courseId } = useParams();
    const { data: course, isError, isLoading } = useQuery('course', () => getCourseById(courseId!));

    if (isError || isLoading) {
        return <Skeleton></Skeleton>
    }
    return (
        <Box>
            <Toolbar>
                <img src="/assets/icons/logo_horiz.png" style={{ height: '48px' }} />
                <Box sx={{ flexGrow: 1 }}></Box>
                <HeaderActions />
            </Toolbar>
            <Container>
                <Typography variant="h4">
                    {course.title}
                </Typography>
                <Outlet />
            </Container>
        </Box>
    )
}