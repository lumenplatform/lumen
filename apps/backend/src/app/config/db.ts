import { Knex } from 'knex';

const knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
});

export const db: Knex = knex;

(async () => {
  await db.schema.dropTableIfExists('users');

  await db.schema.createTable('users', function (t) {
    t.increments('id').primary();
    t.string('first_name', 100);
    t.string('last_name', 100);
    t.string('email', 100);
  });

  await db('users').insert({
    email: 'ignore@example.com',
    first_name: 'John Doe',
    last_name: 'John Doe',
  });
})();
