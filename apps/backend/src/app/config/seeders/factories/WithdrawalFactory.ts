import { Factory, Faker } from '@mikro-orm/seeder';
import { Course } from '../../../models/course.model';
import { AssetFactory } from './AssetFactory';
import { Withdrawal } from '../../../models/withdrawal.model';

export class WithdrawalFactory extends Factory<Withdrawal> {
  private readonly em_;
  constructor(em: any) {
    super(em);
    this.em_ = em;
  }

  model = Withdrawal;

  definition(faker: Faker): Partial<Withdrawal> {
    return {};
  }
}
