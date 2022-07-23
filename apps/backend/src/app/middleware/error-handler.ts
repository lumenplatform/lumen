import { createResponse } from '../utils/response-mapper';

export default (error, req, res, next) => {
  console.log(error);
  if (res.headerSent) {
    return next(error);
  }

  if (error.name == 'ValidationError') {
    res.send(createResponse(undefined, 400, error.name, error));
  } else {
    res.send(createResponse(undefined, 500, 'Error Processing Request'));
  }
};
