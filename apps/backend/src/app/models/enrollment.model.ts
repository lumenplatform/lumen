import { Course } from './course.model';
import { User } from './user.model';

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}

export class Enrollment {
  user: User;
  course: Course;
  enrollmentDate: Date;
  payment: Payment;
  status: EnrollmentStatus;
  review: CourseReview;
}

export class Payment {
  txnId: string;
  amount: number;
  createdAt: Date;
}

export class CourseReview {
  rating: number;
  review?: string;
  user: User;
}
