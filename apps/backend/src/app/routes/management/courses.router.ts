import * as express from 'express';

export const coursesRouter = express.Router();

// list courses
coursesRouter.get('/');

// create courses
coursesRouter.post('/');

// update existing a course
coursesRouter.put('/:id');
