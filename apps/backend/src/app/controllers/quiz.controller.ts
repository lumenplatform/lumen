import { RequestContext, wrap } from '@mikro-orm/core';
import { Attempt, AttemptStatus } from '../models/attempt.model';
import { Quiz } from '../models/quiz.model';
import { Submission } from '../models/submission.model';
import { AttemptService } from '../services/attempt.service';
import { ForbiddenException } from '../utils/errors';

export class QuizController {
  constructor(private attempt: AttemptService) {}

  //create new quiz
  async createNewQuiz(data: any) {
    const em = RequestContext.getEntityManager();
    const quiz = await em.create(Quiz, data);
    em.persist(quiz);
    em.flush();
    return quiz.id;
  }

  //get quiz by id
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

  //update quiz
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

    const attempts = await em.find(Attempt, {
      quiz: id,
      attemptStatus: AttemptStatus.COMPLETED,
    });
    attempts.forEach(async (attempt) => {
      await this.attempt.markAttempt(attempt.id);
    });
    return quiz;
  }

  //
  async getQuizDetailsById(id: string) {
    const em = RequestContext.getEntityManager();
    const quiz = await em.findOneOrFail(Quiz, { id: id }); //TODO send only required fields
    return quiz;
  }

  //get attempts by attempt id
  async getAttemptById(id: string) {
    const attempt = await this.attempt.getAttemptById(id);
    return attempt;
  }

  //get attempts of a quiz
  async getAttempts(quizId: string) {
    return await this.attempt.getAttemptsByQuizId(quizId);
  }

  //update attempt
  async updateAttempt(attemptId: string, data: any) {
    return await this.attempt.updateSubmssion(attemptId, data);
  }

  //create new attempt
  async createAttempt(id: string, user) {
    const em = RequestContext.getEntityManager();
    const attemptId = await this.attempt.createNewAttempt(id, user.uid);
    return attemptId;
  }

  //complete attempt
  async completeAttempt(quizId: string, attemptId: string, data: any) {
    await this.attempt.updateSubmssion(attemptId, data);
    return await this.attempt.completeAttempt(quizId, attemptId);
  }

  //get results of a attempt
  async getResults(attemptId: string) {
    const em = RequestContext.getEntityManager();
    const attempt = await em.findOneOrFail(
      Attempt,
      { id: attemptId },
      { populate: ['quiz', 'submission', 'submission.question'] }
    ); //TODO send only required fields
    return attempt;
  }

  //mark a submission
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

  //get all submisision for a question
  async getSubmissionsByQuestionId(
    quizId: string,
    questionId: string,
    marking: any,
    releasing: any
  ) {
    const em = RequestContext.getEntityManager();
    const submissions = await em.find(Submission, {
      $and: [
        { question: questionId },
        marking != 'ALL' ? { markingStatus: marking } : {},
        releasing != 'ALL' ? { attempt: { releasedStatus: releasing } } : {},
      ],
    });
    console.log(marking);
    console.log(submissions);
    return submissions;
  }

  //get submission by id
  async getSubmissionById(submissionId: string) {
    const em = RequestContext.getEntityManager();
    const submission = await em.findOneOrFail(
      Submission,
      { id: submissionId },
      { populate: ['attempt', 'attempt.user', 'question.answers', 'mcqAnswer'] }
    );
    return submission;
  }

  //release attempt marks
  async releaseMarks(attemptId: string) {
    await this.attempt.releaseMarks(attemptId);
    return 'Marks released for attempt ' + attemptId;
  }

  //release all marks of a quiz
  async releaseAllMarks(quizId: string) {
    await this.attempt.releaseAllMarks(quizId);
    return 'Marks released for quiz ' + quizId;
  }

  //get all attempts of a user
  async getAttemptsOfUser(userId: string, courseId: string) {
    return await this.attempt.getAttemptsByCourseIdAndUserId(userId, courseId);
  }
}
