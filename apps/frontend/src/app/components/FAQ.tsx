import { Box, Skeleton, Typography } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../api';

export default function Faq(props: any) {
  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(['courses', courseId], () => getCourseById(courseId!));

  if (isError || isLoading) {
    return <Skeleton></Skeleton>;
  }

  return (
    <div>
      <Box sx={{ maxWidth: '1440px', px: 1 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <b>When will I have access to the lectures and assignments? </b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Once you enroll, you’ll have access to all videos and programming
              assignments.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              {' '}
              <b>What are the learning outcomes of this course?</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {course.learningOutcome.map((k: string) => (
                <li>{k}</li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              <b>Can I earn a certificate in this course?</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Yes. You will get a digital certificate</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              <b>For whom is this course intended?</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{course.intendedAudience.join(', ')}</Typography>
          </AccordionDetails>
        </Accordion>

        <Typography>
          {/* More questions? Visit the <a href=''> Learner Help Center</a> */}
        </Typography>
      </Box>
    </div>
  );
}
