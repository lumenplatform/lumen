import { RequestContext, wrap } from '@mikro-orm/core';
import { Attempt, AttemptStatus } from '../models/attempt.model';
import { Quiz } from '../models/quiz.model';
import { Submission } from '../models/submission.model';
import { AttemptService } from '../services/attempt.service';
import { ForbiddenException } from '../utils/errors';

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
    const quiz = await em.findOneOrFail(
      Quiz,
      { id: id },
      { populate: ['questions', 'questions.answers'] }
    );
    quiz.questions.removeAll();
    wrap(quiz).assign({
      settings: data.settings,
      questions: data.questions,
    });
    await em.flush();

    const attempts = await em.find(Attempt, { quiz: id });
    attempts.forEach(async (attempt) => {
      await this.attempt.completeAttempt(quiz.id, attempt.id);
    });
    return quiz;
    await em.flush();
  }

  async getQuizDetailsById(id: string) {
    const em = RequestContext.getEntityManager();
    const quiz = await em.findOneOrFail(Quiz, { id: id }); //TODO send only required fields
    return quiz;
  }

  async getAttemptById(id: string) {
    const attempt = await this.attempt.getAttemptById(id);
    return attempt;
  }

  async getAttempts(quizId: string) {
    return await this.attempt.getAttemptsByQuizId(quizId);
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
    await this.attempt.updateSubmssion(attemptId, data);
    return await this.attempt.completeAttempt(quizId, attemptId);
  }

  async getResults(attemptId: string) {
    const em = RequestContext.getEntityManager();
    const attempt = await em.findOneOrFail(
      Attempt,
      { id: attemptId },
      { populate: ['quiz', 'submission', 'submission.question'] }
    ); //TODO send only required fields
    return attempt;
  }

  async markSubmission(
    quizId: string,
    attemptId: string,
    submissionId: string,
    data: any
  ) {
    return await this.attempt.markSubmission(
      quizId,
      attemptId,
      submissionId,
      data.marks
    );
  }

  async getSubmissionsByQuestion(quizId: string, questionId: string) {
    const em = RequestContext.getEntityManager();
    const submissions = await em.find(
      Submission,
      {
        question: questionId,
      },
      { populate: ['attempt'] }
    );
    return submissions;
  }

  async releaseMarks(attemptId: string) {
    await this.attempt.releaseMarks(attemptId);
    return('Marks released for attempt ' + attemptId);
  }

  async getAttemptsOfUser(userId: string,courseId: string) {
    return await this.attempt.getAttemptsByCourseIdAndUserId(userId , courseId);
  }
}
