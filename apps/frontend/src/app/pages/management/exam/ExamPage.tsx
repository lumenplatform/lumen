import { ArrowBack } from '@mui/icons-material';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { Box, Button, CircularProgress, Container, Divider, Stack, Tab, Tabs, Toolbar, Typography, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { createNewQuiz, getAttemptsByQuizId, getQuizById, updateQuiz } from '../../../api';
import ExamCreate, { Questions } from './ExamCreate';
import ExamSettings, { defaultSettings } from './ExamSettings';


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

export function ConfirmationDialog(props: any) {
    const { open, setOpen, saveExam } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        saveExam();
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Update a quiz with exisitng attempts"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    There are existing attempts for this exam. If you change the settings, all attempts will be revaluated.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Disagree
                </Button>
                <Button onClick={handleClickOpen} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default function ExamPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { examId, courseId } = useParams();
    const [open, setOpen] = React.useState(false);
    const [examChanged, setExamChanged] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [exam, setExam] = React.useState<Exam>({ settings: defaultSettings, questions: [], course: courseId! });
    const { data: newExamId, mutate: examCreateMutation, isLoading: examUploading, isSuccess: examUploaded } = useMutation(createNewQuiz);
    const { mutate: examUpdateMutation, isLoading: examUpdating, isSuccess: examUpdated } = useMutation(updateQuiz);


    React.useEffect(() => {
        if (newExamId) {
            navigate(`/manage/courses/${courseId}/exam/${newExamId}`);
        }
    }, [newExamId]);

    const handleSave = () => {
        console.log("gello");
        if (examId)
            examUpdateMutation({ examId: examId, form: exam });
        else
            examCreateMutation({ form: exam });
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setExam({ ...exam });
    };

    const {
        data: examData,
        refetch: refetchExam,
    } = useQuery(['exam', courseId, examId], () => getQuizById(courseId!, examId ?? ''));

    const {
        data: attemptData,
        isLoading: attemptsLoading,
        isError: attemptsError,
        refetch: refetchAttempts,
    } = useQuery(['exam-attempts', examId], () => getAttemptsByQuizId(courseId!, examId ?? ''));


    React.useEffect(() => {
        if (examData) {
            setExam(examData);
        }
    }, [examData]);

    React.useEffect(() => {
        console.log(exam);
        console.log(examData);
        if (JSON.stringify(exam) !== JSON.stringify(examData)) {
            setExamChanged(true);
        } else {
            setExamChanged(false);
        }
    }, [exam]);

    React.useEffect(() => {
        if (examUpdated) {
            setExamChanged(false);
            refetchExam();
        }
    }, [examUpdated]);


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
                    {examChanged &&
                        <Stack
                            direction="row"
                            spacing={0}
                            alignItems="center"
                            sx={{ mr: 2 }}
                        >
                            <ReportGmailerrorredOutlinedIcon color="warning" />
                            <Typography variant="body2" color="warning">
                                Changes unsaved
                            </Typography>
                        </Stack>
                    }
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (examId && attemptData?.length > 0)
                                setOpen(true);
                            else
                                handleSave();
                        }}
                    >
                        {(examUploading || examUpdating) ? 'Saving...' : 'Save'}
                        {(examUploading || examUpdating) && <CircularProgress size={25} sx={{ color: 'white', ml: 1 }} />}
                    </Button>
                </Toolbar>
                <ConfirmationDialog open={open} setOpen={setOpen} saveExam={handleSave} />
                <Box sx={{ display: 'flex', }}>
                    <Box sx={{ mt: 3 }}>
                        <Tabs value={value} onChange={handleChange} orientation="vertical" sx={{ minWidth: 'max-content' }}>
                            <Tab label="Exam Settings" {...a11yProps(0)} />
                            <Tab label="Exam Questions" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <Box sx={{ width: '100%', ml: 2, px: 2 }}>
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