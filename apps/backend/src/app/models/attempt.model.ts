import {
  AfterUpdate,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Quiz } from './quiz.model';
import { Submission } from './submission.model';
import { User } from './user.model';

export enum AttemptStatus {
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
}

export enum MarkingStatus {
  NOT_MARKED = 'NOT_MARKED',
  MARKED = 'MARKED',
}

export enum ReleaseStatus {
  NOT_RELEASED = 'NOT_RELEASED',
  RELEASED = 'RELEASED',
}

@Entity()
export class Attempt {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne()
  user: User;

  @ManyToOne()
  quiz: Quiz;

  @Property({ type: 'integer' })
  marks = 0;

  @Property({ nullable: true })
  isPassed ?: boolean;

  @Property({ type: 'integer' })
  grade = 0;

  @Property({ columnType: 'timestamptz' })
  startedAt = new Date();

  @Property({ nullable: true })
  completedAt?: Date;

  @Enum(() => AttemptStatus)
  attemptStatus = AttemptStatus.STARTED;

  @Enum(() => MarkingStatus)
  markingStatus = MarkingStatus.NOT_MARKED;

  @Enum(() => ReleaseStatus)
  releasedStatus = ReleaseStatus.NOT_RELEASED;


  @OneToMany(() => Submission, (submission) => submission.attempt, {
    orphanRemoval: true,
  })
  submission = new Collection<Submission>(this);
}
