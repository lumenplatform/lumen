import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  OneToOne,
  Collection,
  OneToMany,
  Embeddable,
  Embedded,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Course } from './course.model';
import { Question } from './question.model';

@Embeddable()
export class QuizDuration {
  @Property()
  unlimited: boolean;

  @Property()
  durationMinutes: number;

  @Property()
  durationSeconds: number;
}

@Embeddable()
export class TimeBox {
  @Property()
  state: boolean;

  @Property()
  isAllQuestions: boolean;

  @Property()
  durationMinutes: number;

  @Property()
  durationSeconds: number;
}

@Embeddable()
export class QuizSettings {
  @Property()
  title: string;

  @Property()
  instructions: string;

  @Embedded(() => QuizDuration)
  duration: QuizDuration;

  @Property()
  contribution: number;

  @Property()
  passGrade: number;

  @Property()
  randomizeQuestions: boolean;

  @Property()
  randomizeAnswers: boolean;

  @Property()
  autoReleaseResults: boolean;

  @Property()
  enableReview: boolean;

  @Embedded(() => TimeBox)
  timeBox: TimeBox;
}

@Entity()
export class Quiz {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => Course)
  course: Course;

  @OneToMany(() => Question, (question) => question.exam, {
    orderBy: { order: 1 },
    orphanRemoval: true,
  })
  questions = new Collection<Question>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ default: 0 })
  noOfAttempts: number;

  @Embedded(() => QuizSettings)
  settings: QuizSettings;
}
