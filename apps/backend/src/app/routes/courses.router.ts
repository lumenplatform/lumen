import * as express from 'express';
import * as Yup from 'yup';
import { CourseController } from '../controllers/course.controller';
import { validate } from '../middleware/validation';
import { CourseService } from '../services/course.service';
import { SMTPMailService } from '../services/email.service';
import { StripePaymentService } from '../services/payment.service';
import { createResponse } from './../utils/response-mapper';

export const coursesRouter = express.Router();

const stripePaymentService = new StripePaymentService();
const smtpMailService = new SMTPMailService();
const courseService = new CourseService();
const courseController = new CourseController(
  stripePaymentService,
  smtpMailService,
  courseService
);

// search courses
coursesRouter.get('/', async (req, res) => {
  console.log(req.query);
  const courses = await courseController.search(req.query);
  res.json(createResponse(courses));
});

// get enrolled courses
coursesRouter.get('/enrolled');

// get enrolled courses
coursesRouter.get('/upcoming-events');

// get a specific courses
// includes additional details like
coursesRouter.get('/:id', (req, res, next) => {
  courseController
    .getCourseByID(req.params.id)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

coursesRouter.get('/:id/reviews');

coursesRouter.post(
  '/:id/reviews',
  validate({
    body: Yup.array(
      Yup.object({
        url: Yup.string().url('invalid valid URL').required(),
        rating: Yup.number().required(),
        review: Yup.string(),
      })
    ).min(1),
  }),
  async (req, res) => {
    const review = await courseController.addReview(req.params.id, req.body);
    res.json(createResponse(review));
  }
);

coursesRouter.get('/:id/material');

coursesRouter.post('/:id/enroll', (req, res, next) => {
  courseController
    .enroll(req, req.user, req.params.id)
    .then((result) => {
      res.redirect(303, result);
    })
    .catch(next);
});

coursesRouter.get('/:id/enroll/success', (req, res, next) => {
  courseController
    .enrollSuccess(req.query.session_id)
    .then((result) => {
      res.redirect(result);
    })
    .catch(next);
});
