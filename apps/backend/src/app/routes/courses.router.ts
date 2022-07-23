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
coursesRouter.get('/:id');

coursesRouter.get('/:id/reviews');

coursesRouter.get('/:id/material');
