import { RequestContext } from '@mikro-orm/core';
import { Asset } from '../models/asset.model';
import {
  BillingPlan,
  Organization,
  OrgTheme,
} from '../models/organization.model';
import { Enrollment, EnrollmentType } from '../models/enrollment.model';
import { Withdrawal } from '../models/withdrawal.model';
import { Payment } from '../models/payment.model';
import { v4 } from 'uuid';

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

  async getPublicCourseEnrollments(orgId: string) {
    const em = RequestContext.getEntityManager();
    const courseEnrollments = await em.find(
      Enrollment,
      { $and: [{ course: { organization: { orgId: orgId } } } , {type : EnrollmentType.PUBLIC}] },
      { populate: ['payment'] }
    );
    return courseEnrollments;
  }

  async getPrivateCourseEnrollments(orgId: string) {
    const em = RequestContext.getEntityManager();
    const courseEnrollments = await em.find(
      Enrollment,
      { $and: [{ course: { organization: { orgId: orgId } } } , {type : EnrollmentType.PRIVATE}] },
      { populate: ['payment'] }
    );
    return courseEnrollments;
  }

  async getWithdrawals(orgId: string) {
    const em = RequestContext.getEntityManager();
    const withdrawals = await em.find(
      Withdrawal,
      { organization: { orgId: orgId } },
      { populate: ['payment'] }
    );
    return withdrawals;
  }

  async withdrawFunds(orgId: string, amount: number) {
    const em = RequestContext.getEntityManager();
    const org = await em.findOneOrFail(Organization, { orgId });
    const payment = em.create(Payment, {
      txnId : v4(),
      amount : -amount,
    });
    const withdrawal = em.create(Withdrawal, {
      payment : payment,
      organization: org,
    });
    await em.persistAndFlush(withdrawal);
    return withdrawal;
  }
}
