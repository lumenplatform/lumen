import { Asset } from './asset.model';
import { CourseMaterial } from './course-material.model';
import { Enrollment } from './enrollment.model';
import { Organization } from './organization.model';
import { User } from './user.model';

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}

export class Course {
  id: string;
  title: string;
  subtitle;
  description;
  language;
  level;
  tags;
  subjectArea;
  duration: number;

  courseImage: Asset;
  promotionalVideo: Asset;

  instructors: User[];
  moderators: User[];
  organization: Organization;

  price: number;

  welcomeMessage: string;
  congratsMessage: string;

  learningOutcome: string[];
  prerequisites: string[];
  intendedAudience: string[];

  courseMaterial: CourseMaterial[];
  enrollment: Enrollment[];
  status: CourseStatus;
}
