import * as React from 'react';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import {
    Box, 
    Button, 
    Grid, 
    List, 
    TextField, 
    Typography,
    Checkbox,
    Drawer,
    FormGroup,
    FormLabel,
    FormControl,
    FormControlLabel
} from '@mui/material';
import { createContext } from "react";
import CourseCard from '../../components/CourseCard';
import StudentHeader from '../../components/StudentHeader';

const filterContext = createContext<{ showFilter: boolean, setShowFilter: any }>({
    showFilter: false,
    setShowFilter: () => { },
});

function ResponsiveDrawer(props: any) {
    const { showFilter, setShowFilter } = React.useContext(filterContext);
    const [showMore, setShowMore] = React.useState(false);
    const handleDrawerToggle = () => {
        setShowFilter(!showFilter);
    };
    const subjects = ['Business', 'Computer Science', 'Data Science', 'Health'];


    const drawer = (
        <List sx={{ ml: { xs: 3, sm: 0 }, mt: { xs: 3 } }}>
            <Typography variant="h6" >
                Filter By
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 4 }}>
                <FormLabel component="legend">
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Subject</Typography>
                </FormLabel>
                <FormGroup>
                    {
                        subjects.slice(0, showMore ? subjects.length : 2).map((text, index) => (
                            <FormControlLabel control={<Checkbox />} label={text} />
                        ))}
                </FormGroup>
                <Button variant="text" onClick={() => setShowMore(!showMore)}>{showMore ? 'Show less' : 'Show more'}</Button>
            </FormControl>

        </List>
    );


    return (
        <Box sx={{ position: 'relative', height: '100vh', border: 0 }}>

            <Drawer
                variant="temporary"
                open={showFilter}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-root': {
                        position: 'absolute',
                        border: 0
                    },
                    '& .MuiPaper-root': {
                        position: 'absolute',
                        border: 0,
                        width: 240,
                    },
                    display: { xs: 'flex', sm: 'none' },
                    border: 0,
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    '& .MuiDrawer-root': {
                        position: 'absolute',
                        border: 0
                    },
                    '& .MuiPaper-root': {
                        position: 'absolute',
                        border: 0,
                    },
                    display: { xs: 'none', sm: 'flex' },
                    border: 0,
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default function SearchPage() {
    const [showFilter, setShowFilter] = React.useState(false);

    return (
        <div>
            <StudentHeader />
            <Box sx={{ maxWidth: '1440px', px: 3 }}>
                <Box sx={{ display: 'flex', margin: '0 auto' }}>
                    <Box sx={{ width: { sm: '200px' } }}>
                        <filterContext.Provider value={{ showFilter, setShowFilter }}>
                            <ResponsiveDrawer />
                        </filterContext.Provider>
                    </Box>
                    <Box sx={{ flex: 1, mr: { sm: 0, md: 5, lg: 10 }, }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', mt: 0, mb: 4, width: { sm: '70%', md: '50%' } }}>
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField label="Search Courses" variant="standard" fullWidth color="primary" sx={{ mr: 2 }} />
                            <Button startIcon={<TuneIcon />} sx={{ display: { xs: 'flex', sm: 'none' }, px: 3 }} onClick={() => setShowFilter(!showFilter)}>
                                Filters
                            </Button>
                        </Box>
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <CourseCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <CourseCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <CourseCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <CourseCard />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </div >
    );
}
