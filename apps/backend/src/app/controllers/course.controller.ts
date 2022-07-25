import { RequestContext } from '@mikro-orm/core';
import { Course } from '../models/course.model';

export class CourseController {
  async getCourseByID(id: string) {
    const em = RequestContext.getEntityManager();
    return em.findOneOrFail(Course, { courseId: id });
  }
}
