import { Factory, Faker } from '@mikro-orm/seeder';
import { User, UserPreferences } from '../../../models/user.model';

export class UserFactory extends Factory<User> {
  model = User;
  definition(faker: Faker): Partial<User> {
    return {
      uid: faker.random.alphaNumeric(10),
      timeZone: faker.address.timeZone(),
      preferences: new UserPreferences(),
      email: faker.internet.email(),
    };
  }
}
