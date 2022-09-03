import { RequestContext, wrap } from '@mikro-orm/core';
import { Attempt, AttemptStatus, MarkingStatus } from '../models/attempt.model';
import { Question, QuestionsType } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
import { Submission } from '../models/submission.model';
import { User } from '../models/user.model';

export class AttemptService {
  async getOngoingAttempt(userId: string, quizId: string) {
    const em = RequestContext.getEntityManager();
    const user = await em.findOneOrFail(User, { uid: userId });
    const quiz = await em.findOneOrFail(Quiz, { id: quizId });
    const currentTime = new Date().getTime(); //in mili-seconds
    const attempt = await em.findOne(
      Attempt,
      {
        user: user,
        quiz: quiz,
        completedAt: null,
        startedAt: {
          $gte: new Date(
            currentTime -
              quiz.settings.duration.durationMinutes * 60 * 1000 -
              quiz.settings.duration.durationSeconds * 1000
          ),
        },
      },
      { populate: ['submission', 'submission.mcqAnswer'] }
    );
    return attempt;
  }

  async createNewAttempt(quizId: string, userId: string) {
    let attempt;
    const em = RequestContext.getEntityManager();
    const user = await em.findOneOrFail(User, { uid: userId });
    const quiz = await em.findOneOrFail(Quiz, { id: quizId });
    attempt = await this.getOngoingAttempt(userId, quizId);
    if (attempt == null) {
      attempt = await em.create(Attempt, { quiz: quiz, user: user });
      attempt.attemptStatus = AttemptStatus.STARTED;
      await em.persistAndFlush(attempt);
    }
    return attempt.id;
  }

  async updateSubmssion(attemptId: string, submissions: any) {
    const em = RequestContext.getEntityManager();
    const attempt = await em.findOneOrFail(
      Attempt,
      { id: attemptId },
      { populate: ['submission', 'submission.mcqAnswer'] }
    );
    attempt.submission.removeAll();
    //attempt.attemptStatus = AttemptStatus.ONGOING;
    submissions.forEach((s) => {
      const submission = new Submission();
      wrap(submission).assign(
        {
          question: s.question,
          mcqAnswer: s.mcqAnswer.map((o) => o.id),
          essayAnswer: s.essayAnswer,
          flag: s.flag,
          answered: s.answered,
        },
        { em: em }
      );
      attempt.submission.add(submission);
    });
    await em.flush();
  }

  async completeAttempt(quizId: string, attemptId: string) {
    console.log('asdasdkasdkljaskldjaslkdja3');

    const em = RequestContext.getEntityManager();
    const attempt = await em.findOneOrFail(
      Attempt,
      { id: attemptId },
      { populate: ['quiz'] }
    );
    console.log(attempt);
    attempt.completedAt = new Date(); //mark as completed
    attempt.marks = 0; //reset marks
    attempt.attemptStatus = AttemptStatus.COMPLETED; //mark as completed
    attempt.quiz.noOfAttempts = +1; //increment no of attempts
    console.log('num attepmets', attempt.quiz.noOfAttempts);
    await this.markAttempt(attemptId); //mark attempt
    await em.flush();
  }

  async getAttemptsByQuizId(quizId: string) {
    const em = RequestContext.getEntityManager();
    const attempts = await em.find(
      Attempt,
      { quiz: quizId },
      { populate: ['user', 'submission'] }
    );
    return attempts;
  }

  async getAttemptById(attemptId: string) {
    const em = RequestContext.getEntityManager();
    const attempt = await em.findOneOrFail(
      Attempt,
      { id: attemptId },
      { populate: ['user', 'submission', 'submission.mcqAnswer'] }
    );
    return attempt;
  }

  async markAttempt(attemptId: string) {
    const em = RequestContext.getEntityManager();
    const attempt = await em.findOneOrFail(
      Attempt,
      { id: attemptId },
      { populate: ['submission', 'submission.mcqAnswer'] }
    );
    const questions = await em.find(
      Question,
      { exam: attempt.quiz.id },
      { populate: ['answers'] }
    );

    attempt.submission.getItems().forEach((s) => {
      const question = questions.find((obj) => {
        return obj.id == s.question.id;
      });

      //check if question is MCQ
      if (question && question.type == QuestionsType.MCQ && question.answers) {
        //get correct answer
        const correctAnswer = question.answers.getItems().filter((obj) => {
          return obj.correct == true;
        });

        const correctAnswerIds = correctAnswer.map((obj) => {
          return obj.id;
        });

        //if question is not answered
        if (!s.answered) {
          s.correct = false;
          s.marks = 0;
          s.markingStatus = MarkingStatus.MARKED;
        } else if (correctAnswer && s.answered) {
          const isCorrect =
            s.mcqAnswer.length === correctAnswer.length &&
            s.mcqAnswer
              .getItems()
              .map((o) => o.id)
              .every((answer) => {
                return correctAnswerIds.includes(answer);
              });
          s.marks = isCorrect ? question.marks : 0; //check if answer is correct and set marks
          attempt.marks += isCorrect ? question.marks : 0; //add marks to attempt
          s.correct = isCorrect ? true : false;
          s.markingStatus = MarkingStatus.MARKED;
        }
      }
    });

    const isAllMarked = attempt.submission.getItems().every((obj) => {
      return obj.markingStatus == MarkingStatus.MARKED;
    });

    attempt.markingStatus = isAllMarked //check if all questions are marked
      ? MarkingStatus.MARKED
      : MarkingStatus.NOT_MARKED;

    await em.flush();
  }

  async markSubmission(
    quizId: string,
    attemptId: string,
    submissionId: string,
    marks: number
  ) {
    const em = RequestContext.getEntityManager();
    const submission = await em.findOneOrFail(Submission, { id: submissionId });
    submission.marks = marks;
    submission.markingStatus = MarkingStatus.MARKED;
    await em.flush();
    await this.markAttempt(attemptId);
    return submission;
  }
}
