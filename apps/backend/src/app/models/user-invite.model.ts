import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Course } from './course.model';
import { Organization } from './organization.model';

export enum InviteType {
  COURSE = 'COURSE',
  ORGANIZATION = 'ORGANIZATION',
}

@Entity()
export class UserInvite {
  @PrimaryKey()
  id: string = v4();

  @Property()
  email: string;

  @Property()
  expiresAt: Date;

  @ManyToOne({ nullable: true })
  organization?: Organization;

  @ManyToOne({ nullable: true })
  course?: Course;

  @Enum(() => InviteType)
  type: InviteType;

  @Property({ type: 'boolean' })
  used = false;
}
