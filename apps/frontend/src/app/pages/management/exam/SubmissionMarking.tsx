import CheckIcon from '@mui/icons-material/Check';
import {
    Button,
    Card,
    Divider,
    InputAdornment,
    Skeleton,
    Stack, TextField
} from '@mui/material';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubmissionById, getSubmissionsByQuestionId, markSubmssion } from '../../../api';
import EssayQ from '../../../components/EssayQuiz';
import MCQ from '../../../components/MCQQuiz';

function MarkingBox(props: any) {
    const { markEnabled, maxMarks, submissionId, marks = 0 } = props;
    const [marksInput, setMarksInput] = useState(marks);
    const { courseId, examId, attemptId } = useParams();
    const { mutate: submissionMarkMutation } = useMutation(markSubmssion);
    const mark = (mark: number) => {
        submissionMarkMutation({
            quizId: examId,
            courseId: courseId,
            attemptId: attemptId,
            submissionId: submissionId,
            mark: { submissionId: submissionId, marks: mark },
        });
    };

    return (
        <Box sx={{ m: 2, display: 'flex', justifyContent: 'end' }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle1"> marks : </Typography>
                <TextField
                    size="small"
                    disabled={!markEnabled}
                    defaultValue={marksInput}
                    type="number"
                    sx={{ width: '10ch', mr: 2 }}
                    InputProps={{
                        inputProps: { min: 0, max: maxMarks },
                        endAdornment: (
                            <InputAdornment position="end">/{maxMarks}</InputAdornment>
                        ),
                    }}
                    onChange={(e) => setMarksInput(parseInt(e.target.value))}
                />
                <Button endIcon={<CheckIcon />} onClick={() => mark(marksInput)}>
                    Save
                </Button>
            </Stack>
        </Box>
    );
}



export default function SubmissionMarking(props: any) {

    const { index, noOfQuestions } = props;
    const { courseId, examId, questionId, submissionId } = useParams();
    const navigate = useNavigate();
    const {
        data: submissions,
        isLoading: isSubmissionsLoading,
        isError: isSubmissionsError,
    } = useQuery(['exam', examId, 'question', questionId], () => getSubmissionsByQuestionId(courseId!, examId!, questionId!));

    const {
        data: submission,
        isLoading: isSubmissionLoading,
        isError: isSubmissionError,
    } = useQuery(['submission', submissionId], () => getSubmissionById(courseId!, examId!, submissionId!));

    useEffect(() => {
        if (submissions)
            navigate(`/manage/courses/${courseId}/exam/${examId}/question/${questionId}/submission/${submissions[0].id}`);
    }, [submissions]);

    if (isSubmissionsLoading || isSubmissionLoading) {
        return <Skeleton />;
    }

    const submissionIndex = submissions?.findIndex((s:any) => s.id === submissionId);

    return (
        <Box sx={{ mb: 5 }}>
            {<Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ minWidth: 800 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
                        &nbsp;|&nbsp;
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" sx={{ lineHeight: 1 }}>{submission.attempt.user.name}</Typography>
                            <Typography variant="caption" sx={{ lineHeight: 1 }}>{submission.attempt.completedAt}</Typography>
                        </Box>
                    </Box>
                    <Stack>
                        {submission.question.type == 'essay' && (
                            <Card sx={{ marginTop: 2 }}>
                                <EssayQ
                                    index={index + 1}
                                    noOfQuestions={noOfQuestions}
                                    questionId={submission.question.id}
                                    question={submission.question.question}
                                    answer={submission.essayAnswer}
                                    disabled={true}
                                />
                                <Divider />
                                <MarkingBox
                                    markEnabled={true}
                                    maxMarks={submission.question.marks}
                                    marks={submission.marks}
                                    submissionId={submission.id}
                                />
                            </Card>
                        )}
                        {submission.question.type == 'mcq' && (
                            <Card sx={{ marginTop: 2 }}>
                                <MCQ
                                    index={index + 1}
                                    noOfQuestions={noOfQuestions}
                                    questionId={submission.question.id}
                                    answers={submission.question.answers}
                                    answer={submission.mcqAnswer}
                                    question={submission.question.question}
                                    disabled={true}
                                />
                                <Divider />
                                <MarkingBox
                                    markEnabled={false}
                                    maxMarks={submission.question.marks}
                                    marks={submission.marks}
                                    submissionId={submission.id}
                                />
                            </Card>
                        )}
                    </Stack>
                </Box>
                <Stack spacing={10} sx={{ mt: 5 }}>
                    <Pagination count={submissions.length} variant="outlined" shape="rounded" page={submissionIndex+1} onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                        navigate(`/manage/courses/${courseId}/exam/${examId}/question/${questionId}/submission/${submissions[value - 1].id}`);
                    }} />
                </Stack>
            </Box>}
        </Box>
    );
}
