import {
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Course } from './course.model';
import { CourseReview } from './CourseReview';
import { Payment } from './Payment';
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

  @OneToMany(() => CourseReview, (review) => review.enrollment)
  review: CourseReview;
}
