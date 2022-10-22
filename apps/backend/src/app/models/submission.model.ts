import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  ManyToMany,
  Enum,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { string } from 'yup';
import { Answer } from './answer.model';
import { Attempt, MarkingStatus } from './attempt.model';
import { Question } from './question.model';

@Entity()
export class Submission {
  @PrimaryKey({ type: string })
  id = v4();

  @ManyToOne({ entity: () => Attempt })
  attempt: Attempt;

  @ManyToOne()
  question: Question;

  @Property({ nullable: true })
  essayAnswer?: string;

  @ManyToMany({ entity: () => Answer, owner: true })
  mcqAnswer? = new Collection<Answer>(this);

  @Property({ nullable: true })
  correct?: boolean;

  @Property({ type: 'integer' })
  marks = 0;

  @Property({ nullable: true })
  flag?: boolean;

  @Property({ nullable: true })
  answered?: boolean;

  @Enum(() => MarkingStatus)
  markingStatus = MarkingStatus.NOT_MARKED;
}
