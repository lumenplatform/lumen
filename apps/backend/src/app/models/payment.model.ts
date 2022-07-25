import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Payment {
  @PrimaryKey()
  txnId: string;

  @Property()
  amount: number;

  @Property({columnType : 'timestamp'})
  createdAt = new Date();
}
