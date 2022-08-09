import { RequestContext } from '@mikro-orm/core';
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';

export class QuizController {
  async createNewQuiz(data: any) {
    const em = RequestContext.getEntityManager();
    const quiz = em.create(Quiz, data);
    em.persist(quiz);
    em.flush();
    return quiz;
  }

  async getQuizByID(id: string ,user) {
    let result;
    const em = RequestContext.getEntityManager();
    result = em.findOneOrFail(Quiz, { id: id });
/*     result = em.findOneOrFail(
      Quiz,
      { id: id },
      {
        fields: [
          'id',
          'course',
          'settings',
          'createdAt',
          {
            questions: [
              'id',
              'question',
              'type',
              'durationSeconds',
              { answers: ['id', 'answer'] },
            ],
          },
        ],
      }
    ); */
    return result;
  }
}
