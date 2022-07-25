'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20220715070535 extends Migration {

  async up() {
    this.addSql('create table "content" ("id" varchar(255) not null, "url" varchar(255) not null, "type" text check ("type" in (\'FILE\', \'VIDEO\')) not null, "status" text check ("status" in (\'UPLOADED\', \'ACTIVE\', \'PROCESSING\', \'DELETED\')) not null, "mime" varchar(255) not null, "name" varchar(255) not null, "config" jsonb not null, "content_key" varchar(255) null, "streaming_urls" jsonb null);');
    this.addSql('alter table "content" add constraint "content_pkey" primary key ("id");');

    this.addSql('drop table if exists "users" cascade;');
  }

  async down() {
    this.addSql('create table "users" ("id" serial primary key, "first_name" varchar null default null, "last_name" varchar null default null, "email" varchar null default null);');

    this.addSql('drop table if exists "content" cascade;');
  }

}
exports.Migration20220715070535 = Migration20220715070535;
