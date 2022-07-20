import { Connection, IDatabaseDriver, Options } from '@mikro-orm/core';
import { Asset } from '../models/asset.model';
import { Logger } from '../utils/logger';

const ORMLogger = new Logger('ORM');

const ORMConfig: Options<IDatabaseDriver<Connection>> = {
  entities: [Asset],
  type: 'postgresql',
  clientUrl: process.env.PG_CONNECTION_STRING,
  debug: true,
  logger: ORMLogger.info,
  migrations: { emit: 'js' },
};

export { ORMConfig, ORMLogger };
