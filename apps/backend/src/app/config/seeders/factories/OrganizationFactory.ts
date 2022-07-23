import { Factory, Faker } from '@mikro-orm/seeder';
import { Organization } from '../../../models/organization.model';

export class OrganizationFactory extends Factory<Organization> {
  model = Organization;

  definition(faker: Faker): Partial<Organization> {
    return {
      name: faker.company.companyName(),
    };
  }
}
