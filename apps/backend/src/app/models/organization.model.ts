import {
  Collection,
  Embeddable,
  Embedded,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Asset } from './asset.model';
import { Course } from './course.model';
import { User } from './user.model';
@Embeddable()
export class OrgCustomizations {
  @OneToOne({ eager: true })
  logo: Asset;
}

@Entity()
export class Organization {
  @PrimaryKey()
  orgId: string = v4();

  @Property()
  name: string;

  @OneToMany(() => User, (user) => user.organization)
  users = new Collection<User>(this);

  @OneToMany(() => Course, (course) => course.organization)
  courses = new Collection<Course>(this);

  @Embedded(() => OrgCustomizations)
  customizations: OrgCustomizations;
}
