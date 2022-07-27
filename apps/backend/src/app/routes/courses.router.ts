import { RequestContext } from '@mikro-orm/core';
import * as express from 'express';
import { CourseController } from '../controllers/course.controller';
import { CourseMaterial } from '../models/course-material.model';
import { CourseService } from '../services/course.service';
import { SMTPMailService } from '../services/email.service';
import { StripePaymentService } from '../services/payment.service';
import { createResponse } from './../utils/response-mapper';
export const coursesRouter = express.Router();

const stripePaymentService =  new StripePaymentService();
const smtpMailService = new SMTPMailService();
const courseService = new CourseService();
const courseController = new CourseController(stripePaymentService,smtpMailService,courseService);

// search courses
coursesRouter.get('/');

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

coursesRouter.get('/:id/material');

coursesRouter.post('/:id/enroll' ,(req, res, next) => {
  courseController
    .enroll(req,req.user,req.params.id)
    .then((result) => {
      res.redirect(303, result);
    })
    .catch(next);
});

coursesRouter.get('/:id/enroll/success' ,(req, res, next) => {
  courseController
    .enrollSuccess(req.query.session_id)
    .then((result) => {
      res.redirect(result);
    })
    .catch(next);
});