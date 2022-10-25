import { RequestContext } from '@mikro-orm/core';
import { assert } from 'console';
import * as express from 'express';
import { CourseController } from '../../controllers/course.controller';
import { Asset } from '../../models/asset.model';
import { Course , CourseStatus} from '../../models/course.model';
import { Enrollment } from '../../models/enrollment.model';
import { Organization } from '../../models/organization.model';
import { User } from '../../models/user.model';
import { CourseService } from '../../services/course.service';
import { MailJetService } from '../../services/mail/mailjet.service';
import { StripePaymentService } from '../../services/payment.service';
import { createResponse } from '../../utils/response-mapper';
import { quizRouter } from './quiz.router';

export const coursesRouter = express.Router();
const stripePaymentService = new StripePaymentService();
const mailService = new MailJetService();
const courseService = new CourseService();
const courseController = new CourseController(
  stripePaymentService,
  mailService,
  courseService
);

// list courses
coursesRouter.get('/', (req, res, next) => {
  const {searchQuery, publishStatus } = req.query as any;
  console.log(req.query);
  const em = RequestContext.getEntityManager();
  em.find(Course, {
    $and: [
      searchQuery !='' ? { title: { $like: `%${searchQuery}%` } } : {},
      publishStatus !='ALL' ? { status: publishStatus } : {},
    ],
  })
    .then((r) => {
      res.json(createResponse(r));
    })
    .catch(next); 
});

// // get all details about a course
// coursesRouter.get('/:id',(req,res,next) => {
//   const em = RequestContext.getEntityManager();

// });

// create courses
coursesRouter.post('/', async (req, res, next) => {
  const em = RequestContext.getEntityManager();
  const courseObj = req.body;

  const course = em.create(Course, {
    ...courseObj,
    tags: '',
    duration: 100, // calculate ?
    organization: (await em.find(Organization, {}, { limit: 1 }))[0],
  });
  console.log(course);

  for (const item of course.courseMaterial.getItems()) {
    item.course = course;
  }

  em.persistAndFlush(course)
    .then((r) => {
      res.json(createResponse(course, 201, 'Successfully created the course'));
    })
    .catch(next);
});

//add instructors to the course
coursesRouter.post('/:id/instructors', async (req, res, next) => {
  const em = RequestContext.getEntityManager();
  const instructors = req.body;
  const courseId = instructors[0];
  const course = await em.findOneOrFail(Course, { courseId });

  console.log(courseId);

  for (let i = 1; i < instructors.length; i++) {
    console.log(instructors[i]);
    course.instructors.add(em.getReference(User, instructors[i]));
  }

  em.persist(course);
  await em.flush();
  res.status(200).json(course);
  // console.log(instructors[0]);
});

//delete instuctor from the course
coursesRouter.delete('/:courseId/instructors/:uid', async (req, res, next) => {
  const em = RequestContext.getEntityManager();
  const courseId = req.params.courseId;
  const instructorId = req.params.uid;

  const course = await em.findOneOrFail(
    Course,
    { courseId },
    { populate: ['instructors'] }
  );

  course.instructors.set(course.instructors.getItems().filter(r=>r.uid!=instructorId));

  em.persist(course);
  await em.flush();
  res.status(200).json(course);

});

// get course details
coursesRouter.get('/:id', (req, res, next) => {
  const em = RequestContext.getEntityManager();
  em.findOneOrFail(
    Course,
    { courseId: req.params.id },
    { populate: ['courseMaterial', 'instructors'] }
  )
    .then((r) => {
      res.json(createResponse(r));
    })
    .catch(next);
});

// get users enrolled in the given course
coursesRouter.get('/:id/users', (req, res, next) => {
  const em = RequestContext.getEntityManager();
  em.find(
    Enrollment,
    { course: { courseId: req.params.id } },
    { populate: ['user'] }
  )
    .then((r) => {
      res.json(createResponse(r));
    })
    .catch(next);
});

// update existing a course
coursesRouter.put('/:id', async (req, res, next) => {
  const em = RequestContext.getEntityManager();

  const courseObj = req.body;
  courseObj.promotionalVideo = courseObj.promotionalVideo.id;
  courseObj.courseImage = courseObj.courseImage.id;
  delete courseObj.organization;

  const course = await em.findOneOrFail(
    Course,
    { courseId: req.params.id },
    { populate: ['courseMaterial'] }
  );
  assert(courseObj.courseId === course.courseId);

  for (const item of course.courseMaterial.getItems()) {
    item.course = course;
  }

  courseObj.courseMaterial = courseObj.courseMaterial.map((e) => {
    const item = { ...e };
    item.topics?.map((t) => {
      const topic = { ...t };
      if (topic.video && !topic.video.id) {
        topic.video = em.create(Asset, topic.video);
      }

      return topic;
    });

    return item;
  });

  em.assign(course, courseObj, { em });

  em.persistAndFlush(course)
    .then((r) => {
      res.json(createResponse(course, 201, 'Successfully updated the course'));
    })
    .catch(next);
});

coursesRouter.post('/:id/update-status', async (req, res, next) => {
  const em = RequestContext.getEntityManager();
  const course = await em.findOneOrFail(Course, { courseId: req.params.id });
  course.status = req.body.status;
  em.persist(course);
  await em.flush();
  res.json(course);
});

coursesRouter.get('/:id/quizzes', (req, res, next) => {
  courseController
    .getQuizzesByCourseId(req.params.id)
    .then((r) => {
      res.json(createResponse(r));
    })
    .catch(next);
});

coursesRouter.use('/:id/quiz', quizRouter);
