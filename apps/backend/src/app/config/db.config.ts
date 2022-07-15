import { Connection, IDatabaseDriver, Options } from '@mikro-orm/core';
import { Content } from '../models/content.model';
import { Logger } from '../utils/logger';

const ORMLogger = new Logger('ORM');

const ORMConfig: Options<IDatabaseDriver<Connection>> = {
  entities: [Content],
  type: 'postgresql',
  clientUrl: process.env.PG_CONNECTION_STRING,
  debug: true,
  logger: ORMLogger.info,
  migrations: { emit: 'js' },
};

export { ORMConfig, ORMLogger };
