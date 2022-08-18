import { Factory, Faker } from '@mikro-orm/seeder';
import { Asset, AssetStatus, AssetType } from '../../../models/asset.model';

export class AssetFactory extends Factory<Asset> {
  model = Asset;
t
  definition(faker: Faker): Partial<Asset> {
    return {
      name: faker.system.commonFileName('jpeg'),
      mime: 'image/jpeg',
      url: faker.image.abstract(),
      config: {},
      type: AssetType.IMAGE,
      status: AssetStatus.ACTIVE,
    };
  }
}
