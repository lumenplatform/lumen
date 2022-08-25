import { RequestContext, wrap } from '@mikro-orm/core';
import { Attempt } from '../models/attempt.model';
import { Quiz } from '../models/quiz.model';
import { AttemptService } from '../services/attempt.service';

export class QuizController {
  constructor(private attempt: AttemptService) {}

  async createNewQuiz(data: any) {
    const em = RequestContext.getEntityManager();
    const quiz = await em.create(Quiz, data);
    em.persist(quiz);
    em.flush();
    return quiz.id;
  }

  async getQuizById(id: string, user) {
    let result;
    const em = RequestContext.getEntityManager();
    result = await em.findOneOrFail(
      Quiz,
      { id: id },
      { populate: ['questions', 'questions.answers'] }
    );
    /*     result = await em.findOneOrFail(
      Quiz,
      { id: id },
      {
        fields: [
          'settings.title',
          'createdAt',
        ],
      }
    ); */
    return result;
  }

  async updateQuiz(id: string, data: any) {
    const em = RequestContext.getEntityManager();
    const quiz = await em.findOneOrFail(Quiz, { id: id } , { populate: ['questions', 'questions.answers'] });
    quiz.questions.removeAll();
    wrap(quiz).assign({
      settings: data.settings,
      questions: data.questions,
    });
    await em.flush();
    return quiz;
  }

  async getQuizDetailsById(id: string) {
    const em = RequestContext.getEntityManager();
    const quiz = await em.findOneOrFail(Quiz, { id: id }); //TODO send only required fields
    return quiz;
  }

  async getAttemptById(id: string) {
    return await this.attempt.getAttemptById(id);
  }

  async updateAttempt(attemptId: string, data: any) {
    return await this.attempt.updateSubmssion(attemptId, data);
  }

  async createAttempt(id: string, user) {
    const em = RequestContext.getEntityManager();
    const attemptId = await this.attempt.createNewAttempt(id, user.uid);
    return attemptId;
  }

  async completeAttempt(quizId: string, attemptId: string, data: any) {
    const marks = this.attempt.completeAttempt(quizId, attemptId, data);
    return marks;
  }

  async getResults(id: string) {
    const em = RequestContext.getEntityManager();
    const attempt = await em.findOneOrFail(
      Attempt,
      { id: id },
      { populate: ['quiz', 'submission', 'submission.question'] }
    ); //TODO send only required fields
    return attempt;
  }
}
