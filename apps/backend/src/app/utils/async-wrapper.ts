import { RequestHandler } from 'express';
import { createResponse } from './response-mapper';

export function asyncHandler<B>(fn: RequestHandler<B>) {
  return async (req, res, next) => {
    try {
      const controllerResponse = await fn(req, res, next);
      if (controllerResponse != null) {
        res.json(createResponse(controllerResponse));
      }
    } catch (error) {
      next(error);
    }
  };
}
