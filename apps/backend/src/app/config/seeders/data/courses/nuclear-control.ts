import { AssetType, AssetStatus } from '../../../../models/asset.model';
import { Course, CourseStatus } from '../../../../models/course.model';
import { v4 } from 'uuid';
import { DeepPartial } from './liner-algebra';

export const nuclearControlSystems: DeepPartial<Course> = {
  courseId: v4(),
  title: 'Nuclear Power Plant Dynamics And Control',
  subtitle: '',
  description:
    'This short course provides an introduction to reactor dynamics including subcritical multiplication, critical operation in absence of thermal feedback effects and effects of Xenon, fuel and moderator temperature, etc. Topics include the derivation of point kinetics and dynamic period equations; techniques for reactor control including signal validation, supervisory algorithms, model-based trajectory tracking, and rule-based control; and an overview of light-water reactor startup. Lectures and demonstrations employ computer simulation and the use of the MIT Research Reactor.',
  language: 'English',
  level: 'Expert',
  tags: 'Nuclear Engineering',
  subjectArea: 'Engineering ',
  duration: 0,
  price: 50,
  settings: { isDesktopOnly: 'YES' },

  courseImage: {
    type: AssetType.IMAGE,
    status: AssetStatus.ACTIVE,
    mime: 'image/jpeg',
    name: '',
    url: 'https://ocw.mit.edu/courses/22-921-nuclear-power-plant-dynamics-and-control-january-iap-2006/49e8c791b9a4332cbd2e60860cfd5cb8_22-921iap06.jpg',
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
  rating: 2.3,
  ratingCount: 2,
  courseMaterial: [
    {
      title: 'Nuclear Power Plant Dynamics And Control',
      description:
        'A nuclear power plant (NPP) contains thousands of components and equipment, such as motors, pumps or valves that have to be operated in a well-coordinated way. This coordination is performed by instrumentation and control (I&C) systems. ',
      topics: [
        { title: 'Introduction' },
        { title: 'Nuclear Power Plant Layout' },
        { title: 'Reactor Startup; Operation While Critical' },
        { title: 'Reactor Operation at Power' },
        { title: 'Reactor Design Features' },
        { title: 'Basic Approaches to Process Control ' },
        { title: 'Reactivity Constraint Approach; Period Generated Control	 ' },
        { title: 'Light Water Reactor Startup' },
      ],
    },
  ],
};
