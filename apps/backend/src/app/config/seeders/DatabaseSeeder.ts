import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Asset } from '../../models/asset.model';
import { AssetFactory } from './factories/AssetFactory';
import { CourseFactory } from './factories/CourseFactory';
import { EnrollmentFactory } from './factories/EnrollmentFactory';
import { OrganizationFactory } from './factories/OrganizationFactory';
import { PaymentFactory } from './factories/PaymentFactory';
import { UserFactory } from './factories/UserFactory';

declare global {
  interface Array<T> {
    sample(): T;
  }
}

if (!Array.prototype.sample) {
  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
}

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const organizations = new OrganizationFactory(em).make(5);
    const users = new UserFactory(em).make(5);
    const courses = new CourseFactory(em).make(5);
    const enrollments = new EnrollmentFactory(em).make(5);
    
    users.forEach((user) => {
      user.organization = [null,...organizations].sample();
    });

    courses.forEach((r) => {
      r.organization = organizations.sample();
    });

    enrollments.forEach((r) => {
      r.user = users.sample();
      r.course = courses.sample();
      r.payment = new PaymentFactory(em).makeOne();
    });

    em.persist(enrollments);
    em.persist(organizations);
    em.persist(courses);
  }
}
