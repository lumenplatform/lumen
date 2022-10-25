import { v1 } from 'uuid';
import { AssetStatus, AssetType } from '../../../../models/asset.model';
import { Course, CourseStatus } from '../../../../models/course.model';
import { DeepPartial } from './liner-algebra';

export const cosmicOrigins: DeepPartial<Course> = {
  courseId: v1(),
  title: 'COSMIC ORIGIN OF THE CHEMICAL ELEMENTS',
  subtitle: '',
  description:
    'Everything around us is made from different chemical elements: carbon, silicon, iron, and all the other elements from the Periodic Table. The lighter elements were mostly produced in the Big Bang, but the rest were (and are) formed within stars and in the explosions of supernovae. In this series of short lecture videos, created to accompany her book Searching for the Oldest Stars: Ancient Relics from the Early Universe (Princeton University Press, 2019), Professor Anna Frebel reveals the secrets of stardust and explains the cosmic origin of the elements.',
  language: 'English',
  level: 'Intermediate',
  tags: 'Astrophysics',
  subjectArea: 'Science',
  duration: 0,
  price: 5,
  

  courseImage: {
    type: AssetType.IMAGE,
    status: AssetStatus.ACTIVE,
    mime: 'image/jpeg',
    name: '',
    url: 'https://ocw.mit.edu/courses/res-8-007-cosmic-origin-of-the-chemical-elements-fall-2019/5aa51be2c9a31a5bd87adaa05a6eca61_RES.8-007f19.jpg',
  },

  promotionalVideo: {
    type: AssetType.VIDEO,
    url: 'https://ia601604.us.archive.org/4/items/MIT18.06SCF11/MIT18_06SCF11_Educator_Video_300k.mp4',
    status: AssetStatus.ACTIVE,
    mime: 'video/jpeg',
    name: '',
  },

  welcomeMessage: '',
  congratsMessage: '',
  learningOutcome: JSON.stringify([]),
  prerequisites: JSON.stringify([' ']),
  intendedAudience: JSON.stringify(['Undergraduate', 'CS Majors']),
  status: CourseStatus.PUBLISHED,
  rating: 4.3,
  ratingCount: 3,
  courseMaterial: [
    {
      title: '',
      topics: [
        { title: 'INTRODUCTION AND OVERVIEW' },
        { title: 'WHAT THE UNIVERSE IS MADE OF' },
        { title: 'EARLY CHEMICAL EVOLUTION' },
        { title: 'THE FIRST CHEMICAL ENRICHMENT EVENTS' },
        { title: 'STELLAR ARCHAEOLOGY' },
        { title: 'ELEMENT PRODUCTION (FUSION)—PART 1' },
        { title: 'ELEMENT PRODUCTION (FUSION)—PART 2' },
        { title: 'SPECTROSCOPY' },
        { title: 'FORMATION OF THE HEAVIEST ELEMENTS' },
        { title: 'TELESCOPES AND OBSERVING' },
        { title: 'SUMMARY' },
      ],
    },
  ],
};
