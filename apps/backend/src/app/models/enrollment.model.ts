import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CourseMaterial } from './course-material.model';
import { Course } from './course.model';
import { Payment } from './payment.model';
import { CourseReview } from './review.mode';
import { User } from './user.model';

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}

@Entity()
export class Enrollment {
  @PrimaryKey()
  enrollmentId: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Course)
  course: Course;

  @Property()
  enrollmentDate: Date;

  @ManyToOne(() => Payment)
  payment: Payment;

  @Enum(() => EnrollmentStatus)
  status: EnrollmentStatus;

  @OneToMany(() => CourseReview, (review) => review.enrollment, {
    nullable: true,
  })
  review: CourseReview;

  @ManyToMany({
    entity: () => CourseMaterial,
    pivotEntity: () => CompletedTopic,
  })
  completedTopics = new Collection<CourseMaterial>(this);

  constructor(
    enrollmentId,
    user,
    course,
    payment,
    enrollmentDate = new Date(),
    status = EnrollmentStatus.ACTIVE
  ) {
    this.enrollmentId = enrollmentId;
    this.user = user;
    this.course = course;
    this.payment = payment;
    this.enrollmentDate = enrollmentDate;
    this.status = status;
  }
}

@Entity()
export class CompletedTopic {
  @ManyToOne({ entity: () => Enrollment, primary: true })
  enrollment: Enrollment;

  @ManyToOne({ entity: () => CourseMaterial, primary: true })
  topic: CourseMaterial;

  @Property({ defaultRaw: 'now()' })
  createdAt: Date;
}
