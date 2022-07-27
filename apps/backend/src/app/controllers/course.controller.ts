import { RequestContext } from '@mikro-orm/core';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';
import { CourseService } from '../services/course.service';
import { MailService } from '../services/email.service';
import { PaymentService } from '../services/payment.service';

export class CourseController {
  constructor(
    private payment: PaymentService,
    private mail: MailService,
    private courseService: CourseService
  ) {}

  async getCourseByID(id: string) {
    const em = RequestContext.getEntityManager();
    return em.findOneOrFail(Course, { courseId: id });
  }

  async enroll(req, userId, courseId) {
    const course = await this.getCourseByID(courseId);
    const user: User = new User();
    const em = RequestContext.getEntityManager();
    /* const user = await em.findOneOrFail(User,{}); */
    const domain = `${req.protocol == 'https' ? 'https:' : 'http'}://${req.get(
      'host'
    )}`;
    console.log(domain);
    const redirectUrl = await this.payment.acceptEnrollmentPayment(
      user,
      course,
      domain
    );
    return redirectUrl;
  }

  async enrollSuccess(sessionId) {
    const { user, course, price } = await this.payment.getPaymentDetails(
      sessionId
    );
    this.courseService.addEnrollment(user, course, price);
    //this.mail.sendMail()
    return `/student/${course.courseId}`;
  }
}
