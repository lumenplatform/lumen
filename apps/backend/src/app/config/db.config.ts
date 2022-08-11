import { Connection, IDatabaseDriver, Options } from '@mikro-orm/core';
import { Asset } from '../models/asset.model';
import { CourseMaterial } from '../models/course-material.model';
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { CourseReview } from '../models/review.mode';
import { Payment } from '../models/payment.model';
import { Organization } from '../models/organization.model';
import { User } from '../models/user.model';
import { Logger } from '../utils/logger';
import { Notification } from '../models/notification.model';
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
import { Answer } from '../models/answer.model';

import path = require('path');
import { UserInvite } from '../models/user-invite.model';
import { CourseResource } from '../models/course-resource.model';

const ORMLogger = new Logger('ORM');

const ORMConfig: Options<IDatabaseDriver<Connection>> = {
  entities: [
    Asset,
    User,
    Notification,
    Organization,
    Enrollment,
    Course,
    CourseMaterial,
    CourseResource,
    Payment,
    CourseReview,
    UserInvite,
    Question,
    Quiz,
    Answer,
  ],
  type: 'postgresql',
  clientUrl: process.env.PG_CONNECTION_STRING,
  debug: true,
  logger: ORMLogger.info,
  migrations: { emit: 'js' },
  seeder: {
    path: path.join(__dirname, './seeders'),
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export { ORMConfig, ORMLogger };
