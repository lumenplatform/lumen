require('dotenv').config({ path: __dirname + '/../../../../../.env' });

import { InitORM } from './db';
import { ORMLogger } from './db.config';

(async () => {
  const orm = await InitORM();
  const migrator = orm.getMigrator();
  let migration = await migrator.createMigration();
  ORMLogger.info(migration);
  ORMLogger.info('migration generated');
  process.exit(0);
})();
