import { RequestContext } from '@mikro-orm/core';
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';

export class QuizController {
  async createNewQuiz(data: any) {
    const em = RequestContext.getEntityManager();
    const quiz = await em.create(Quiz, data);
    em.persist(quiz);
    em.flush();
    return quiz;
  }

  async getQuizByID(id: string ,user) {
    let result;
    const em = RequestContext.getEntityManager();
    result =await em.findOneOrFail(Quiz, { id: id },{populate:['questions','questions.answers']});
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

  async updateQuiz(id: string, data: any, user) {
    const em = RequestContext.getEntityManager();
    const quiz = await em.findOneOrFail(Quiz, { id: id });
    quiz.settings = data.settings;
    quiz.questions = data.questions;
    em.flush();
    return quiz;
  }
}
