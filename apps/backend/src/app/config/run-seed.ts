import { config } from 'dotenv';

config({ path: __dirname + '/../../../../../.env' });

import { InitORM } from './db';
import { ORMLogger } from './db.config';
import { DatabaseSeeder } from './seeders/DatabaseSeeder';

(async () => {
  const orm = await InitORM();
  await orm.getSchemaGenerator().refreshDatabase();
  const seeder = orm.getSeeder();
  await seeder.seed(DatabaseSeeder);
  ORMLogger.info('seeding ran');
  process.exit(0);
})();
