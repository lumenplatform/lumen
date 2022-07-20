import { Entity, OneToOne } from '@mikro-orm/core';
import { Asset } from './asset.model';
import { Course } from './course.model';
import { User } from './user.model';

@Entity()
export class Organization {
  orgId: string;
  name: string;

  users: User[];
  courses: Course[];

  customizations: OrgCustomizations;
}

@Entity()
export class OrgCustomizations {
  @OneToOne()
  logo: Asset;
}
