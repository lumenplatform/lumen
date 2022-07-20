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
import { Organization } from './organization.model';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
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
  enrollments: Enrollment[];
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
export class Notification {
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

  @ManyToOne()
  user: User;
}
