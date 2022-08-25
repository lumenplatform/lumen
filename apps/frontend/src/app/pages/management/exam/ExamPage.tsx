import { Box, Button, Container, Divider, Skeleton, Tab, Tabs, Typography, CircularProgress, Chip, Toolbar, useTheme } from '@mui/material';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { createNewQuiz, updateQuiz, getQuizById } from '../../../api';
import ExamCreate, { Questions } from './ExamCreate';
import ExamSettings, { Settings, defaultSettings } from './ExamSettings';
import { ArrowBack } from '@mui/icons-material';


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
    questions: Questions[];
}

export default function ExamPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { examId, courseId } = useParams();
    const [value, setValue] = React.useState(0);
    const [exam, setExam] = React.useState<Exam>({ settings: defaultSettings, questions: [], course: courseId! });
    const { data: newExamId, mutate: examCreateMutation, isLoading: uploadingExam } = useMutation(createNewQuiz);
    const { mutate: examUpdateMutation, isLoading: updatingExam } = useMutation(updateQuiz);

    React.useEffect(() => {
        if (newExamId) {
            navigate(`/manage/courses/${courseId}/exam/${newExamId}`);
        }
    }, [newExamId]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setExam({ ...exam });
    };

    const {
        data: examData,
    } = useQuery(['exam', courseId, examId], () => getQuizById(courseId!, examId ?? ''));

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
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Toolbar sx={{ borderBottom: 1, borderColor: theme.palette.divider }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => navigate(`/manage/courses/${courseId}`)}
                        color="inherit"
                    >
                        Back to Course
                    </Button>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            height: '2rem',
                            marginLeft: '8px',
                            alignSelf: 'center',
                            borderWidth: '1px',
                            borderColor: 'black',
                        }}
                    />
                    <Typography mx={3} variant="h6">
                        {exam.settings?.title || 'Exam Title'}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (examId) {
                                examUpdateMutation({ examId: examId, form: exam });
                            } else {
                                examCreateMutation({ form: exam });
                            }
                        }}
                    >
                        {(uploadingExam || updatingExam) ? 'Saving...' : 'Save'}
                        {(uploadingExam || updatingExam) && <CircularProgress size={25} sx={{ color: 'white', ml: 1 }} />}
                    </Button>
                </Toolbar>
                <Box sx={{ display: 'flex', }}>
                    <Box sx={{mt:3}}>
                        <Tabs value={value} onChange={handleChange} orientation="vertical" sx={{ minWidth: 'max-content' }}>
                            <Tab label="Exam Settings" {...a11yProps(0)} />
                            <Tab label="Create exam" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <Box sx={{ width: '100%',ml:2,px:2 }}>
                        <Box sx={{ display: value === 0 ? 'block' : 'none', ml: 2, mt: 2 }}>
                            <ExamSettings examSettings={exam.settings} questions={exam.questions} changeSettings={handleSettingsChange} />
                        </Box>
                        <Box sx={{ display: value === 1 ? 'block' : 'none', ml: 2, mt: 2 }}>
                            <ExamCreate examQuestions={exam.questions} changeQuestions={handleQusetionsChange} isAllQuestionsTimeBoxed={exam.settings.timeBox.isAllQuestions} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
} 