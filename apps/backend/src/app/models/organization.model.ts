import {
  Collection,
  Embeddable,
  Embedded,
  Entity,
  Enum,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Domain } from 'domain';
import { v4 } from 'uuid';
import { Asset } from './asset.model';
import { Course } from './course.model';
import { User } from './user.model';

export enum BillingPlan {
  BASIC = 'BASIC',
  PRO = 'PRO',
  ORG = 'ORG',
}

@Embeddable()
export class OrgTheme {
  @OneToOne({ entity: () => Asset, eager: true })
  logo: Asset;

  @Property()
  theme?: any;
}

@Embeddable()
export class DomainConfig {
  @Property()
  subdomain: string;
}

@Embeddable()
export class BillingInformation {
  @Enum(() => BillingPlan)
  plan: BillingPlan = BillingPlan.BASIC;
}

@Entity()
export class Organization {
  @PrimaryKey()
  orgId: string = v4();

  @Property()
  name: string;

  @Property()
  description: string;

  @OneToMany(() => User, (user) => user.organization)
  users = new Collection<User>(this);

  @OneToMany(() => Course, (course) => course.organization)
  courses = new Collection<Course>(this);

  @Embedded(() => OrgTheme)
  theme: OrgTheme;

  @Embedded(() => BillingInformation)
  billing: BillingInformation;

  @Embedded(() => DomainConfig)
  domains: DomainConfig;
}
