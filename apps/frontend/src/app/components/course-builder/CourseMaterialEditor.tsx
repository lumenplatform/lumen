import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
import { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useCourseMaterial } from './hooks';
import { SectionItem } from './SectionItem';
import { Section } from './types';

function CourseMaterialEditor() {
  return (
    <DndProvider backend={HTML5Backend}>
      <SectionsList />
    </DndProvider>
  );
}
export default CourseMaterialEditor;

export function SectionsList() {
  const { sections, actions } = useCourseMaterial();
  const theme = useTheme();

  const renderSection = useCallback((section: Section, secIndex: number) => {
    return (
      <SectionItem
        key={'sec' + section.id}
        index={secIndex}
        section={section}
        actions={actions}
      />
    );
  }, []);

  return (
    <>
      <Box style={{ ...style, padding: '0 2rem' }}>
        {sections.map((section, i) => renderSection(section, i))}
        <Paper
          elevation={0}
          sx={{ p: 2, border: `1px solid ${theme.palette.divider}` }}
        >
          <Button onClick={() => actions.addSectionAt(sections.length)}>
            ADD Section
          </Button>
        </Paper>
      </Box>

      <small>
        <pre>{JSON.stringify(sections, null, 3)}</pre>
      </small>
    </>
  );
}

export const style = {
  padding: '0.5rem 1rem',
};
