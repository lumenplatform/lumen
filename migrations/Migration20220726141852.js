'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20220726141852 extends Migration {

  async up() {
    this.addSql('alter table "user" drop constraint "user_organization_org_id_foreign";');

    this.addSql('alter table "payment" drop column "created_at"');
    this.addSql('alter table "payment" add column "created_at" timestamptz not null default now()');

    this.addSql('alter table "user" alter column "preferences_weekly_recommendations" type boolean using ("preferences_weekly_recommendations"::boolean);');
    this.addSql('alter table "user" alter column "preferences_weekly_recommendations" set default true;');
    this.addSql('alter table "user" alter column "preferences_promotions" type boolean using ("preferences_promotions"::boolean);');
    this.addSql('alter table "user" alter column "preferences_promotions" set default false;');
    this.addSql('alter table "user" alter column "preferences_course_announcements" type boolean using ("preferences_course_announcements"::boolean);');
    this.addSql('alter table "user" alter column "preferences_course_announcements" set default true;');
    this.addSql('alter table "user" alter column "preferences_course_reminders" type boolean using ("preferences_course_reminders"::boolean);');
    this.addSql('alter table "user" alter column "preferences_course_reminders" set default true;');
    this.addSql('alter table "user" alter column "preferences_discussion_forums" type boolean using ("preferences_discussion_forums"::boolean);');
    this.addSql('alter table "user" alter column "preferences_discussion_forums" set default true;');
    this.addSql('alter table "user" alter column "organization_org_id" type varchar(255) using ("organization_org_id"::varchar(255));');
    this.addSql('alter table "user" alter column "organization_org_id" drop not null;');
    this.addSql('alter table "user" add constraint "user_organization_org_id_foreign" foreign key ("organization_org_id") references "organization" ("org_id") on update cascade on delete set null;');

    this.addSql('alter table "course" add column "rating" int not null default 0, add column "rating_count" int not null default 0;');
  }

  async down() {
    this.addSql('alter table "user" drop constraint "user_organization_org_id_foreign";');

    this.addSql('alter table "payment" alter column "created_at" type jsonb using ("created_at"::jsonb);');

    this.addSql('alter table "user" alter column "preferences_weekly_recommendations" drop default;');
    this.addSql('alter table "user" alter column "preferences_weekly_recommendations" type jsonb using ("preferences_weekly_recommendations"::jsonb);');
    this.addSql('alter table "user" alter column "preferences_promotions" drop default;');
    this.addSql('alter table "user" alter column "preferences_promotions" type jsonb using ("preferences_promotions"::jsonb);');
    this.addSql('alter table "user" alter column "preferences_course_announcements" drop default;');
    this.addSql('alter table "user" alter column "preferences_course_announcements" type jsonb using ("preferences_course_announcements"::jsonb);');
    this.addSql('alter table "user" alter column "preferences_course_reminders" drop default;');
    this.addSql('alter table "user" alter column "preferences_course_reminders" type jsonb using ("preferences_course_reminders"::jsonb);');
    this.addSql('alter table "user" alter column "preferences_discussion_forums" drop default;');
    this.addSql('alter table "user" alter column "preferences_discussion_forums" type jsonb using ("preferences_discussion_forums"::jsonb);');
    this.addSql('alter table "user" alter column "organization_org_id" type varchar(255) using ("organization_org_id"::varchar(255));');
    this.addSql('alter table "user" alter column "organization_org_id" set not null;');
    this.addSql('alter table "user" add constraint "user_organization_org_id_foreign" foreign key ("organization_org_id") references "organization" ("org_id") on update cascade;');

    this.addSql('alter table "course" drop column "rating";');
    this.addSql('alter table "course" drop column "rating_count";');
  }

}
exports.Migration20220726141852 = Migration20220726141852;
