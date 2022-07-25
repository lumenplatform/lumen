import { RequestContext } from '@mikro-orm/core';
import { Course } from '../models/course.model';
import { CourseReview } from '../models/review.mode';
import { User } from '../models/user.model';
import { Enrollment } from '../models/enrollment.model';
export class CourseController {
  
  async AddReview(courseId: string, body: any) {
    const { rating, review } = body;
    const em = RequestContext.getEntityManager();

    const enrollment = await em.findOneOrFail(Enrollment, {
      course: { courseId: courseId },
    });
    const user = await em.findOneOrFail(User, {});
    const courseReview = new CourseReview();
    courseReview.rating = rating;
    courseReview.review = review;
    courseReview.enrollment = enrollment;
    courseReview.user = user;
    await em.persistAndFlush(courseReview);
  }

  async Search(params: any) {
    const { title, language, level, subjectArea, duration, price, tags } =
      params;

    const parameters = {
      $and: [
        title
          ? {
              $or: [
                { title: { $like: '%' + title + '%' } },
                { description: { $like: '%' + title + '%' } },
                { organization: { $like: '%' + title + '%' } },
              ],
            }
          : {},
        language ? { language: language } : {},
        level ? { level: level } : {},
        subjectArea ? { subjectArea: subjectArea } : {},
        duration && duration.start
          ? { duration: { $gte: duration.start } }
          : {},
        duration && duration.end ? { duration: { $lte: duration.end } } : {},
        price && price.start ? { price: { $gte: price.start } } : {},
        price && price.end ? { price: { $lte: price.end } } : {},
        tags ? { tags: { $like: '%' + tags + '%' } } : {},
        /* status: 'PUBLISHED', */
      ],
    };

    const em = RequestContext.getEntityManager();
    const courses = await em.find(Course, parameters);
    return courses;
  }
}
