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
}
