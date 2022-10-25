import { RequestContext } from '@mikro-orm/core';
import * as express from 'express';
import * as Yup from 'yup';
import { CourseController } from '../controllers/course.controller';
import { QuizController } from '../controllers/quiz.controller';
import { validate } from '../middleware/validation';
import { Course } from '../models/course.model';
import { AttemptService } from '../services/attempt.service';
import { CourseService } from '../services/course.service';
import { EmailTemplate } from '../services/mail/email-types';
import { MailJetService } from '../services/mail/mailjet.service';
import { StripePaymentService } from '../services/payment.service';
import { quizRouter } from './../routes/quiz.router';
import { createResponse, sendJSON } from './../utils/response-mapper';

export const coursesRouter = express.Router();

const stripePaymentService = new StripePaymentService();
const mailService = new MailJetService();
const courseService = new CourseService();
const courseController = new CourseController(
  stripePaymentService,
  mailService,
  courseService
);

const attemptService = new AttemptService();
const quizController = new QuizController(attemptService);

// search courses
coursesRouter.get('/', async (req, res) => {
  console.log(req.query);
  const courses = await courseController.search(req.query);
  res.json(createResponse(courses));
});

coursesRouter.get('/enrolled', async (req, res, next) => {
  courseController
    .getEnrolledCourses(req.user.uid)
    .then(sendJSON(res))
    .catch(next);
});

coursesRouter.get('/recommended', async (req, res, next) => {
  courseController
    .getRecommendedCourses(req.user.uid)
    .then(sendJSON(res))
    .catch(next);
});

coursesRouter.get('/testemail4', async (req, res, next) => {
  const course = await RequestContext.getEntityManager().find(Course,{},{limit:1}).then(r=>r[0])
  mailService.sendMail('sumuduwathsala80@gmail.com',{template:EmailTemplate.COURSE_COMPLETION,data:{course}}).then(k=>res.json(k))
});

//Email 
coursesRouter.get('/testmail3', async (req, res, next) => {
  const course = await RequestContext.getEntityManager().find(Course,{},{limit:1}).then(r=>r[0])
  mailService.sendMail('sumuduwathsala80@gmail.com',{template:EmailTemplate.COURSE_INVITATION,data:{course}}).then(k=>res.json(k))
});

// course enrollment email
coursesRouter.get('/upcoming-events');
coursesRouter.get('/testemail', async (req, res, next) => {
  const course = await RequestContext.getEntityManager().find(Course,{},{limit:1}).then(r=>r[0])
  mailService.sendMail('ruwaniwelewatta@gmail.com',{template:EmailTemplate.COURSE_ENROLLMENT,data:{course}}).then(k=>res.json(k))
});

// platform invitation email
coursesRouter.get('/testemail2', async (req, res, next) => {
  const course = await RequestContext.getEntityManager().find(Course,{},{limit:1}).then(r=>r[0])
  mailService.sendMail('ruwaniwelewatta@gmail.com',{template:EmailTemplate.PLATFORM_INVITATION,data:{course}}).then(k=>res.json(k))
});

//course completion 
coursesRouter.get('/testemail3', async (req, res, next) => {
  const course = await RequestContext.getEntityManager().find(Course,{},{limit:1}).then(r=>r[0])
  mailService.sendMail('ruwaniwelewatta@gmail.com',{template:EmailTemplate.COURSE_COMPLETION,data:{course}}).then(k=>res.json(k))
});

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

coursesRouter.get('/:id/material', (req, res, next) => {
  const em = RequestContext.getEntityManager();
  const { id } = req.params;
  em.findOneOrFail(Course, { courseId: id }, { populate: ['courseMaterial'] })
    .then((r) => r.courseMaterial)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

coursesRouter.post('/:id/enroll', (req, res, next) => {
  courseController
    .enroll(req, req.user.uid, req.params.id)
    .then((result) => {
      res.json(createResponse({ paymentUrl: result }));
    })
    .catch(next);
});

coursesRouter.get('/:id/enroll/success', (req, res, next) => {
  courseController
    .enrollSuccess(req.query.session_id)
    .then((result) => {
      // give the front end url to redirect to
      res.redirect(result);
    })
    .catch(next);
});

//get all quiz-attempts and grades of the user of a course
coursesRouter.get('/:id/attempts', (req, res, next) => {
  quizController
    .getAttemptsOfUser(req.user.uid, req.params.id)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

coursesRouter.post('/:id/complete-topic/:topicId', (req, res, next) => {
  courseController
    .markTopicAsCompleted(req.user.uid, req.params.id, req.params.topicId)
    .then(sendJSON(res))
    .catch(next);
});

//course status update
coursesRouter.get('/current', (req, res, next) => {
  courseController
    .getCourseByID(req.user.uid)
    .then(sendJSON(res, 200))
    .catch(next);
});

coursesRouter.post('/current', (req, res, next) => {
  courseController
    .updateCourseInformation(req.user.uid, req.body)
    .then(sendJSON(res, 200))
    .catch(next);
});


coursesRouter.use('/:id/quiz', quizRouter);

