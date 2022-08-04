import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Asset } from './asset.model';
import { Course } from './course.model';

@Entity()
export class CourseMaterial {
  @PrimaryKey()
  id: string = v4();

  @Property()
  title: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ nullable: true })
  timeEstimate?: number;

  @Property({ type: 'text', nullable: true })
  article?: string;

  @Property({})
  contentType?: string = 'section';

  @ManyToOne({ entity: () => Asset, nullable: true, eager: true })
  video?: Asset;

  @OneToMany({
    entity: () => CourseMaterial,
    mappedBy: (item) => item.parent,
    nullable: true,
    eager: true,
  })
  topics?: CourseMaterial[];

  @ManyToOne({ entity: () => CourseMaterial, nullable: true, hidden: true })
  parent?: CourseMaterial;

  @ManyToOne({ entity: () => Course, hidden: true, nullable: true })
  course?: Course;
}
