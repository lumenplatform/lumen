import {
  Box,
  Typography,
} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function Faq(props: any) {
  return (
    <div>
       <Box sx={{ maxWidth: '1440px', px: 1 }}>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography> <b>When will I have access to the lectures and assignments? </b></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        Once you enroll, you’ll have access to all videos and programming assignments.
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography> <b>Do I need to pay for this course?</b></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        No. The lecture videos, exercises, and programming assignments are all available for free.
        </Typography>
      </AccordionDetails>
    </Accordion>
    
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography><b>Can I earn a certificate in this course?</b></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        No. As per Princeton University policy, no certificates, credentials, or reports are awarded in connection with this course.
        </Typography>
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography><b>For whom is this course intended?</b></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        This course is aimed at first-year college students, high school students, and professionals in all fields who are interested in learning basic programming skills. It is a self-contained treatment intended for people with little or no previous experience in programming. It is also appropriate for people who know another programming language but want to learn Java.
        <br />
        At Princeton, over 50% of all undergraduates take the course, including students majoring in engineering, biology, physics, chemistry, economics, and many other fields, not just computer science.
        </Typography>
      </AccordionDetails>
    </Accordion>
    
    <Typography>
    More questions? Visit the <a href=''> Learner Help Center</a>
    </Typography>
    </Box>
  </div>
  );
}
