import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Payment {
  @PrimaryKey()
  txnId: string;

  @Property()
  amount: number;

  @Property()
  createdAt = new Date();

  constructor(txnId: string, amount: number) {
    this.txnId = txnId;
    this.amount = amount;
  }
}
