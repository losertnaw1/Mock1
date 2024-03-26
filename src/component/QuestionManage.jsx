import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const QuestionManage = ({questions}) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Created at</TableCell>
                    <TableCell align="right">Updated at</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {questions.map((q) => (
                    <TableRow
                    key={q.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {q.id}
                    </TableCell>
                    <TableCell align="right">{q.title}</TableCell>
                    <TableCell align="right">{q.createdAt}</TableCell>
                    <TableCell align="right">{q.updatedAt}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default QuestionManage;