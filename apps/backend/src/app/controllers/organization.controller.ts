import { Organization, OrgTheme } from '../models/organization.model';
import { OrganizationService } from '../services/organization.service';

export class OrganizationController {
  constructor(private orgService: OrganizationService) {}

  async getOrgById(orgId: string, populate = []) {
    return this.orgService.getOrg(orgId, populate);
  }

  async updateOrgInformation(orgId: string, data: Partial<Organization>) {
    return this.orgService.updateOrgInfo(orgId, data);
  }

  async getBillingInfo() {
    return this.orgService;
  }

  async updateThemeConfig(orgId: string, theme: Partial<OrgTheme>) {
    const updatedTheme = await this.orgService.updateThemeConfig(orgId, theme);
    return updatedTheme;
  }

  async getOrgDashboardDataById(orgId: string) {
    const [enrollment_count, engagement, income, reviews, enrollments] =
      await Promise.all([
        this.orgService.getEnrollmentCount(orgId),
        this.orgService.getEngagement(orgId),
        this.orgService.getLastWeekIncome(orgId),
        this.orgService.getReviews(orgId),
        this.orgService.getEnrollmentStats(orgId),
      ]);

    return {
      enrollment_count,
      engagement,
      income,
      reviews,
      enrollments,
    };
  }

  async getPublicCourseEnrollments(orgId: string) {
    return this.orgService.getPublicCourseEnrollments(orgId);
  }

  async getPrivateCourseEnrollments(orgId: string) {
    return this.orgService.getPrivateCourseEnrollments(orgId);
  }

  async getWithdrawals(orgId: string) {
    return this.orgService.getWithdrawals(orgId);
  }

  async withdrawFunds(orgId: string, amount: number) {
    return this.orgService.withdrawFunds(orgId, amount);
  }
}
