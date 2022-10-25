import { Factory, Faker } from '@mikro-orm/seeder';
import { Organization } from '../../../models/organization.model';
import { AssetFactory } from './AssetFactory';

export class OrganizationFactory extends Factory<Organization> {
  private readonly em_;
  model = Organization;
  
  constructor(em: any) {
    super(em);
    this.em_ = em;
  }

  definition(faker: Faker): Partial<Organization> {
    return {
      name: faker.company.companyName(),
      theme: {
        logo: new AssetFactory(this.em_).makeOne(),
      },
    };
  }
}
