import {
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Course } from './course.model';
import { CourseReview } from './review.mode';
import { Payment } from './payment.model';
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

  constructor(enrollmentId,user,course,payment,enrollmentDate = new Date(),status = EnrollmentStatus.ACTIVE){
    this.enrollmentId = enrollmentId;
    this.user = user;
    this.course = course;
    this.payment = payment;
    this.enrollmentDate = enrollmentDate;
    this.status = status;
  }
}
