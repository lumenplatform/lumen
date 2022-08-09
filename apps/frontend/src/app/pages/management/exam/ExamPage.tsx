import { Box, Button, Container, Divider, Tab, Tabs, Typography } from '@mui/material';
import * as React from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { createNewExam, updateExam } from '../../../api';
import ExamCreate, { Questions } from './ExamCreate';
import ExamSettings, { Settings, defaultSettings } from './ExamSettings';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type Exam = {
    examId?: string;
    course: string;
    settings: Settings;
    questions?: Questions[];
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

    const { examId, courseId } = useParams();
    const [value, setValue] = React.useState(0);
    const [exam, setExam] = React.useState<Exam>({ settings: defaultSettings, questions: [], course: 'harum-eum-similique' });
    const examCreateMutation = useMutation(createNewExam);
    const examUpdateMutation = useMutation(updateExam);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        console.log(exam);
    }, [exam]);

    const handleQusetionsChange = (questions: any[]) => {
        setExam({ ...exam, questions: questions });
    }

    const handleSettingsChange = (settings: any) => {
        setExam({ ...exam, settings: settings });
    }




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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h4">
                                {exam.settings?.title || 'Exam Title'}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (examId) {
                                        examUpdateMutation.mutate({ examId: examId, form: exam });
                                    } else {
                                        examCreateMutation.mutate({ form: exam });
                                    }
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ExamCreate examQuestions={exam.questions} changeQuestions={handleQusetionsChange} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ExamSettings changeSettings={handleSettingsChange} />
                    </TabPanel>
                </Box>
            </Box>
        </Container>
    );
} 