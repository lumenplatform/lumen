import { MikroORM, RequestContext } from '@mikro-orm/core';
import { ORMConfig, ORMLogger } from './db.config';

let orm: MikroORM;

async function InitORM() {
  if (orm) return orm;
  ORMLogger.info('Connecting to Database...');
  orm = await MikroORM.init(ORMConfig);
  ORMLogger.info('Successfully Connected to Database');
  const migrator = orm.getMigrator();
  await migrator.up();
  ORMLogger.info('Database Migration Complete');
  return orm;
}

async function InjectORM(req: any, res, next) {
  req.orm = orm;
  if (!req.orm) {
    req.orm = await InitORM();
  }
  orm.em.setFilterParams('user', { ...req.user });

  RequestContext.create(req.orm.em, next);
}

export { InjectORM, orm, InitORM };
