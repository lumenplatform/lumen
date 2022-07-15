import { Box } from "@mui/system";

function FilmAndEdit() {
    return (
        <Box>
            implement film and edit here
        </Box>
    );
}

function Curriculum() {
    return (
        <Box>
            implement curriculum here
        </Box>
    )
}

function Captions() {
    return (
        <Box>
            implement captions here
        </Box>
    )
}

export function CreateContent() {
    return (
        <Box>
            <FilmAndEdit/>
            <Curriculum/>
            <Captions/>
        </Box>
    );
}