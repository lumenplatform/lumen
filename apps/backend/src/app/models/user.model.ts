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
import { Enrollment } from './enrollment.model';
import { Notification } from './Notification';
import { Organization } from './organization.model';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
@Embeddable()
export class UserPreferences {
  @Property()
  preferredTheme: 'light' | 'dark' = 'light';

  @Property()
  weeklyRecommendations = true;

  @Property()
  promotions = false;

  @Property()
  courseAnnouncements = true;

  @Property()
  courseReminders = true;

  @Property()
  discussionForums = true;
}
@Entity()
export class User {
  @PrimaryKey()
  uid: string;

  @Property()
  timeZone: string;

  @Embedded(() => UserPreferences)
  preferences: UserPreferences;

  @Enum(() => UserStatus)
  status: UserStatus = UserStatus.ACTIVE;

  @ManyToOne()
  organization: Organization;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications = new Collection<Notification>(this);

  @OneToMany(() => Notification, (notification) => notification.user)
  enrollments = new Collection<Enrollment>(this);
}
