import { RequestContext } from '@mikro-orm/core';
import * as express from 'express';
import { CourseController } from '../controllers/course.controller';
import { CourseMaterial } from '../models/course-material.model';
import { createResponse } from './../utils/response-mapper';
export const coursesRouter = express.Router();

const courseController = new CourseController();

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
    .enroll(req, res, req.params.id)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});