import { RequestContext } from '@mikro-orm/core';
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { Payment } from '../models/Payment';
import { User } from '../models/user.model';

export class CourseService {
  private course: Course;

  constructor(course = undefined) {
    this.course = new Course();
  }

  /* const em = RequestContext.getEntityManager();
    return em.findOneOrFail(Course, { courseId: id }); */
  async addEnrollment(userId, courseId , price) {
    const em = RequestContext.getEntityManager();
    const enrollment = new Enrollment();
    enrollment.user = await em.findOneOrFail(User, { uid: userId });
    enrollment.course = await em.findOneOrFail(Course, { courseId: courseId });
    enrollment.payment = new Payment('sfsfsdfsd', price);
    em.persistAndFlush(enrollment);
  }
}
