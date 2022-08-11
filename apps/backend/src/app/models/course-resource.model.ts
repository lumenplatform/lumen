import { Entity, ManyToOne, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { Asset } from './asset.model';
import { Course } from './course.model';
import { CourseMaterial } from './course-material.model';
import { v4 } from 'uuid';

@Entity()
export class CourseResource {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne({ entity: () => CourseMaterial, hidden: true })
  topic: CourseMaterial;

  @OneToOne({ eager: true })
  asset: Asset;
}
