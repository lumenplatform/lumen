import Stripe from 'stripe';
import { Course } from '../models/course.model';
import { Payment } from '../models/Payment';

const secretKey = process.env.STRIPE_SECRET;

export class PaymentService {
    private stripe: Stripe;
    constructor() {
      this.stripe =  new Stripe( secretKey,{apiVersion:'2020-08-27'});
    }

    async  acceptEnrollmentPayment(req, res ,course :Course) {
        const domain = `${req.protocol == 'https' ? 'https:' : 'http'}://${req.host}`;
        const uid = req.user.id;
        const {courseId , price} = course;

        const session = await this.stripe.checkout.sessions.create({
        metadata: {
            userId: uid,
            courseId: courseId,
        },
        line_items: [
            {
            price: `${price}`,
            quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${domain}/courses/${courseId}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domain}/courses/${courseId}`,
        });
    res.redirect(303, session.url);
    }

    async successPayment(session_id) {
        const session =   await this.stripe.checkout.sessions.retrieve(session_id);
        return {
            userId: session.metadata.userId,
            courseId: session.metadata.courseId,
            price: session.line_items.data[0].price,
        }
    }
}