import { RequestContext } from '@mikro-orm/core';
import * as express from 'express';
import { v4 } from 'uuid';
import { AssetFactory } from '../../config/seeders/factories/AssetFactory';
import { Course } from '../../models/course.model';
import { Organization } from '../../models/organization.model';
import { createResponse } from '../../utils/response-mapper';

export const coursesRouter = express.Router();

// list courses
coursesRouter.get('/');

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
  em.persistAndFlush(course)
    .then((r) => {
      res.json(createResponse(course, 201, 'Successfully created the course'));
    })
    .catch(next);
});

// update existing a course
coursesRouter.put('/:id');
