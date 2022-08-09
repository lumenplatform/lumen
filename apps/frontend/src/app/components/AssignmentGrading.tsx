import {
    Box,
    Grid,
    TextField,
    Typography,
    Button
  } from '@mui/material';
  import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
  import { useState } from 'react';
  import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import '../../../styles.css';
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell, { tableCellClasses } from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';
  import TableFooter from '@mui/material/TableFooter';
  
  
  function createData(
    name: number,
    calories: string,
    carbs: number,
  
  ) {
    return { name, calories, carbs };
  }
  
  const rows = [
    createData(1,'Correct',12 ),
    createData(2,'Incorrect',0 ),
    createData(3,'Correct',12 ),
    createData(4,'Incorrect',0 ),
  
  ];
  
  export default function BasicTable() {
    return (
      
      <>
        <Grid container spacing={7}>
          <Grid item xs={8}>
            <Box sx={{ maxWidth: 'sx', px: 3 }}>
              <Typography variant="h5" lineHeight={1}>
                Assignment Grades  
              </Typography>
            </Box>
          </Grid>
        </Grid>
  
        <Grid sx={{ maxWidth: 'sx', px: 3, marginTop: '1em' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell align="right">Status</TableCell>              
                  <TableCell align="right">Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>               
                  </TableRow>            
                ))}
              </TableBody>
              <TableFooter>
                <TableCell><Typography variant="h6" lineHeight={1}>Total</Typography></TableCell>
                <TableCell></TableCell>
                <TableCell align="right"><Typography variant="h6" lineHeight={1}>24</Typography></TableCell>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
        
        </>  
    );
  }
  
  export function DatePickerDemo() {
    const [value, setValue] = useState<Date | null>(new Date());
  
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }
  
  
  