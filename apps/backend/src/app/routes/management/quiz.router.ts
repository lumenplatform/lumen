import * as express from 'express';
import { QuizController } from '../../controllers/quiz.controller';
import { createResponse } from './../../utils/response-mapper';
import { AttemptService } from '../../services/attempt.service';

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

quizRouter.post(
  '/:id/attempt/:attemptId/submission/:submissionId/mark',
  (req, res, next) => {
    quizController
      .markSubmission(
        req.params.id,
        req.params.attemptId,
        req.params.submissionId,
        req.body
      )
      .then((result) => {
        res.json(createResponse(result));
      })
      .catch(next);
  }
);

quizRouter.get('/:id/attempts', (req, res, next) => {
  quizController
    .getAttempts(req.params.id)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

quizRouter.get('/:id/question/:questionId/submission', (req, res, next) => {
  console.log(req.query);
  quizController
    .getSubmissionsByQuestionId(req.params.id, req.params.questionId ,req.query.marking,req.query.releasing)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

quizRouter.get(
  '/:id/submission/:SubmissionId',
  (req, res, next) => {
    quizController
      .getSubmissionById(req.params.SubmissionId)
      .then((result) => {
        res.json(createResponse(result));
      })
      .catch(next);
  }
);

quizRouter.post('/:id/attempt/:attemptId/release', (req, res, next) => {
  quizController
    .releaseMarks(req.params.attemptId)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

quizRouter.post('/:id/release', (req, res, next) => {
  quizController
    .releaseAllMarks(req.params.id)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
}
);
