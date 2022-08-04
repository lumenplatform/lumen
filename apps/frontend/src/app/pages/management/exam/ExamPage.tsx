import { Typography, Box, Tab, Tabs, Container, Divider } from '@mui/material';
import * as React from 'react';
import ExamCreate from './ExamCreate';
import ExamSettings from './ExamSettings';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type Exam = {
    settings: any;
    questions: any[];
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ExamPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [exam, setExam] = React.useState({});

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex' }}>
                <Box>
                    <Tabs value={value} onChange={handleChange} orientation="vertical" sx={{ minWidth: 'max-content' }}>
                        <Tab label="Create exam" {...a11yProps(0)} />
                        <Tab label="Exam Settings" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ pl: 2 }}>
                        <Typography variant="h4">
                            Exam Title
                        </Typography>
                        <Divider />
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ExamCreate />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ExamSettings />
                    </TabPanel>
                </Box>
            </Box>
        </Container>
    );
}