import React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

function SubmissionStatus(){
    return(
        <div>
        <TableContainer component={Paper}>
     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
        
           <TableCell sx={{height:70}}>Submission status</TableCell>
           <TableCell><Typography >submitted for grading</Typography></TableCell>

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>Grading Status</TableCell>
          <TableCell><Typography >Not graded</Typography></TableCell> 

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>Due date</TableCell>
           <TableCell><Typography >Thursday</Typography></TableCell>

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>Time remaining</TableCell>
           <TableCell><Typography >Assignmnet was submitted 2 hours 6 mins early</Typography></TableCell>
        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>Last modified</TableCell>
          <TableCell> <Typography > Thursday</Typography></TableCell>

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>File submission</TableCell>
           <TableCell> <Typography >-</Typography></TableCell>

        </TableRow>
     </TableHead>
     <TableHead>
        <TableRow>
           <TableCell sx={{height:70}}>Submission comments</TableCell>
           <TableCell> <Typography ><BasicPopover></BasicPopover></Typography></TableCell>

        </TableRow>
     </TableHead>
    
     </Table>
     </TableContainer>
        </div>
    );
}
export default SubmissionStatus;

export  function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button  onClick={handleClick}>
      <ArrowRightIcon sx={{color:'black'}}></ArrowRightIcon>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}><TextField
          
          id="filled-disabled"
        
          defaultValue="comments"
          
        /></Typography>
      </Popover>
    </div>
  );
}
