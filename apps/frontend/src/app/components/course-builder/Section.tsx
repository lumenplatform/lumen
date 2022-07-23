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
import { useDrop, XYCoord } from 'react-dnd';
import { AddButton } from './AddButton';
import { DragItem, ItemTypes } from './CourseMaterialEditor';

export function Section({
  children,
  text,
  id,
  index,
  moveLecture,
  removeSection,
}: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(true);

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
      setExpanded(true);
      if (!ref.current) {
        return;
      }
      if (!monitor.isOver({ shallow: true }) || monitor.didDrop()) {
        return;
      }

      if (item.sectionIndex === index) {
        return;
      }
      // console.log({ item });
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const height = hoverBoundingRect.bottom - hoverBoundingRect.top;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      console.log({ r: item.sectionIndex < index, hoverClientY, height });
      if (item.sectionIndex < index && hoverClientY > height) {
        return;
      }

      if (item.sectionIndex > index && hoverClientY > height) {
        return;
      }

      console.warn('MOVE FORM SECTION');
      moveLecture(item.index, 1, index, item.sectionIndex);

      // item.index = 0;
    },
  });

  drop(ref);

  return (
    <Accordion
      ref={ref}
      disableGutters
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{ margin: '1rem 0 !important' }}
      data-handler-id={handlerId}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '& .MuiIconButton-sizeSmall': { display: 'none' },
          '& :hover': {
            '& .MuiIconButton-sizeSmall': { display: 'unset', lineHeight: 1 },
          },
        }}
      >
        <Typography lineHeight={2.1}>
          <b>Section {index + 1}:</b> {text}
        </Typography>
        <IconButton size="small" sx={{ ml: 2 }}>
          <Edit fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={() => removeSection()}>
          <DeleteOutline fontSize="small" />
        </IconButton>
      </AccordionSummary>

      <AccordionDetails>
        <Typography></Typography>
        <Box sx={{ px: 3 }}>{children}</Box>
      </AccordionDetails>
    </Accordion>
  );
}
