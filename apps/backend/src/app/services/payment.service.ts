import { RequestContext } from '@mikro-orm/core';
import Stripe from 'stripe';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';

const stripeSecretKey = process.env.STRIPE_SECRET;

type PaymentBill = {
  user: User;
  course: Course;
  price: any;
};
export interface PaymentService {
  acceptEnrollmentPayment(user: User, course: Course, domain: string): Promise<string>;
  getPaymentDetails(sessionId: string): Promise<PaymentBill>;
}

export class StripePaymentService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(stripeSecretKey, { apiVersion: '2020-08-27' });
  }

  async acceptEnrollmentPayment(user :User, course : Course, domain : string) {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {         //metadata : {user: user.uid , course : course.courseId}
          price_data: {
            currency: 'lkr',
            product_data:{
              name: course.title
            },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${domain}/api/courses/${course.courseId}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/courses/${course.courseId}`,
    });
    return session.url;
  }

  async getPaymentDetails(session_id) {
    const session = await this.stripe.checkout.sessions.retrieve(session_id);
    const em = RequestContext.getEntityManager();
    const user = await em.findOneOrFail(User, { uid: session.metadata.userId });
    const course = await em.findOneOrFail(Course, { courseId: session.metadata.courseId });
    const paymentDetails: PaymentBill = {
      user: user,
      course: course,
      price: session.line_items.data[0].price,
    };
    return paymentDetails;
  }
}
