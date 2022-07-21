import * as express from 'express';

export const coursesRouter = express.Router();

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
