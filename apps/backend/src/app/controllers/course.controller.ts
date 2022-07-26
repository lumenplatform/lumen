import { RequestContext } from '@mikro-orm/core';
import Stripe from 'stripe';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';
import { PaymentService } from '../services/payment.service';


export class CourseController {

  stripe =  new Stripe( process.env.STRIPE_SECRET,{apiVersion:'2020-08-27'});

  async getCourseByID(id: string) {
    const em = RequestContext.getEntityManager();
    return em.findOneOrFail(Course, { courseId: id });
  }

  async enroll(req, res, id: string) {
    const course = await this.getCourseByID(id);
    const payment = new PaymentService();
    payment.acceptEnrollmentPayment(req, res, course);
  }

  async enrollSuccess(req, res) {
    const payment = new PaymentService();
    const {userId,courseId,price} = await payment.successPayment(req.session_id);
    (new CourseService()).addEnrollment(userId, courseId , price);
    res.redirect(`/student/${courseId}`);
  }
}
