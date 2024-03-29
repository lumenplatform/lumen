import { createResponse } from '../utils/response-mapper';

export default (error, req, res, next) => {
  console.log(error);
  if (res.headerSent) {
    return next(error);
  }

  if (error.name == 'ValidationError') {
    res.status(400).send(createResponse(undefined, 400, error.name, error));
  } else if (error.statusCode) {
    res
      .status(error.statusCode)
      .send(createResponse(undefined, error.statusCode, error.message));
  } else {
    res
      .status(500)
      .send(createResponse(undefined, 500, 'Unable to process Request'));
  }
};
