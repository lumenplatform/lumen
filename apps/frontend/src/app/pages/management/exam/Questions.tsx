import { ArrowBack } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Box, Button, Chip, Skeleton, Typography, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getAttemptsByQuizId, getQuizById } from '../../../api';

export default function Questions() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState<any>([]);
    const { courseId, examId } = useParams();
    const {
        data: attemptData,
        isLoading,
        isError } = useQuery(['exam-attempts', examId], () => getAttemptsByQuizId(courseId!, examId!));

    const {
        data: examData,
        isLoading: isExamLoading,
        isError: isExamError,
    } = useQuery(['exam', examId], () => getQuizById(courseId!, examId!));

    useEffect(() => {
        if (attemptData) {
            const s = attemptData.map((attempt: any) => attempt.submission).flat();
            console.log(s)
            setSubmissions([...s]);
        }
    }, [attemptData]);

    if (isLoading || isError || isExamLoading || isExamError)
        return <Skeleton></Skeleton>;

    console.log(examData.questions);
    console.log(attemptData);
    return (
        <Box>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(`/manage/courses/${courseId}/exam/${examId}/attempts`)}
                color="inherit"
            >
                Back to Attempts
            </Button>
            <Typography variant="h6" sx={{ my: theme.spacing(2) }} component="div">
                Attempts - {examData?.settings.title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                    endIcon={<DoneAllIcon />}
                    onClick={() => navigate(`/manage/courses/${courseId}/exam/${examId}/questions`)}
                    disabled={submissions.some((e: any) => e.markingStatus == 'NOT_MARKED' )}
                >
                    Release All
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Marked</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {examData.questions.map((row: any, index: number) => (
                            <TableRow>
                                <TableCell sx={{ pl: theme.spacing(3) }}>
                                    <Typography variant="body2">Question {index + 1}</Typography>
                                </TableCell>
                                <TableCell>
                                    {submissions.some((e: any) => e.markingStatus == 'NOT_MARKED' && e.question == row.id) ?
                                        <Chip label='Not Marked' color="warning" size="small" variant="outlined" sx={{ width: 100 }} />
                                        : <Chip label='Marked' color="success" size="small" variant="outlined" sx={{ width: 100 }} />

                                    }
                                </TableCell>
                                <TableCell>
                                    {submissions.reduce((acc: number, curr: any) => acc + (curr.question == row.id && curr.markingStatus=='MARKED'? 1 : 0), 0)}
                                    /
                                    {attemptData.length}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        endIcon={<CheckIcon />}
                                        onClick={() => {
                                            navigate(`/manage/courses/${courseId}/exam/${examId}/attempt/${row.id}`);
                                        }}
                                    >
                                        Mark
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        /> */}
            </TableContainer>
        </Box>

    );
}
