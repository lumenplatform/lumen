import { Button, Chip, Skeleton, Typography, useTheme, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getAttemptsByQuizId, getQuizById } from '../../../api';
import { ArrowBack } from '@mui/icons-material';


export default function Attempts() {
    const theme = useTheme();
    const navigate = useNavigate();
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

    if (isLoading || isError)
        return <Skeleton></Skeleton>;

    return (
        <Box>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(`/manage/courses/${courseId}`)}
                color="inherit"
            >
                Back to Course
            </Button>
            <Typography variant="h6" sx={{ my: theme.spacing(2) }} component="div">
               Attempts - {examData?.settings.title}
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: theme.spacing(3) }}>User</TableCell>
                            <TableCell>Attempted On</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Marks</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attemptData.map((row: any) => (
                            <TableRow key={row.enrollmentId}>
                                <TableCell sx={{ pl: theme.spacing(3) }}>
                                    <Typography variant="body2">{row.user.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{row.startedAt}</Typography>
                                </TableCell>
                                <TableCell>
                                    {row.markingStatus == 'MARKED' ?
                                        <Chip label='Marked' color="success" size="small" variant="outlined" sx={{ width: 100 }} />
                                        : <Chip label='Not Marked' color="warning" size="small" variant="outlined" sx={{ width: 100 }} />
                                    }
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{row.marks}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        startIcon={<RemoveRedEyeOutlinedIcon />}
                                        onClick={() => {
                                            navigate(`/manage/courses/${courseId}/exam/${examId}/attempt/${row.id}`);
                                        }}
                                    >
                                        View
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
