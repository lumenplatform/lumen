'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20220808182518 extends Migration {

  async up() {
    this.addSql('create table "user_invite" ("id" varchar(255) not null, "email" varchar(255) not null, "expires_at" timestamptz(0) not null, "organization_org_id" varchar(255) null, "course_course_id" varchar(255) null, "type" text check ("type" in (\'COURSE\', \'ORGANIZATION\')) not null, "used" boolean not null);');
    this.addSql('alter table "user_invite" add constraint "user_invite_pkey" primary key ("id");');

    this.addSql('alter table "user_invite" add constraint "user_invite_organization_org_id_foreign" foreign key ("organization_org_id") references "organization" ("org_id") on update cascade on delete set null;');
    this.addSql('alter table "user_invite" add constraint "user_invite_course_course_id_foreign" foreign key ("course_course_id") references "course" ("course_id") on update cascade on delete set null;');

    this.addSql('alter table "course_material" drop constraint "course_material_content_id_foreign";');
    this.addSql('alter table "course_material" drop constraint "course_material_parent_id_foreign";');
    this.addSql('alter table "course_material" drop constraint "course_material_course_course_id_foreign";');

    this.addSql('alter table "asset" alter column "config" type jsonb using ("config"::jsonb);');
    this.addSql('alter table "asset" alter column "config" drop not null;');

    this.addSql('alter table "user" add column "email" varchar(255) not null, add column "name" varchar(255) not null, add column "picture" varchar(255) not null default \'https://www.gravatar.com/avatar/0?d=mp\';');

    this.addSql('alter table "course_material" add column "article" text null, add column "video_id" varchar(255) null;');
    this.addSql('alter table "course_material" alter column "description" type text using ("description"::text);');
    this.addSql('alter table "course_material" alter column "description" drop not null;');
    this.addSql('alter table "course_material" alter column "time_estimate" type int using ("time_estimate"::int);');
    this.addSql('alter table "course_material" alter column "time_estimate" drop not null;');
    this.addSql('alter table "course_material" alter column "parent_id" type varchar(255) using ("parent_id"::varchar(255));');
    this.addSql('alter table "course_material" alter column "parent_id" drop not null;');
    this.addSql('alter table "course_material" alter column "course_course_id" type varchar(255) using ("course_course_id"::varchar(255));');
    this.addSql('alter table "course_material" alter column "course_course_id" drop not null;');
    this.addSql('alter table "course_material" add constraint "course_material_video_id_foreign" foreign key ("video_id") references "asset" ("id") on update cascade on delete set null;');
    this.addSql('alter table "course_material" rename column "content_id" to "content_type";');
    this.addSql('alter table "course_material" add constraint "course_material_parent_id_foreign" foreign key ("parent_id") references "course_material" ("id") on update cascade on delete set null;');
    this.addSql('alter table "course_material" add constraint "course_material_course_course_id_foreign" foreign key ("course_course_id") references "course" ("course_id") on update cascade on delete set null;');
  }

  async down() {
    this.addSql('drop table if exists "user_invite" cascade;');

    this.addSql('alter table "course_material" drop constraint "course_material_video_id_foreign";');
    this.addSql('alter table "course_material" drop constraint "course_material_parent_id_foreign";');
    this.addSql('alter table "course_material" drop constraint "course_material_course_course_id_foreign";');

    this.addSql('alter table "asset" alter column "config" type jsonb using ("config"::jsonb);');
    this.addSql('alter table "asset" alter column "config" set not null;');

    this.addSql('alter table "user" drop column "email";');
    this.addSql('alter table "user" drop column "name";');
    this.addSql('alter table "user" drop column "picture";');

    this.addSql('alter table "course_material" alter column "description" type varchar(255) using ("description"::varchar(255));');
    this.addSql('alter table "course_material" alter column "description" set not null;');
    this.addSql('alter table "course_material" alter column "time_estimate" type int using ("time_estimate"::int);');
    this.addSql('alter table "course_material" alter column "time_estimate" set not null;');
    this.addSql('alter table "course_material" alter column "parent_id" type varchar(255) using ("parent_id"::varchar(255));');
    this.addSql('alter table "course_material" alter column "parent_id" set not null;');
    this.addSql('alter table "course_material" alter column "course_course_id" type varchar(255) using ("course_course_id"::varchar(255));');
    this.addSql('alter table "course_material" alter column "course_course_id" set not null;');
    this.addSql('alter table "course_material" drop column "article";');
    this.addSql('alter table "course_material" drop column "video_id";');
    this.addSql('alter table "course_material" rename column "content_type" to "content_id";');
    this.addSql('alter table "course_material" add constraint "course_material_content_id_foreign" foreign key ("content_id") references "asset" ("id") on update cascade;');
    this.addSql('alter table "course_material" add constraint "course_material_parent_id_foreign" foreign key ("parent_id") references "course_material" ("id") on update cascade;');
    this.addSql('alter table "course_material" add constraint "course_material_course_course_id_foreign" foreign key ("course_course_id") references "course" ("course_id") on update cascade;');
  }

}
exports.Migration20220808182518 = Migration20220808182518;
