import { RequestContext, t } from '@mikro-orm/core';
import { emit } from 'process';
import { Asset } from '../models/asset.model';
import { Course } from '../models/course.model';
import { CompletedTopic, Enrollment } from '../models/enrollment.model';
import {
  BillingPlan,
  Organization,
  OrgTheme,
} from '../models/organization.model';
import { CourseReview } from '../models/review.mode';

const sevenDaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
};

function getLast7Days() {
  const dates = [];
  const date = new Date();
  for (let i = 0; i < 7; i++) {
    dates.push(new Date(date));
    date.setDate(date.getDate() - 1);
  }
  return dates.reverse();
}
export class OrganizationService {
  /** Organization repository getter  */
  get orgRepo() {
    return RequestContext.getEntityManager().getRepository(Organization);
  }

  async getOrg(orgId: string, populate: any[]) {
    return this.orgRepo.findOne({ orgId }, { populate });
  }

  async createOrg(data: { name: string; description: string; logo: Asset }) {
    const subdomain = new String(data.name).replace(/ /g, '-');
    const org = this.orgRepo.create({
      name: data.name,
      theme: {
        logo: data.logo,
        theme: { primary: '#1dbf7b', secondary: '#f50057' },
      },
      billing: { plan: BillingPlan.BASIC },
      domains: { subdomain },
      description: data.description,
    });
    await this.orgRepo.persistAndFlush(org);
    return org;
  }

  async updateThemeConfig(
    orgId: string,
    theme: Partial<OrgTheme>
  ): Promise<OrgTheme> {
    const org = await this.orgRepo.findOneOrFail({ orgId });
    org.theme = { ...org.theme, ...theme };
    await this.orgRepo.persistAndFlush(org);
    return org.theme;
  }

  async updateOrgInfo(orgId: string, data: Partial<Organization>) {
    const em = RequestContext.getEntityManager();
    const org = await em.findOneOrFail(Organization, { orgId });
    if (data.theme.logo.id) {
      delete data.theme.logo;
    } else {
      data.theme.logo = em.create(Asset, data.theme.logo);
    }
    em.assign(org, { orgId, ...data }, { em });
    await em.persistAndFlush(org);
    return org;
  }

  async getLastWeekIncome(orgId: string) {
    const em = RequestContext.getEntityManager();

    const enrollments = await em.find(
      Enrollment,
      {
        course: { organization: { orgId } },
      },
      { populate: ['payment'] }
    );

    return enrollments.map((r) => r.payment.amount).reduce((p, c) => p + c, 0);
  }

  async getEngagement(orgId: string) {
    const em = RequestContext.getEntityManager();
    const completedTopics = await em.find(
      CompletedTopic,
      {
        enrollment: {
          course: {
            organization: { orgId },
          },
          enrollmentDate: { $gt: sevenDaysAgo() },
        },
      },
      { populate: ['topic'] }
    );
    return (
      Math.round(
        (completedTopics.reduce((p, r) => p + r.topic.timeEstimate, 0) / 60) *
          100
      ) / 100
    );
  }

  async getEnrollmentCount(orgId: string) {
    const em = RequestContext.getEntityManager();

    return em.count(Enrollment, {
      course: { organization: { orgId } },
      enrollmentDate: { $gt: sevenDaysAgo() },
    });
  }

  async getReviews(orgId: string) {
    const em = RequestContext.getEntityManager();
    return em.find(
      CourseReview,
      {
        enrollment: { course: { organization: { orgId } } },
      },
      { populate: ['enrollment', 'enrollment.course', 'user'] }
    );
  }

  async getEnrollmentStats(orgId: string) {
    const em = RequestContext.getEntityManager();
    const dates = getLast7Days();
    const courses = await em.find(Course, { organization: { orgId } });

    const cstat = [];

    for (const course of courses) {
      cstat.push({
        name: course.title,
        data: await Promise.all(
          dates.map((r) => this.courseStats(course.courseId, r))
        ),
      });
    }

    return {
      dates: dates.map((r: Date) => r.toISOString().substring(5, 10)),
      counts: [
        {
          name: 'All Courses',
          data: await Promise.all(dates.map((r) => this.courseStats(null, r))),
        },
        ...cstat,
      ],
    };
  }

  async courseStats(courseId: string, date: Date) {
    const em = RequestContext.getEntityManager();
    date.setHours(0, 0, 0, 0);
    const start = new Date(date);
    date.setHours(23, 59, 59, 0);
    const end = new Date(date);
    return em.count(Enrollment, {
      ...(courseId ? { course: { courseId } } : null),
      enrollmentDate: { $gte: start, $lt: end },
    });
  }
}
