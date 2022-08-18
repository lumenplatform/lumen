import {
  Collection,
  Embeddable,
  Embedded,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Enrollment } from './enrollment.model';
import { Notification } from './notification.model';
import { Organization } from './organization.model';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
@Embeddable()
export class UserPreferences {
  @Property()
  preferredTheme: 'light' | 'dark' = 'light';

  @Property({ default: true, columnType: 'boolean' })
  weeklyRecommendations = true;

  @Property({ default: false, columnType: 'boolean' })
  promotions = false;

  @Property({ default: true, columnType: 'boolean' })
  courseAnnouncements = true;

  @Property({ default: true, columnType: 'boolean' })
  courseReminders = true;

  @Property({ default: true, columnType: 'boolean' })
  discussionForums = true;
}
@Entity()
export class User {
  @PrimaryKey()
  uid: string = v4();

  @Property()
  email: string;

  @Property()
  name: string;

  @Property({ default: 'https://www.gravatar.com/avatar/0?d=mp' })
  picture: string;

  @Property()
  timeZone: string;

  @Embedded(() => UserPreferences)
  preferences: UserPreferences;

  @Enum(() => UserStatus)
  status: UserStatus = UserStatus.ACTIVE;

  @ManyToOne({ nullable: true, eager: true })
  organization: Organization;

  @OneToMany({
    entity: () => Notification,
    mappedBy: (notification) => notification.user,
    lazy: true,
  })
  notifications = new Collection<Notification>(this);

  @OneToMany({
    entity: () => Enrollment,
    mappedBy: (notification) => notification.user,
    lazy: true,
  })
  enrollments = new Collection<Enrollment>(this);
}
