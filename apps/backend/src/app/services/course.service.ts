import { RequestContext } from '@mikro-orm/core';
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { Payment } from '../models/Payment';
import { User } from '../models/user.model';

export class CourseService {
  async addEnrollment(user, course, price) {
    const payment = new Payment('sfsfsdfsd', price);
    const enrollment = new Enrollment('adsadasd', user, course, payment);
    const em = RequestContext.getEntityManager();
    em.persistAndFlush(enrollment);
  }
}