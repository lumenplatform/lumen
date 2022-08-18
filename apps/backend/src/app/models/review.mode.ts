import { AfterCreate, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Enrollment } from './enrollment.model';
import { User } from './user.model';

@Entity()
export class CourseReview {
  @Property()
  rating: number;

  @Property()
  review?: string;

  @ManyToOne(() => User, { primary: true })
  user: User;

  @ManyToOne(() => Enrollment, { primary: true })
  enrollment: Enrollment;

  @AfterCreate()
  afterCreate() {
    const course = this.enrollment.course
    course.rating = (course.rating * course.ratingCount + this.rating) / (course.ratingCount + 1)
    course.ratingCount = course.ratingCount + 1 
  }
}
