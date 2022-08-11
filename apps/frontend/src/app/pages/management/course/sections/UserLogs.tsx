import { Container, Typography, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//sample data array with objects containg username,email,enrolled date,course title
const data = [
    { username: 'John Doe', time: '10:00 2022-08-12', ip: '127.0.0.122', application: 'Chrome browser', os: 'Windows 11' },
    { username: 'John Doe', time: '10:00 2022-08-12', ip: '127.0.0.122', application: 'Chrome browser', os: 'Windows 11' },
    { username: 'John Doe', time: '10:00 2022-08-12', ip: '127.0.0.122', application: 'Chrome browser', os: 'Windows 11' },
    { username: 'John Doe', time: '10:00 2022-08-12', ip: '127.0.0.122', application: 'Chrome browser', os: 'Windows 11' },
    { username: 'John Doe', time: '10:00 2022-08-12', ip: '127.0.0.122', application: 'Chrome browser', os: 'Windows 11' },
];
export default function UserLogs() {
    const theme = useTheme();

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: theme.spacing(3) }}>User</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>IP address</TableCell>
                            <TableCell>Application</TableCell>
                            <TableCell>Operating System</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any) => (
                            <TableRow key={row.title}>
                                <TableCell sx={{ pl: theme.spacing(3) }}>
                                    <Typography variant="body2">{row.username}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{row.time}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{row.ip}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{row.application}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{row.os}</Typography>
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
        </Container>
    );
}