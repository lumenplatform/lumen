import { Connection, IDatabaseDriver, Options } from '@mikro-orm/core';
import { Asset } from '../models/asset.model';
import { CourseMaterial } from '../models/course-material.model';
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { CourseReview } from '../models/CourseReview';
import { Payment } from '../models/Payment';
import { Organization } from '../models/organization.model';
import { User } from '../models/user.model';
import { Logger } from '../utils/logger';
import { Notification } from '../models/Notification';

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
    Payment,
    CourseReview,
  ],
  type: 'postgresql',
  clientUrl: process.env.PG_CONNECTION_STRING,
  debug: true,
  logger: ORMLogger.info,
  migrations: { emit: 'js' },
};

export { ORMConfig, ORMLogger };
