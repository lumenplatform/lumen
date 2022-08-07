import { RequestContext } from '@mikro-orm/core';
import { Asset } from '../models/asset.model';
import { Organization } from '../models/organization.model';

export class OrganizationService {
  /** Organization repository getter  */
  get orgRepo() {
    return RequestContext.getEntityManager().getRepository(Organization);
  }

  async createOrg(data: { name: string; description: string; logo: Asset }) {
    const org = this.orgRepo.create({
      name: data.name,
      customizations: { logo: data.logo },
    });
    await this.orgRepo.persistAndFlush(org);
    return org;
  }
}
