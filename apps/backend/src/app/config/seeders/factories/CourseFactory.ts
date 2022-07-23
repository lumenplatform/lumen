import { Factory, Faker } from '@mikro-orm/seeder';
import { Course } from '../../../models/course.model';
import { AssetFactory } from './AssetFactory';

export class CourseFactory extends Factory<Course> {
  model = Course;

  definition(faker: Faker): Partial<Course> {
    return {
      courseId: faker.lorem.slug(3),
      title: faker.word.noun(5) + ' ' + faker.word.noun(5),
      description: faker.lorem.lines(1),
      subtitle: faker.lorem.words(4),
      language: 'English',
      prerequisites: JSON.stringify(
        [...Array(3).keys()].map((r) => faker.lorem.words(4))
      ),
      learningOutcome: JSON.stringify(
        [...Array(3).keys()].map((r) => faker.lorem.words(4))
      ),
      intendedAudience: JSON.stringify(
        [...Array(3).keys()].map((r) => faker.lorem.words(4))
      ),
      price: 100,
      subjectArea: 'Machine Learning',
      level: 'intermediate',
      congratsMessage: 'Congrats on Completing the course successfully',
      duration: 3,
      welcomeMessage: 'Welcome to the course !!! ',
      tags: 'ML',
    };
  }
}
