import { AssetType, AssetStatus } from '../../../../models/asset.model';
import { Course, CourseStatus } from '../../../../models/course.model';
import { v4 } from 'uuid';
import { DeepPartial } from './liner-algebra';

export const propulsionSystems: DeepPartial<Course> = {
  courseId: v4(),
  title: 'INTRODUCTION TO PROPULSION SYSTEMS',
  subtitle: '',
  description:
    'This course presents aerospace propulsive devices as systems, with functional requirements and engineering and environmental limitations along with requirements and limitations that constrain design choices. Both air-breathing and rocket engines are covered, at a level which enables rational integration of the propulsive system into an overall vehicle design. Mission analysis, fundamental performance relations, and exemplary design solutions are presented.',
  language: 'English',
  level: 'Intermediate',
  tags: 'Propulsion',
  subjectArea: 'Engineering',
  duration: 0,
  price: 0,
  settings: { isDesktopOnly: true },

  courseImage: {
    type: AssetType.IMAGE,
    status: AssetStatus.ACTIVE,
    mime: 'image/jpeg',
    name: '',
    url: 'https://ocw.mit.edu/courses/16-50-introduction-to-propulsion-systems-spring-2012/715c92947e203669c550882dc974afa4_16-50s12.jpg',
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
  status: CourseStatus.DRAFT,
  rating: 2.3,
  ratingCount: 10,
  courseMaterial: [
    {
      title: 'An appreciation of propulsion and jet engine rotordynamics',
      topics: [
        { title: 'Rocket equation; gravity loss; optimum acceleration	' },
        { title: 'Rocket staging; range of aircraft; climb & acceleration	' },
        { title: 'Orbital mechanics; single force center	' },
        { title: 'Hyperbolic orbits; interplanetary transfer	' },
        { title: 'Non-chemical rockets; optimum exhaust velocity	' },
        {
          title:
            'Modeling of thermal rocket engines; nozzle flow; control of mass flow',
        },
        { title: 'Modeling of rocket nozzles; effects of nozzle area ratio	' },
        { title: 'Types of nozzles; connection of flow to nozzle shape	' },
        { title: 'Solid propellant gas generators; stability; grain designs	' },
        { title: 'Models for rocket engines; flow of reacting gases	' },
        {
          title:
            'Reacting gases (cont.); temperature dependence of specific heats	',
        },
        { title: 'Nozzle flow of reacting gases	' },
        { title: 'Rocket casing design; structural modeling	' },
        { title: 'Heat transfer and cooling	' },
        { title: 'Ablative cooling	' },
        { title: 'Thrust vectoring; engine cycles; mass estimates	' },
        { title: 'Aircraft propulsion, configuration and components	' },
      ],
    },
  ],
};
