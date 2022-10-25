import { AssetStatus, AssetType } from '../../../../models/asset.model';
import { v1, v4 } from 'uuid';
import { Course, CourseStatus } from '../../../../models/course.model';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export const linerAlgebra: DeepPartial<Course> = {
  courseId: v1(),
  title: 'Linear Algebra',
  subtitle: '',
  description:
    'This course covers matrix theory and linear algebra, emphasizing topics useful in other disciplines such as physics, economics and social sciences, natural',
  language: 'English',
  level: 'Beginner',
  tags: 'Algebra',
  subjectArea: 'Mathematics',
  duration: 0,
  price: 10,

  courseImage: {
    type: AssetType.IMAGE,
    status: AssetStatus.ACTIVE,
    mime: 'image/jpeg',
    name: '',
    url: 'https://miro.medium.com/max/378/1*okJw0bCYkZS9wYm7f0DfYw.png',
  },

  promotionalVideo: {
    type: AssetType.VIDEO,
    url: 'https://ia601604.us.archive.org/4/items/MIT18.06SCF11/MIT18_06SCF11_Educator_Video_300k.mp4',
    status: AssetStatus.ACTIVE,
    mime: 'video/jpeg',
    name: '',
  },

  //   instructors = new Collection<User>(this),

  welcomeMessage: '',
  congratsMessage: '',
  learningOutcome: JSON.stringify([
    'Systems of linear equations',
    'Row reduction and echelon forms',
    'Matrix operations, including inverses',
    'Block matrices',
    'Linear dependence and independence',
    'Subspaces and bases and dimensions',
    'Orthogonal bases and orthogonal projections',
    'Gram-Schmidt process',
  ]),
  prerequisites: JSON.stringify([
    'To succeed in this course you will need to be comfortable with vectors, matrices, and three-dimensional coordinate systems. ',
    'The basic operations of linear algebra are those you learned in grade school – addition and multiplication to produce “linear combinations.” But with vectors, we move into four-dimensional space and n-dimensional space!',
  ]),
  intendedAudience: JSON.stringify(['Undergrads', 'CS Majors']),
  status: CourseStatus.PUBLISHED,
  rating: 4.3,
  ratingCount: 12,
  courseMaterial: [
    {
      contentType: 'section',
      title: 'AX = B And The Four Subspaces',
      description: `Mathematics is a tool for describing the world around us. Linear equations give some of the simplest descriptions, and systems of linear equations are made by combining several descriptions. 
        
        In this unit we write systems of linear equations in the matrix form Ax = b. We explore how the properties of A and b determine the solutions x (if any exist) and pay particular attention to the solutions to Ax = 0. For a given matrix A we ask which b can be written in the form Ax.`,
      topics: [
        {
          contentType: 'video',
          title: 'The Geometry Of Linear Equations',
          description:
            'A major application of linear algebra is to solving systems of linear equations. This lecture presents three ways of thinking about these systems. The “row method” focuses on the individual equations, the “column method” focuses on combining the columns, and the “matrix method” is an even more compact and powerful way of describing systems of linear equations.',
          timeEstimate: 10,
          video: {
            id: 'aa143ac8-67b9-4827-9619-921c06a509be',
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
              id: '1b326fb6-7b99-5df6-afc1-6a9ea5d1d671',
              asset: {
                id: '1b326fb6-7b99-4df6-afc1-6a9ea5d1d671',
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
        {
          order: 1,
          title: 'An Overview Of key ideas',
          timeEstimate: 25,
        },
        { order: 2, title: 'Elimination With Matrices' },
        { order: 3, title: 'Multiplication And Inverse Matrices' },
        { order: 4, title: 'Factorization Into A = LU' },
        { order: 5, title: 'Transposes, Permutations, Vector Spaces' },
        { order: 6, title: 'Column Space And Nullspace' },
        {
          order: 7,
          title: 'Solving AX = 0: pivot variables, Special Solutions',
          contentType: 'video',
          video: {
            id: '722f6562-2c4d-410c-a89e-25c4fb55ab76',
            url: 'https://lumenlmsstorage.blob.core.windows.net/test/DemoVideo.mp4?sv=2021-08-06&se=2022-08-13T03%3A07%3A30Z&sr=c&sp=rcw&sig=27sebRWG8PKpt0lCgBRWPsWJXZaioUiqwkcXqygH%2FSo%3D',
            type: AssetType.VIDEO,
            status: AssetStatus.ACTIVE,
            mime: 'video/mp4',
            name: 'DemoVideo.mp4',
            size: 3581279,
            config: {},
            contentKey: 'd5121ae9-8a7a-4df9-9fa5-df0f1622658d',
            streamingURLs: [
              {
                url: 'https://lumenlms-aase.streaming.media.azure.net/9cb1b91c-70f2-41ef-ae9e-7cab3ffe065b/DemoVideo.ism/manifest(format=mpd-time-csf,encryption=cenc)',
                keyIdentifier: 'd5121ae9-8a7a-4df9-9fa5-df0f1622658d',
              },
              {
                url: 'https://lumenlms-aase.streaming.media.azure.net/9cb1b91c-70f2-41ef-ae9e-7cab3ffe065b/DemoVideo.ism/manifest(format=mpd-time-cmaf,encryption=cenc)',
                keyIdentifier: 'd5121ae9-8a7a-4df9-9fa5-df0f1622658d',
              },
              {
                url: 'https://lumenlms-aase.streaming.media.azure.net/9cb1b91c-70f2-41ef-ae9e-7cab3ffe065b/DemoVideo.ism/manifest(encryption=cenc)',
                keyIdentifier: 'd5121ae9-8a7a-4df9-9fa5-df0f1622658d',
              },
            ],
          },
        },
        { order: 8, title: 'Solving AX = B: Row Reduced Form R' },
        { order: 9, title: 'Independence, Basis And Dimension' },
        { order: 10, title: 'The Four Fundamental Subspaces' },
        { order: 11, title: 'Matrix Spaces; Rank 1; Small World Graphs' },
        { order: 12, title: 'Graphs, Networks, Incidence Matrices' },
        { order: 13, title: 'Exam', contentType: 'quiz' },
      ],
    },
    {
      title: 'Least Squares, Determinants And Eigenvalues',
      description: `Each component of a vector in Rn indicates a distance along one of the coordinate axes. This practice of dissecting a vector into directional components is an important one. In particular, it leads to the “least squares” method of fitting curves to collections of data. This unit also introduces matrix eigenvalues and eigenvectors. Many calculations become simpler when working with a basis of eigenvectors.

      The determinant of a matrix is a number characterizing that matrix. This value is useful for determining whether a matrix is singular, computing its inverse, and more.`,

      topics: [
        {
          title: 'ORTHOGONAL VECTORS AND SUBSPACES',
          contentType: 'video',
          video: {
            size: 20,
            type: AssetType.VIDEO,
            url: 'https://ia902308.us.archive.org/35/items/MIT18.06S05_MP4/01.mp4',
            status: AssetStatus.ACTIVE,
            mime: 'video/mp4',
            name: 'THE GEOMETRY OF LINEAR EQUATIONS.mp4',
          },
        },
        { title: 'PROJECTIONS ONTO SUBSPACES' },
        { title: 'PROJECTION MATRICES AND LEAST SQUARES' },
        { title: 'ORTHOGONAL MATRICES AND GRAM-SCHMIDT' },
        { title: 'PROPERTIES OF DETERMINANTS' },
        { title: 'DETERMINANT FORMULAS AND COFACTORS' },
        { title: "CRAMER'S RULE, INVERSE MATRIX AND VOLUME" },
        { title: 'EIGENVALUES AND EIGENVECTORS' },
        { title: 'DIAGONALIZATION AND POWERS OF A' },
        { title: 'DIFFERENTIAL EQUATIONS AND EXP(AT)' },
        { title: 'MARKOV MATRICES; FOURIER SERIES' },
        { title: 'EXAM ' },
      ],
    },
    {
      title: 'Positive Definite Matrices And Applications',
      description:
        'In this unit we discuss matrices with special properties – symmetric, possibly complex, and positive definite. The central topic of this unit is converting matrices to nice form (diagonal or nearly-diagonal) through multiplication by other matrices. Generally, this process requires some knowledge of the eigenvectors and eigenvalues of the matrix.',
      topics: [
        { title: 'Symmetric matrices and positive definiteness' },
        { title: 'Complex matrices; fast fourier transform (fft)' },
        { title: 'Positive definite matrices and minima' },
        { title: 'Similar matrices and jordan form' },
        { title: 'Singular value decomposition' },
        { title: 'linear transformations and their matrices' },
        { title: 'Change of basis; image compression' },
        { title: 'Left and right inverses; Pseudoinverse' },
        { title: 'Exam ' },
      ],
    },
  ],
};
