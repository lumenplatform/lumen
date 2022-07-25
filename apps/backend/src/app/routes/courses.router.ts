import * as express from 'express';
import * as Yup from 'yup';
import { CourseController } from '../controllers/course.controller';
import { validate } from '../middleware/validation';
import { createResponse } from './../utils/response-mapper';

export const coursesRouter = express.Router();

const courseController = new CourseController();

// search courses
coursesRouter.get('/', async (req, res) => {
  console.log(req.query);
  const courses = await courseController.Search(req.query);
  res.json(createResponse(courses));
});

// get enrolled courses
coursesRouter.get('/enrolled');

// get enrolled courses
coursesRouter.get('/upcoming-events');

// get a specific courses
// includes additional details like
coursesRouter.get('/:id');

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
    const review = await courseController.AddReview(req.params.id, req.body);
    res.json(createResponse(review));
  }
);

coursesRouter.get('/:id/material');
