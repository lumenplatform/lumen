import {
  Entity,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { User } from './user.model';

@Entity()
export class Notification {
  @PrimaryKey()
  id: string;

  @Property()
  sentAt: Date;

  @Property()
  title: string;

  @Property()
  message: string;

  @Property()
  link: string;

  @Property()
  seen: false;

  @ManyToOne(() => User)
  user: User;

  [PrimaryKeyType]?: [Date, string];
}
