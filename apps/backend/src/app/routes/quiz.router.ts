import * as express from 'express';
import { QuizController } from '../controllers/quiz.controller';
import { createResponse } from './../utils/response-mapper';


export const quizRouter = express.Router();
const quizController = new QuizController();


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
    .getQuizByID(req.params.id, req.user)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

quizRouter.put('/:id', (req, res, next) => {
  quizController
    .updateQuiz(req.params.id, req.body, req.user)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

quizRouter.post('/:id/submit', (req, res, next) => {
  quizController
    .submitQuiz(req.params.id, req.body, req.user)
    .then((result) => {
      res.redirect(301,result);
    })
});
