import { Factory, Faker } from '@mikro-orm/seeder';
import { Payment } from '../../../models/payment.model';

export class PaymentFactory extends Factory<Payment> {
  model = Payment;
  
  definition(faker: Faker): Partial<Payment> {
    return {
        amount: faker.datatype.number(),
        txnId: faker.random.alphaNumeric(10),
      }
    };
  }

  