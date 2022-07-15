'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20220714071808 extends Migration {

  async up() {
    this.addSql('create table "content" ("id" varchar(255) not null, "url" varchar(255) not null, "type" text check ("type" in (\'FILE\', \'VIDEO\')) not null, "status" text check ("status" in (\'ACTIVE\', \'PROCESSING\', \'DELETED\')) not null);');
    this.addSql('alter table "content" add constraint "content_pkey" primary key ("id");');
  }

  async down() {
    this.addSql('drop table if exists "content" cascade;');
  }

}
exports.Migration20220714071808 = Migration20220714071808;
