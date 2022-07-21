import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Asset } from './asset.model';
import { Course } from './course.model';

@Entity()
export class CourseMaterial {
  @PrimaryKey()
  id: string;

  @Property()
  title: string;

  @Property()
  description?: string;

  @Property()
  timeEstimate: number;

  @ManyToOne(() => Asset)
  content?: Asset;

  @OneToMany(() => CourseMaterial, (item) => item.parent)
  children?: CourseMaterial[];

  @ManyToOne(() => CourseMaterial)
  parent?: CourseMaterial;

  @ManyToOne(() => Course)
  course: Course;
}
