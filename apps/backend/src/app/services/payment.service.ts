import { RequestContext } from '@mikro-orm/core';
import Stripe from 'stripe';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';

const stripeSecretKey = process.env.STRIPE_SK;

type PaymentBill = {
  txnId: string;
  user: User;
  course: Course;
  price: any;
};
export interface PaymentService {
  acceptEnrollmentPayment(
    user: User,
    course: Course,
    domain: string
  ): Promise<string>;
  getPaymentDetails(sessionId: string): Promise<PaymentBill>;
}

export class StripePaymentService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(stripeSecretKey, { apiVersion: '2020-08-27' });
  }

  async acceptEnrollmentPayment(user: User, course: Course, domain: string) {
    const session = await this.stripe.checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: course.courseId,
      metadata: { user: user.uid, course: course.courseId },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.description,
              images: [course.courseImage.url],
            },
            unit_amount: course.price * 100,
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
    const user = await em.findOneOrFail(User, { uid: session.metadata.user });
    const course = await em.findOneOrFail(Course, {
      courseId: session.metadata.course,
    });
    const paymentDetails: PaymentBill = {
      txnId: session_id,
      user: user,
      course: course,
      price: course.price,
    };
    return paymentDetails;
  }
}
