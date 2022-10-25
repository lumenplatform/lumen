import { useCallback, useState } from 'react';
import { Section } from './types';

function removePreviews(sections: Section[]): Section[] {
  return sections
    .filter((r) => r && r.id !== -1)
    .map((k) => ({
      ...k,
      topics: k.topics?.filter((l) => l && l.id !== -1),
    }));
}
function resetHiddenItems(sections: Section[]): Section[] {
  return sections.map((k) => ({
    ...k,
    topics: k.topics.map((r) => ({ ...r, isHidden: undefined })),
  }));
}

function moveArrayItem(array: unknown[], fromIndex: number, toIndex: number) {
  const newArray = [...array];
  newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, array[fromIndex]);
  return newArray;
}

function moveWithinSection(
  sections: Section[],
  sectionIndex: number,
  fromIndex: number,
  toIndex: number
): Section[] {
  return sections.map((s, index) => {
    if (index !== sectionIndex) return s;

    const section = s;
    const topics = [...(section.topics || [])];

    if (topics) {
      section.topics = moveArrayItem(topics, fromIndex, toIndex);
    }
    return section;
  });
}

function updateItem(
  sections: Section[],
  sectionIndex: number,
  location: number,
  data: any
) {
  return sections.map((s, index) => {
    if (index !== sectionIndex) return s;
    console.log(index, sectionIndex);
    const section = s;
    const topics = [...(section.topics || [])];

    if (topics && section.topics[location]) {
      section.topics[location] = { ...section.topics[location], ...data };
    }

    return section;
  });
}

function hideItem(sections: Section[], sectionIndex: number, location: number) {
  return sections.map((s, index) => {
    if (index !== sectionIndex) return s;
    console.log(index, sectionIndex);
    const section = s;
    const topics = [...(section.topics || [])];

    if (topics && section.topics[location]) {
      section.topics[location].isHidden = true;
    }

    return section;
  });
}

function updateSec(sections: Section[], sectionIndex: number, data: any) {
  return sections.map((s, index) => {
    if (index !== sectionIndex) return s;
    const section = { ...s, ...data };
    return section;
  });
}

function addPreview(
  sections: Section[],
  sectionIndex: number,
  location: number
) {
  return removePreviews(sections).map((s, index) => {
    if (index !== sectionIndex) return s;
    console.log(index, sectionIndex);
    const section = s;
    const topics = [...(section.topics || [])];

    if (topics) {
      const previewItem = {
        title: 'PREVIEW',
      };
      if (location == -1) {
        section.topics.push(previewItem);
      } else {
        section.topics.splice(location, 0, previewItem);
      }
    }

    return section;
  });
}

export function useCourseMaterial(data: Section[]) {
  const [sections, setSections] = useState<Section[]>(data);

  const showPreviewAt = useCallback(
    (sectionIndex: number, location: number) => {
      setSections((prevSections) => {
        return addPreview(prevSections, sectionIndex, location);
      });
    },
    []
  );

  const moveTopic = useCallback(
    (
      dragIndex: number,
      hoverIndex: number,
      hoverSection: number,
      dragSection: number
    ) => {
      setSections((prevCards: Section[]) => {
        console.log(dragIndex, hoverIndex, hoverSection, dragSection);

        let sections = removePreviews([...prevCards]);

        if (hoverSection === dragSection) {
          sections = moveWithinSection(
            sections,
            hoverSection,
            dragIndex,
            hoverIndex
          );
        } else {
          // remove drag index on dragSection
          const removed = sections[dragSection].topics!.splice(dragIndex, 1);

          console.log('RRR', sections[dragSection].topics);
          console.log(1, sections[hoverSection].topics);

          // add to hoverSection
          const topics = [...(sections[hoverSection].topics || [])];

          console.log(2, topics);
          topics.splice(0, 0, removed[0]);
          console.log(3, topics);

          sections[hoverSection].topics = topics.filter((e) => e);
          console.log({ hoverSection });
        }
        console.log(sections);

        return sections;
      });
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
        title: 'Section ' + (r.length + 1) + ' Title',
        topics: [],
      });
      return r;
    });
  };

  const addTopicAt = (sectionId: number, topicIndex: number) => {
    setSections((p) => {
      const r = [...p];
      if (r[sectionId].topics) {
        r[sectionId].topics.splice(topicIndex, 0, {
          title: 'Topic ' + (r[sectionId].topics.length + 1) + ' Title',
        });
      } else {
        r[sectionId].topics = [
          {
            title: 'Topic 1 Title',
          },
        ];
      }
      return r;
    });
  };

  function removeTopicAt(sectionId: number, topicIndex: number) {
    setSections((p) => {
      console.log(sectionId);
      const r = [...p];
      if (r[sectionId].topics) {
        r[sectionId].topics.splice(topicIndex, 1);
      }
      return r;
    });
  }

  function clearPreviews() {
    setSections((p) => removePreviews(p));
  }

  function clearHiddenItems() {
    setSections((p) => resetHiddenItems(p));
  }

  function hideItemAt(sec: number, lec: number) {
    setSections((p) => hideItem(p, sec, lec));
  }

  function updateTopic(sectionId: number, topicIndex: number, data: any) {
    setSections((s) => updateItem(s, sectionId, topicIndex, data));
  }

  function updateSection(sectionId: number, data: any) {
    setSections((s) => updateSec(s, sectionId, data));
  }

  return {
    sections,
    actions: {
      moveTopic,
      updateTopic,
      removeSectionAt,
      addSectionAt,
      removeTopicAt,
      addTopicAt,
      showPreviewAt,
      clearPreviews,
      hideItemAt,
      clearHiddenItems,
      updateSection,
    },
  };
}
