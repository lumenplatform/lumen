import { DeleteOutline, Edit } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { Identifier } from 'dnd-core';
import { useCallback, useRef, useState } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { AddButton } from './AddButton';
import { DragItem, ItemTypes } from './types';
import { TopicItem } from './TopicItem';

export function SectionItem({ section, index, actions }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(true);

  const renderTopic = useCallback((topic: any, i: number) => {
    return (
      <TopicItem
        key={index + '-' + topic.id}
        index={i}
        topic={topic}
        actions={actions}
        section={section}
        sectionIndex={index}
      />
    );
  }, []);

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
    drop(item: DragItem, monitor) {
      if (item.sectionIndex === index) {
        return;
      }

      actions.clearPreviews();
      actions.clearHiddenItems();
      actions.moveTopic(item.index, 0, index, item.sectionIndex);
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
      // actions.moveTopic(item.index, 1, index, item.sectionIndex);
      actions.clearHiddenItems();
      actions.hideItemAt(item.sectionIndex, item.index);
      actions.showPreviewAt(index, -1);
      // item.index = 0;
    },
  });

  drop(ref);

  return (
    <div style={{ position: 'relative' }}>
      <AddButton onClick={() => actions.addSectionAt(index)} />

      <Accordion
        ref={ref}
        disableGutters
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        elevation={0}
        sx={{ border: '1px solid #ddd', margin: '1rem 0 !important' }}
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
            <b>Section {index + 1}:</b> {section.title}
          </Typography>
          <IconButton size="small" sx={{ ml: 2 }}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => actions.removeSectionAt(index)}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </AccordionSummary>

        <AccordionDetails>
          <Box sx={{ px: 3 }}>
            {section.topics
              ?.filter((r: any) => !r.isHidden)
              ?.map((lec: any, j: number) => (
                <div style={{ position: 'relative' }}>
                  <AddButton onClick={() => actions.addTopicAt(index, j)} />
                  {renderTopic(lec, j)}
                </div>
              ))}
            <Button
              size="small"
              onClick={() => actions.addTopicAt(index, section.topics.length)}
            >
              ADD Topic
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
