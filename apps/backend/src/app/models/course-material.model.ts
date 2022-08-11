import {
  Cascade,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Asset } from './asset.model';
import { Course } from './course.model';
import { CourseResource } from './course-resource.model';

@Entity()
export class CourseMaterial {
  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'integer' })
  order = 0;

  @Property()
  title: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ nullable: true })
  timeEstimate?: number;

  @Property({ type: 'text', nullable: true })
  article?: string;

  @Property({ nullable: true })
  contentType?: string;

  @ManyToOne({ entity: () => Asset, nullable: true, eager: true })
  video?: Asset;

  @OneToMany({
    entity: () => CourseMaterial,
    mappedBy: (item) => item.parent,
    nullable: true,
    eager: true,
    orderBy: { order: 1 },
  })
  topics?: CourseMaterial[];

  @ManyToOne({ entity: () => CourseMaterial, nullable: true, hidden: true })
  parent?: CourseMaterial;

  @ManyToOne({ entity: () => Course, hidden: true, nullable: true })
  course?: Course;

  @OneToMany({
    entity: () => CourseResource,
    mappedBy: (r) => r.topic,
    nullable: true,
    eager: true,
    orphanRemoval: true,
    cascade: [Cascade.ALL],
  })
  resources?: CourseResource[];
}
