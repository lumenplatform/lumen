import { Factory, Faker } from '@mikro-orm/seeder';
import { Enrollment, EnrollmentStatus } from '../../../models/enrollment.model';

export class EnrollmentFactory extends Factory<Enrollment> {
    model = Enrollment;
    
    definition(faker: Faker): Partial<Enrollment> {
        return {
            enrollmentId: faker.random.alphaNumeric(10),
            enrollmentDate: faker.date.past(),
            status: EnrollmentStatus.ACTIVE,
            payment: null,
        };
    }
}