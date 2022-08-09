import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Question } from './question.model';

@Entity()
export class Answer {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => Question)
  question: Question;

  @Property()
  answer: string;

  @Property()
  correct: boolean;
}
