import { RequestContext } from '@mikro-orm/core';
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { Payment } from '../models/payment.model';

export class CourseService {
  async addEnrollment(txnId, user, course, price) {
    const payment = new Payment(txnId, price);
    const enrollment = new Enrollment(user, course, payment);
    const em = RequestContext.getEntityManager();
    em.persistAndFlush(enrollment);
  }

  async updateCourseInfo(courseId: string, data: Partial<Course>) {
    const em = RequestContext.getEntityManager();
    const crs = await em.findOneOrFail(Course, { courseId });
    em.assign(crs, { courseId, ...data }, { em });
    await em.persistAndFlush(crs);
    return crs;
  }
}
