import { RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { CourseMaterial } from '../models/course-material.model';
import { Course, CourseStatus } from '../models/course.model';
import { CompletedTopic, Enrollment } from '../models/enrollment.model';
import { CourseReview } from '../models/review.mode';
import { User } from '../models/user.model';
import { Quiz } from '../models/quiz.model';
import { CourseService } from '../services/course.service';
import { MailService } from '../services/mail/email-types';
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
        { settings: { isPrivate: 'NO' } },
        { status: CourseStatus.PUBLISHED },
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
      qb.orWhere(
        "to_tsvector('english',c.title || ' ' || c.description || ' ' || o.name) @@ to_tsquery(?)",
        [titleWords.join(' | ')]
      );
    }

    const courses = await qb.execute();
    return courses;
  }

  async getCourseByID(id: string) {
    const em = RequestContext.getEntityManager();
    return em.findOneOrFail(Course, { courseId: id });
  }

  async updateCourseInformation(courseId: string, data: Partial<Course>) {
    return this.courseService.updateCourseInfo(courseId, data);
  }

  async enroll(req, userId, courseId) {
    const course = await this.getCourseByID(courseId);
    const em = RequestContext.getEntityManager();
    const user = await em.findOneOrFail(User, { uid: userId });
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
    const { user, course, price, txnId } = await this.payment.getPaymentDetails(
      sessionId
    );
    this.courseService.addEnrollment(txnId, user, course, price);
    //this.mail.sendMail()
    return `/student/${course.courseId}`;
  }

  async getQuizzesByCourseId(id: string) {
    const em = RequestContext.getEntityManager();
    const course = await em.findOneOrFail(Course, { courseId: id });
    const quizzes = await em.find(Quiz, { course: course });
    return quizzes;
  }

  async getEnrolledCourses(uid: string) {
    const em = RequestContext.getEntityManager();
    return em
      .find(Enrollment, { user: { uid } }, { populate: ['course'] })
      .then((r) => r.map((k) => k.course));
  }

  async getRecommendedCourses(uid: string) {
    // todo : properly calculate recommended
    const enrolled = await this.getEnrolledCourses(uid);
    const em = RequestContext.getEntityManager();
    const recommended = await em.find(Course, {
      courseId: { $nin: enrolled.map((r) => r.courseId) },
    });
    return recommended.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  async markTopicAsCompleted(
    userId: string,
    courseId: string,
    topicId: string
  ) {
    const em = RequestContext.getEntityManager();

    const [enrollment, topic] = await Promise.all([
      em.findOneOrFail(Enrollment, {
        user: { uid: userId },
        course: { courseId },
      }),
      em.findOneOrFail(CourseMaterial, { id: topicId }),
    ]);

    const completedTopic = em.create(CompletedTopic, {
      enrollment,
      topic,
    });
    em.persist(completedTopic);
    em.flush();
  }
}
