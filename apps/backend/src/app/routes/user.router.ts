import * as express from 'express';

export const userRouter = express.Router();

userRouter.get('/profile');

userRouter.put('/profile');

userRouter.get('/course-history');
