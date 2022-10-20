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
  price: 12,

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
  status: CourseStatus.PUBLISHED,
  rating: 4.8,
  ratingCount: 1,
  courseMaterial: [
    {
      title: 'An appreciation of propulsion and jet engine rotordynamics',
      topics: [
        {
          title: 'Rocket equation; gravity loss; optimum acceleration	',
          contentType: 'video',
          video: {
            id: 'aa145ac8-67b9-4827-9619-921c06a509be',
            url: 'https://lumenlmsstorage.blob.core.windows.net/test/Liner%20Algebra.mp4?sv=2021-08-06&se=2022-08-14T15%3A51%3A21Z&sr=c&sp=rcw&sig=XWQnOohK0FgV1ymAzlKQkFKp3%2B5rm3IABPYkknt2Pl0%3D',
            type: AssetType.VIDEO,
            status: AssetStatus.ACTIVE,
            mime: 'video/mp4',
            name: 'Liner Algebra.mp4',
            size: 2853188,
            config: {},
            contentKey: 'e6096811-c1b2-45f9-9ee1-1b6c9889268d',
            streamingURLs: [
              {
                url: 'https://lumenlms-aase.streaming.media.azure.net/8044af77-ca0b-4674-a882-e825c4b95516/Liner Algebra.ism/manifest(format=mpd-time-csf,encryption=cenc)',
                keyIdentifier: 'e6096811-c1b2-45f9-9ee1-1b6c9889268d',
              },
              {
                url: 'https://lumenlms-aase.streaming.media.azure.net/8044af77-ca0b-4674-a882-e825c4b95516/Liner Algebra.ism/manifest(format=mpd-time-cmaf,encryption=cenc)',
                keyIdentifier: 'e6096811-c1b2-45f9-9ee1-1b6c9889268d',
              },
              {
                url: 'https://lumenlms-aase.streaming.media.azure.net/8044af77-ca0b-4674-a882-e825c4b95516/Liner Algebra.ism/manifest(encryption=cenc)',
                keyIdentifier: 'e6096811-c1b2-45f9-9ee1-1b6c9889268d',
              },
            ],
          },
          resources: [
            {
              id: '1b326fb6-7b99-4df6-afc1-6fa9ea5d1d671',
              asset: {
                id: '1b326fb6-7b99-4df6-afc1-6fa9ea5d1d671',
                url: 'https://lumenlmsstorage.blob.core.windows.net/test/Problem%20Set%201.pdf?sv=2021-08-06&se=2022-08-23T01%3A35%3A05Z&sr=c&sp=rcw&sig=uaoZYnbiTtXAPMC8gcgKbNpyOwB%2FmcXGo%2FffAJTVDqw%3D',
                type: AssetType.FILE,
                status: AssetStatus.ACTIVE,
                mime: 'application/pdf',
                name: 'Problem Set 1.pdf',
                size: 227552,
                config: {},
              },
            },
          ],
        },
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
