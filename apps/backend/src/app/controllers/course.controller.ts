import { RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { CourseReview } from '../models/review.mode';
import { User } from '../models/user.model';
import { CourseService } from '../services/course.service';
import { MailService } from '../services/email.service';
import { PaymentService } from '../services/payment.service';
export class CourseController {
  constructor(
    private payment: PaymentService,
    private mail: MailService,
    private courseService: CourseService
  ) {}

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
    const {
      searchQuery,
      language,
      levels,
      subjectArea,
      duration,
      tags,
      organization,
    } = params;

    const price = params.price && JSON.parse(params.price); //TODO: fix this

    const titleWords = searchQuery
      ? searchQuery.replace(/^\s+|\s+$/g, '').split(' ')
      : [];

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
        searchQuery
          ? {
              $or: [{ title: { $like: `%${searchQuery}%` } }],
            }
          : {},
      ],
    };

    const em = RequestContext.getEntityManager() as EntityManager;
    const qb = em.qb(Course, 'c');
    qb.select('*')
      .leftJoinAndSelect('c.organization', 'o')
      .leftJoinAndSelect('c.courseImage', 'ci')
      .where(parameters);

    //chain Where if only title is true
    if (searchQuery) {
      qb.andWhere(
        "to_tsvector('english',c.title || ' ' || c.description || ' ' || o.name) @@ to_tsquery(?)",
        [titleWords.join(' | ')]
      );
    }

    const courses = em.find(Course, parameters);
    //console.log(courses);
    return courses;
  }

  async getCourseByID(id: string) {
    const em = RequestContext.getEntityManager();
    return em.findOneOrFail(Course, { courseId: id });
  }

  async enroll(req, userId, courseId) {
    const course = await this.getCourseByID(courseId);
    const user: User = new User();
    const em = RequestContext.getEntityManager();
    /* const user = await em.findOneOrFail(User,{}); */
    const domain = `${req.protocol == 'https' ? 'https:' : 'http'}://${req.get(
      'host'
    )}`;
    console.log(domain);
    const redirectUrl = await this.payment.acceptEnrollmentPayment(
      user,
      course,
      domain
    );
    return redirectUrl;
  }

  async enrollSuccess(sessionId) {
    const { user, course, price } = await this.payment.getPaymentDetails(
      sessionId
    );
    this.courseService.addEnrollment(user, course, price);
    //this.mail.sendMail()
    return `/student/${course.courseId}`;
  }
}
