import * as express from 'express';
import { json } from 'body-parser';
import { authRouter } from './auth.router';
import { injectUser } from '../middleware/security';

export const indexRouter = express.Router();

indexRouter.use(json());
indexRouter.use(injectUser);

indexRouter.use('/auth', authRouter);

indexRouter.use((error, req, res, next) => {
  console.log(error);
  if (res.headerSent) {
    return next(error);
  }

  res.send({
    success: false,
    message: error.message,
    statusCode: error.statusCode,
    data: null,
  });
});
