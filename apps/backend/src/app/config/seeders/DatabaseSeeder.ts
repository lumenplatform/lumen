import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Asset } from '../../models/asset.model';
import { AssetFactory } from './factories/AssetFactory';
import { CourseFactory } from './factories/CourseFactory';
import { OrganizationFactory } from './factories/OrganizationFactory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new AssetFactory(em).create(5);

    const courses = new CourseFactory(em).make(5);

    courses.forEach((r) => {
      r.courseImage = new AssetFactory(em).makeOne();
      r.promotionalVideo = new AssetFactory(em).makeOne({
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      });
      r.organization = new OrganizationFactory(em).makeOne();
      r.organization.customizations = {
        logo: new AssetFactory(em).makeOne(),
      };
    });

    em.persist(courses);
  }
}
