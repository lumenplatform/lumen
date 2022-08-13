import { AssetType, AssetStatus } from '../../../../models/asset.model';
import { Course, CourseStatus } from '../../../../models/course.model';
import { v4 } from 'uuid';
import { DeepPartial } from './liner-algebra';

export const aircraftSystems: DeepPartial<Course> = {
  courseId: v4(),
  title: 'AIRCRAFT SYSTEMS ENGINEERING',
  subtitle: '',
  description:
    'Aircraft are complex products comprised of many subsystems which must meet demanding customer and operational lifecycle value requirements. This course adopts a holistic view of the aircraft as a system, covering: basic systems engineering; cost and weight estimation; basic aircraft performance; safety and reliability; lifecycle topics; aircraft subsystems; risk analysis and management; and system realization. Small student teams “retrospectively analyze” an existing aircraft covering: key design drivers and decisions; aircraft attributes and subsystems; and operational experience. Finally, the student teams deliver oral and written versions of the case study.',
  language: 'English',
  level: 'Intermediate',
  tags: 'Aircraft Engineering',
  subjectArea: 'Engineering',
  duration: 0,
  price: 18,
  settings: { isDesktopOnly: true },

  courseImage: {
    type: AssetType.IMAGE,
    status: AssetStatus.ACTIVE,
    mime: 'image/jpeg',
    name: '',
    url: 'https://ocw.mit.edu/courses/16-885j-aircraft-systems-engineering-fall-2004/e8412ad543e1f017bc52915cfd3a460d_16-885jf04.jpg',
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
  rating: 3.7,
  ratingCount: 8,
  courseMaterial: [
    {
      title: 'An appreciation of an aircraft as a system',
      topics: [
        { title: 'Introduction to Course and to the Aircraft as a System' },
        { title: 'Lean System Engineering ' },
        {
          title:
            'Lifecycle Considerations Cost and Financial Analysis Introduction to Aircraft Performance and Static Stability ',
        },
        { title: 'Transport Aircraft Performance I' },
        { title: 'Transport Aircraft Performance II' },
        { title: 'Environmental Factors: Noise and Emissions' },
        { title: 'An Airline Viewpoint' },
        { title: 'Reliability and Maintenance ' },
        { title: 'The Space Shuttle - A Case Study' },
        { title: 'Propulsion, Fuel, Accessory Systems' },
        {
          title:
            'Life Support, Environmental, Accessory Systems	Joe Ornelas, VP Engineering, Hamilton Sunstrand',
        },
        { title: 'Flight Deck	Brian Kelley, Boeing Commercial Aircraft' },
        { title: 'Avionics, Air Data, Communications' },
        { title: 'Flight Controls' },
        { title: 'Electrical, Hydraulic, Pneumatic' },
        { title: 'Structural System	Prof. Paul Lagace' },
        {
          title:
            'System Architecting for Safety Ron Hinderberger, Boeing Commercial Aircraft',
        },
        {
          title:
            'Commercial Aircraft System Verification, Validation and Certification',
        },
        { title: 'Chief Test Pilot Research, The Boeing Company' },
      ],
    },
  ],
};
