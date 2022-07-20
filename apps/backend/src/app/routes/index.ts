import * as express from 'express';
import { injectUser } from '../middleware/security';
import { createResponse } from '../utils/response-mapper';
import { authRouter } from './auth.router';
import { contentRouter } from './content.router';

export const indexRouter = express.Router();

indexRouter.use(injectUser);

indexRouter.use('/auth', authRouter);
indexRouter.use('/content', contentRouter);

indexRouter.use((error, req, res, next) => {
  console.log(error);
  if (res.headerSent) {
    return next(error);
  }

  if (error.name == 'ValidationError') {
    res.send(createResponse(undefined, 400, error.name, error));
  } else {
    res.send(createResponse(undefined, 500, 'Error Processing Request'));
  }
});
