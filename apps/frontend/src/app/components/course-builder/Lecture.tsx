import { DeleteOutline, Edit } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { Identifier } from 'dnd-core';
import { useRef, useState } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { CardProps, DragItem, ItemTypes } from './CourseMaterialEditor';
import { AddButton } from './AddButton';
export function Lecture({
  id,
  text,
  index,
  moveLecture,
  section,
  sectionIndex,
  removeLecture,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.LECTURE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (item.sectionIndex !== sectionIndex) {
        return;
      }

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      console.warn('MOVE FORM LECTURE');
      moveLecture(dragIndex, hoverIndex, sectionIndex, sectionIndex);

      item.index = hoverIndex;
    },
  });

  // enable dragging for lecture
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.LECTURE,
    item: () => {
      return { id, index, sectionIndex };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      ref={ref}
      disableGutters={true}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      elevation={0}
      sx={{ border: '1px solid #ddd', margin: '0.5rem 0 !important' }}
      data-handler-id={handlerId}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '& .actions': { display: 'none' },
          '& :hover': {
            '& .actions': { display: 'unset', lineHeight: 1 },
          },
        }}
      >
        <Typography lineHeight={2.1}>
          <b>Lecture : </b>
          {text}
        </Typography>
        <Box className="actions">
          <IconButton size="small" sx={{ ml: 2 }}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => removeLecture()}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
          Aliquam eget maximus est, id dignissim quam.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
