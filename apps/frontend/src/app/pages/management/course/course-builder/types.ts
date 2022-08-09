export const ItemTypes = {
  LECTURE: 'LECTURE',
  SECTION: 'SECTION',
};

export interface CardProps {
  topic: any;
  index: number;
  section: Section;
  sectionIndex: number;
  actions: any;
}

export interface DragItem {
  index: number;
  id?: string;
  type: string;
  sectionIndex: number;
}

export interface Section {
  id?: any;
  title: string;
  topics: any[];
}

export interface ContainerState {
  cards: Section[];
}
