import { RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { CourseReview } from '../models/review.mode';
import { User } from '../models/user.model';
export class CourseController {
  async addReview(courseId: string, body: any) {
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

  async search(params: any) {
    console.log(params);
    let {
      searchQuery,
      language,
      levels,
      subjectArea,
      duration,
      price,
      tags,
      organization,
    } = params;

    price = price && JSON.parse(price); //TODO: fix this

    const parameters = {
      $and: [
        language ? { language: language } : {},
        levels ? { level: levels } : {},
        subjectArea ? { subjectArea: subjectArea } : {},
        duration && duration.start
          ? { duration: { $gte: duration.start } }
          : {},
        duration && duration.end ? { duration: { $lte: duration.end } } : {},
        price && price.start ? { price: { $gte: price.start } } : {},
        price && price.end ? { price: { $lte: price.end } } : {},
        tags ? { tags: { $like: '%' + tags + '%' } } : {},
        organization ? { organization: { name: organization } } : {},
        /* status: 'PUBLISHED', */
      ],
    };

    console.log();
    const em = RequestContext.getEntityManager() as EntityManager;
    const qb = em.qb(Course, 'c');
    console.log(parameters);
    qb.select('*').leftJoinAndSelect('c.organization', 'o').where(parameters);

    const titleWords = searchQuery
      ? searchQuery.replace(/^\s+|\s+$/g, '').split(' ')
      : [];

    //chain Where if only title is true
    if (searchQuery) {
      qb.andWhere(
        "to_tsvector('english',c.title || ' ' || c.description || ' ' || o.name) @@ to_tsquery(?)",
        [titleWords.join(' | ')]
      );
    }

    const courses = await qb.execute('all');
    //console.log(courses);
    return courses;
  }

  async getCourseByID(id: string) {
    const em = RequestContext.getEntityManager();
    return em.findOneOrFail(Course, { courseId: id });
  }
}
