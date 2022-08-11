import { Box, Button, Container, Divider, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { createNewQuiz, updateQuiz, getQuizById } from '../../../api';
import ExamCreate, { Questions } from './ExamCreate';
import ExamSettings, { Settings, defaultSettings } from './ExamSettings';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

type Exam = {
    examId?: string;
    course: string;
    settings: any;
    questions?: Questions[];
}

export default function ExamPage() {
    console.log('ExamPage');
    const { examId, courseId } = useParams();
    const [value, setValue] = React.useState(0);
    const [exam, setExam] = React.useState<Exam>({ settings: {}, questions: [], course: 'harum-eum-similique' });
    const examCreateMutation = useMutation(createNewQuiz);
    const examUpdateMutation = useMutation(updateQuiz);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setExam({ ...exam});
    };

    const {
        data: examData,
    } = useQuery(['courses', courseId], () => getQuizById(courseId!, examId ?? ''));

    React.useEffect(() => {
        if (examData) {
            setExam(examData);
        }
    }, [examData]);

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
                    <Box sx={{ display: value === 0? 'block': 'none' , ml:2,mt:2}}>
                        <ExamCreate examQuestions={exam.questions} changeQuestions={handleQusetionsChange} />
                    </Box>
                    <Box sx={{ display: value === 1? 'block': 'none' , ml:2,mt:2}}>
                        <ExamSettings examSettings={exam.settings} changeSettings={handleSettingsChange} />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
} 