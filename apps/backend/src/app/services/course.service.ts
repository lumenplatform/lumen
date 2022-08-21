import { RequestContext } from '@mikro-orm/core';
import { Enrollment } from '../models/enrollment.model';
import { Payment } from '../models/payment.model';

export class CourseService {
  async addEnrollment(txnId, user, course, price) {
    const payment = new Payment(txnId, price);
    const enrollment = new Enrollment(user, course, payment);
    const em = RequestContext.getEntityManager();
    em.persistAndFlush(enrollment);
  }
}
