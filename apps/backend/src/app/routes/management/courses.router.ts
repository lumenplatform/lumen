import { RequestContext } from '@mikro-orm/core';
import { assert } from 'console';
import * as express from 'express';
import { Asset } from '../../models/asset.model';
import { Course } from '../../models/course.model';
import { Organization } from '../../models/organization.model';
import { createResponse } from '../../utils/response-mapper';
import { quizRouter } from './quiz.router';

export const coursesRouter = express.Router();

// list courses
coursesRouter.get('/', (req, res, next) => {
  const em = RequestContext.getEntityManager();
  em.find(Course, {})
    .then((r) => {
      res.json(createResponse(r));
    })
    .catch(next);
});

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

// list courses
coursesRouter.get('/:id', (req, res, next) => {
  const em = RequestContext.getEntityManager();
  em.findOneOrFail(
    Course,
    { courseId: req.params.id },
    { populate: ['courseMaterial'] }
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

coursesRouter.use('/:id/quiz', quizRouter);