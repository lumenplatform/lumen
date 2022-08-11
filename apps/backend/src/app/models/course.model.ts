import {
  Collection,
  Embeddable,
  Embedded,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Asset } from './asset.model';
import { CourseMaterial } from './course-material.model';
import { Enrollment } from './enrollment.model';
import { Organization } from './organization.model';
import { User } from './user.model';

@Embeddable()
export class CourseSettings {
  @Property({ default: false, columnType: 'boolean' })
  isDesktopOnly? = false;

  @Property({ default: false, columnType: 'boolean' })
  isPrivate? = false;
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}
@Entity()
export class Course {
  @PrimaryKey()
  courseId: string = v4();

  @Property()
  title: string;

  @Property()
  subtitle: string;

  @Property({ type: 'text' })
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

  @OneToOne({ entity: () => Asset, eager: true })
  courseImage: Asset;

  @OneToOne({ entity: () => Asset, eager: true })
  promotionalVideo: Asset;

  @ManyToMany(() => User)
  instructors = new Collection<User>(this);

  @ManyToMany(() => User)
  moderators = new Collection<User>(this);

  @ManyToOne(() => Organization, { eager: true })
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

  @OneToMany(() => CourseMaterial, (material) => material.course, {
    orderBy: { order: 1 },
  })
  courseMaterial = new Collection<CourseMaterial>(this);

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollment = new Collection<Enrollment>(this);

  @Enum(() => CourseStatus)
  status = CourseStatus.DRAFT;

  @Property({ default: 0 })
  rating: number;

  @Property({ default: 0 })
  ratingCount: number;

  @Embedded(() => CourseSettings)
  settings?: CourseSettings = new CourseSettings();
}
