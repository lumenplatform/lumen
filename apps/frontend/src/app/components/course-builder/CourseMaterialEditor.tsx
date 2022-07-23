import { AddCircleOutline } from '@mui/icons-material';
import { FC, useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v1 } from 'uuid';
import { AddButton } from './AddButton';
import { Lecture } from './Lecture';
import { Section } from './Section';

function CourseMaterialEditor() {
  return (
    <DndProvider backend={HTML5Backend}>
      <SectionsList />
    </DndProvider>
  );
}
export default CourseMaterialEditor;
export interface Item {
  id: any;
  text: string;
  lectures?: any[];
}

export interface ContainerState {
  cards: Item[];
}

export function SectionsList() {
  const [sections, setSections] = useState<Item[]>([
    {
      id: v1(),
      text: 'Write a cool JS library',
      lectures: [
        {
          id: 3,
          text: 'Write README',
        },
        {
          id: 4,
          text: 'Create some examples',
        },
      ],
    },
    {
      id: 2,
      text: 'Make it generic enough',
    },

    {
      id: 5,
      text: 'Spam in Twitter  ',
    },
  ]);

  const moveLecture = useCallback(
    (
      dragIndex: number,
      hoverIndex: number,
      hoverSection: number,
      dragSection: number
    ) => {
      setSections((prevCards: Item[]) => {
        console.log(dragIndex, hoverIndex, hoverSection, dragSection);

        const sections = [...prevCards];

        if (hoverSection === dragSection) {
          const lectures = [...(sections[dragSection].lectures || [])];
          if (lectures) {
            lectures.splice(dragIndex, 1);
            lectures.splice(
              hoverIndex,
              0,
              sections[dragSection].lectures![dragIndex] as Item
            );
            sections[dragSection].lectures = lectures;
          }
        } else {
          // remove drag index on dragSection
          const removed = sections[dragSection].lectures!.splice(dragIndex, 1);

          console.log('RRR', sections[dragSection].lectures);
          console.log(1, sections[hoverSection].lectures);

          // add to hoverSection
          const lectures = [...(sections[hoverSection].lectures || [])];

          console.log(2, lectures);
          lectures.splice(0, 0, removed[0]);
          console.log(3, lectures);

          sections[hoverSection].lectures = lectures.filter((e) => e);
          console.log({ hoverSection });
        }
        console.log(sections);
        return sections;
      });
    },
    []
  );

  const renderLecture = useCallback(
    (
      section: any,
      sectionIndex: number,
      card: { id: number; text: string },
      index: number
    ) => {
      return (
        <Lecture
          key={sectionIndex + '-' + card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveLecture={moveLecture}
          removeLecture={() => removeLectureAt(sectionIndex, index)}
          section={section}
          sectionIndex={sectionIndex}
        />
      );
    },
    []
  );

  const renderSection = useCallback(
    (card: any, index: number, lectures: any) => {
      return (
        <Section
          key={'sec' + card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveLecture={moveLecture}
          removeSection={() => removeSectionAt(index)}
        >
          {lectures}
        </Section>
      );
    },
    []
  );

  function removeSectionAt(i: number) {
    setSections((p) => {
      const r = [...p];
      r.splice(i, 1);
      return r;
    });
  }

  const addSectionAt = (i: number) => {
    setSections((p) => {
      const r = [...p];
      r.splice(i, 0, {
        id: v1(),
        text: new Date().toISOString(),
      });
      return r;
    });
  };

  const addLectureAt = (sectionId: number, lectureIndex: number) => {
    setSections((p) => {
      const r = [...p];
      if (r[sectionId].lectures) {
        r[sectionId].lectures!.splice(lectureIndex, 0, {
          id: v1(),
          text: new Date().toISOString(),
        });
      } else {
        r[sectionId].lectures = [
          {
            id: v1(),
            text: new Date().toISOString(),
          },
        ];
      }
      return r;
    });
  };

  function removeLectureAt(sectionId: number, lectureIndex: number) {
    setSections((p) => {
      const r = [...p];
      if (r[sectionId].lectures) {
        r[sectionId].lectures!.splice(lectureIndex, 1);
      }
      return r;
    });
  }

  return (
    <>
      <div style={{ ...style, padding: '1rem 2rem' }}>
        {sections.map((section, i) => (
          <div style={{ position: 'relative' }}>
            <AddButton onClick={() => addSectionAt(i)} />
            {renderSection(
              section,
              i,
              <>
                {section.lectures?.map((lec, j) => (
                  <div style={{ position: 'relative' }}>
                    <AddButton onClick={() => addLectureAt(i, j)} />
                    {renderLecture(section, i, lec, j)}
                  </div>
                ))}
                <div style={{ position: 'relative' }}>
                  <AddButton
                    onClick={() =>
                      addLectureAt(i, section.lectures?.length || 0)
                    }
                  />
                </div>
              </>
            )}
          </div>
        ))}
        <div style={{ position: 'relative' }}>
          <AddButton onClick={() => addSectionAt(sections.length)} />
        </div>
      </div>
      <small>
        <pre>{JSON.stringify(sections, null, 3)}</pre>
      </small>
    </>
  );
}

export const ItemTypes = {
  LECTURE: 'LECTURE',
  SECTION: 'SECTION',
};

const style = {
  padding: '0.5rem 1rem',
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveLecture: (
    dragIndex: number,
    hoverIndex: number,
    hoverSection: number,
    dragSection: number
  ) => void;
  section: any;
  sectionIndex: number;
  removeLecture: any;
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
  sectionIndex: number;
}
