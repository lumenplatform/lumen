import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Answer } from './answer.model';
import { Quiz } from './quiz.model';

export enum QuestionsType {
  MCQ = 'mcq',
  ESSAY = 'essay',
}

@Entity()
export class Question {
  @PrimaryKey()
  id: string = v4();

  @Property({ columnType: 'SERIAL' })
  order: number;

  @ManyToOne(() => Quiz)
  exam: Quiz;

  @Property()
  question: string;

  @Enum(() => QuestionsType)
  type: QuestionsType;

  @Property()
  marks?: number;

  @Property()
  durationSeconds?: number;

  @OneToMany(() => Answer, (answer) => answer.question, {
    orderBy: { order: 1 },
    orphanRemoval: true,
  })
  answers? = new Collection<Answer>(this);
}
