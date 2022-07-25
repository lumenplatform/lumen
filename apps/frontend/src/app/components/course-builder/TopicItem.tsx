import {
  DeleteOutline,
  EditOutlined,
  ExpandLessOutlined,
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { Identifier } from 'dnd-core';
import { useRef, useState } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { CardProps, DragItem, ItemTypes } from './types';

import TopicEditor from './TopicEditor';

export function TopicItem(props: CardProps) {
  const { topic, index, section, sectionIndex, actions } = props;

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
      actions.moveTopic(dragIndex, hoverIndex, sectionIndex, sectionIndex);

      actions.clearHiddenItems();
      // actions.hideItemAt(item.sectionIndex, item.index);
      // actions.showPreviewAt(sectionIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  // enable dragging for topic
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.LECTURE,
    item: () => {
      return { id: topic.id, index, sectionIndex };
    },
    end: (item) => {
      // actions.clearPreviews();
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  const [expanded, setExpanded] = useState(false);

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{ border: '1px solid #ddd', margin: '0.5rem 0 !important', opacity }}
      data-handler-id={handlerId}
    >
      <TopicItemHeader
        {...props}
        onExpandBtn={() => setExpanded(!expanded)}
        expanded={expanded}
      />
      {expanded && <TopicEditor />}
    </Paper>
  );
}

export default function TopicItemHeader({
  topic,
  actions,
  index,
  onExpandBtn,
  expanded,
}: any) {
  return (
    <Box
      sx={{
        '& .actions': { display: 'none' },
        '&:hover': {
          '& .actions': { display: 'block', lineHeight: 1 },
        },
        display: 'flex',
        p: 1,
        px: 2,
      }}
      onClick={onExpandBtn}
    >
      {topic.id !== -1 && (
        <Typography lineHeight={2.1}>
          <b>Topic : </b>
          {topic.text}
        </Typography>
      )}

      <Box className="actions">
        <IconButton size="small" sx={{ ml: 2 }} onClick={() => null}>
          <EditOutlined fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => actions.removeTopicAt(index)}>
          <DeleteOutline fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1 }}></Box>
      <IconButton size="small" onClick={onExpandBtn}>
        {expanded ? <ExpandMoreIcon /> : <ExpandLessOutlined />}
      </IconButton>
    </Box>
  );
}
