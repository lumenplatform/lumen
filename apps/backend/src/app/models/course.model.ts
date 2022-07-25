import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
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
@Entity()
export class Course {
  @PrimaryKey()
  courseId: string;

  @Property()
  title: string;

  @Property()
  subtitle: string;

  @Property()
  description: string;

  @Property()
  language: string;

  @Property()
  level: string;

  @Property()
  tags: string;

  @Property()
  subjectArea: string;

  @Property()
  duration: number;

  @Property()
  price: number;

  @OneToOne(() => Asset)
  courseImage: Asset;

  @OneToOne(() => Asset)
  promotionalVideo: Asset;

  @ManyToMany(() => User)
  instructors = new Collection<User>(this);

  @ManyToMany(() => User)
  moderators = new Collection<User>(this);

  @ManyToOne(() => Organization)
  organization: Organization;

  @Property()
  welcomeMessage: string;

  @Property()
  congratsMessage: string;

  @Property({ type: 'jsonb' })
  learningOutcome: any;

  @Property({ type: 'jsonb' })
  prerequisites: any;

  @Property({ type: 'jsonb' })
  intendedAudience: any;

  @OneToMany(() => CourseMaterial, (material) => material.course)
  courseMaterial = new Collection<CourseMaterial>(this);

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollment = new Collection<Enrollment>(this);

  @Enum(() => CourseStatus)
  status = CourseStatus.DRAFT;

  @Property({default:0})
  rating:number;

  @Property({default:0})
  ratingCount:number;
}
