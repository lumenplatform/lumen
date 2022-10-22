import * as express from 'express';
import { QuizController } from '../controllers/quiz.controller';
import { createResponse } from './../utils/response-mapper';
import { AttemptService } from '../services/attempt.service';

export const quizRouter = express.Router();

const attemptService = new AttemptService();
const quizController = new QuizController(attemptService);

// get quiz
quizRouter.get('/:id', (req, res, next) => {
  quizController
    .getQuizById(req.params.id, req.user)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

//create attempt
quizRouter.post('/:id/attempt/create', (req, res, next) => {
  quizController
    .createAttempt(req.params.id, req.user)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

//get attempt
quizRouter.get('/:id/attempt/:attemptId', (req, res, next) => {
  quizController
    .getAttemptById(req.params.attemptId)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

//update attempt
quizRouter.post('/:id/attempt/:attemptId/update', (req, res, next) => {
  quizController
    .updateAttempt(req.params.attemptId, req.body)
    .then((result) => {
      res.json(createResponse(result));
    }).catch(next);
  });

//complete attempt
quizRouter.post('/:id/attempt/:attemptId/complete', (req, res, next) => {
  quizController
    .completeAttempt(req.params.id, req.params.attemptId, req.body)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

//get attempt results
quizRouter.get('/:id/attempt/:attemptId/results', (req, res, next) => {
  quizController
    .getResults(req.params.attemptId)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});
