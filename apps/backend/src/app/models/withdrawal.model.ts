import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Organization } from './organization.model';
import { Payment } from './payment.model';

@Entity()
export class Withdrawal {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => Organization)
  organization: Organization;

  @OneToOne(() => Payment)
  payment: Payment;

  @Property()
  withdrawalDate = new Date();
}
