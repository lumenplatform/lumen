import { Box, Button, Paper, useTheme } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useFormContext } from 'react-hook-form';
import { SectionItem } from './SectionItem';
import { Section } from './types';
import { useCourseMaterial } from './useCourseMaterial';

function CourseMaterialEditor() {
  return (
    <DndProvider backend={HTML5Backend}>
      <SectionsList />
    </DndProvider>
  );
}
export default CourseMaterialEditor;

export function SectionsList() {
  const { setValue: setFormValue, getValues } = useFormContext();
  const { sections, actions } = useCourseMaterial(
    getValues()['courseMaterial'] as Section[]
  );
  const theme = useTheme();

  useEffect(() => {
    setFormValue('courseMaterial', sections);
  }, [sections, setFormValue]);

  const renderSection = useCallback((section: Section, secIndex: number) => {
    return (
      <SectionItem
        key={'sec' + section.id + '' + secIndex}
        index={secIndex}
        section={section}
        actions={actions}
      />
    );
  }, []);

  return (
    <Box style={{ ...style, padding: '0 2rem' }}>
      {sections && sections.map((section, i) => renderSection(section, i))}
      <Paper
        elevation={0}
        sx={{ p: 2, border: `1px solid ${theme.palette.divider}` }}
      >
        <Button
          onClick={() => actions.addSectionAt(sections ? sections.length : 0)}
        >
          ADD Section
        </Button>
      </Paper>
    </Box>
  );
}

export const style = {
  padding: '0.5rem 1rem',
};
