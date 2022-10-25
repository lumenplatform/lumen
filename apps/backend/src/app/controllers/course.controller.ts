import { RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { CourseMaterial } from '../models/course-material.model';
import { Course } from '../models/course.model';
import {
  CompletedTopic,
  Enrollment,
  EnrollmentStatus,
} from '../models/enrollment.model';
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
    return em
      .findOneOrFail(Course, { courseId: id })
      .then((r) => ({
        ...r,
        enrolledCount: em.count(Enrollment, { course: { courseId: id } }),
      }));
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
    const courses: any = await em
      .find(
        Enrollment,
        { user: { uid }, status: EnrollmentStatus.ACTIVE },
        { populate: ['course'] }
      )
      .then((r) => r.map((k) => k.course));

    for (let i = 0; i < courses.length; i++) {
      const material = await this.getCourseMaterial(courses[i].courseId, uid);

      const incompleteTopics = material.map((r) =>
        r.topics.find((r) => !r.completed)
      );

      const courseTotal = material.reduce((p, c) => p + c.totalTime, 0);
      const courseCompleteTotal = material.reduce(
        (p, c) => p + c.completedTotal,
        0
      );

      courses[i] = {
        ...courses[i],
        next: incompleteTopics.length > 0 ? incompleteTopics[0] : null,
        totalTime: courseTotal,
        coursePercent: (courseCompleteTotal / courseTotal) * 100,
        courseCompleteTotal,
      };
    }

    return courses;
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

  async getCourseMaterial(id: string, uid?: string): Promise<any[]> {
    const em = RequestContext.getEntityManager() as EntityManager;

    const material = await em.find(CourseMaterial, {
      course: { courseId: id },
    });

    if (!uid) {
      // if a uid is not provided return the material as it is
      return material;
    }

    // if the uid is present map with the competed topics

    const completedTopics = await em.find(CompletedTopic, {
      enrollment: { course: { courseId: id }, user: { uid } },
    });

    return material.map((mat) => {
      const topics = mat.topics.getItems().map((r) => ({
        ...r,
        completed: completedTopics.findIndex((c) => c.topic.id === r.id) !== -1,
      }));

      const totalTime = mat.topics
        ?.getItems(true)
        .reduce((p, c) => p + c.timeEstimate, 0);

      const completedTotal = completedTopics
        .filter((r) => r.topic.parent.id === mat.id)
        .reduce((r, y) => r + y.topic.timeEstimate || 0, 0);

      return {
        ...mat,
        completedPercent: (completedTotal / totalTime) * 100,
        completedTotal,
        totalTime,
        topics,
      };
    });
  }

  async completeCourse(data: {
    courseId: string;
    uid: string;
    rating: number;
    review: string;
  }) {
    const em = RequestContext.getEntityManager() as EntityManager;
    const enrollment = await em.findOne(Enrollment, {
      course: { courseId: data.courseId },
      user: { uid: data.uid },
    });

    enrollment.status = EnrollmentStatus.COMPLETED;
    const review = em.create(CourseReview, {});

    review.rating = data.rating;
    review.review = data.review;
    review.enrollment = enrollment;

    // @ts-ignore
    review.user = { uid: data.uid };

    em.persist(review);
    enrollment.completionDate = new Date();

    em.persist(enrollment);
    await em.flush();
    return enrollment;
  }

  getCourseReviews(courseId: string) {
    const em = RequestContext.getEntityManager() as EntityManager;
    return em.find(
      CourseReview,
      { enrollment: { course: { courseId } } },
      { populate: ['user'] }
    );
  }
}
