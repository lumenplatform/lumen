import * as express from 'express';
import { QuizController } from '../../controllers/quiz.controller';
import { createResponse } from './../../utils/response-mapper';
import {AttemptService} from '../../services/attempt.service';


export const quizRouter = express.Router();
const attemptService = new AttemptService();
const quizController = new QuizController(attemptService);

quizRouter.post('/', (req, res, next) => {
  quizController
    .createNewQuiz(req.body)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

quizRouter.get('/:id', (req, res, next) => {
  quizController
    .getQuizById(req.params.id, req.user)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

quizRouter.put('/:id', (req, res, next) => {
  quizController
    .updateQuiz(req.params.id, req.body)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});
