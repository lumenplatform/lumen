'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20220721175931 extends Migration {

  async up() {
    this.addSql('create table "payment" ("txn_id" varchar(255) not null, "amount" int not null, "created_at" jsonb not null);');
    this.addSql('alter table "payment" add constraint "payment_pkey" primary key ("txn_id");');

    this.addSql('create table "asset" ("id" varchar(255) not null, "url" varchar(255) not null, "type" text check ("type" in (\'FILE\', \'IMAGE\', \'PDF\', \'VIDEO\')) not null, "status" text check ("status" in (\'UPLOADED\', \'ACTIVE\', \'PROCESSING\', \'DELETED\')) not null, "mime" varchar(255) not null, "name" varchar(255) not null, "config" jsonb not null, "content_key" varchar(255) null, "streaming_urls" jsonb null);');
    this.addSql('alter table "asset" add constraint "asset_pkey" primary key ("id");');

    this.addSql('create table "organization" ("org_id" varchar(255) not null, "name" varchar(255) not null, "customizations_logo_id" varchar(255) not null);');
    this.addSql('alter table "organization" add constraint "organization_customizations_logo_id_unique" unique ("customizations_logo_id");');
    this.addSql('alter table "organization" add constraint "organization_pkey" primary key ("org_id");');

    this.addSql('create table "user" ("uid" varchar(255) not null, "time_zone" varchar(255) not null, "preferences_preferred_theme" varchar(255) not null, "preferences_weekly_recommendations" jsonb not null, "preferences_promotions" jsonb not null, "preferences_course_announcements" jsonb not null, "preferences_course_reminders" jsonb not null, "preferences_discussion_forums" jsonb not null, "status" text check ("status" in (\'ACTIVE\', \'INACTIVE\')) not null, "organization_org_id" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("uid");');

    this.addSql('create table "notification" ("id" varchar(255) not null, "sent_at" timestamptz(0) not null, "title" varchar(255) not null, "message" varchar(255) not null, "link" varchar(255) not null, "seen" boolean not null, "user_uid" varchar(255) not null);');
    this.addSql('alter table "notification" add constraint "notification_pkey" primary key ("id");');

    this.addSql('create table "course" ("course_id" varchar(255) not null, "title" varchar(255) not null, "subtitle" varchar(255) not null, "description" varchar(255) not null, "language" varchar(255) not null, "level" varchar(255) not null, "tags" varchar(255) not null, "subject_area" varchar(255) not null, "duration" int not null, "price" int not null, "course_image_id" varchar(255) not null, "promotional_video_id" varchar(255) not null, "organization_org_id" varchar(255) not null, "welcome_message" varchar(255) not null, "congrats_message" varchar(255) not null, "learning_outcome" jsonb not null, "prerequisites" jsonb not null, "intended_audience" jsonb not null, "status" text check ("status" in (\'DRAFT\', \'PUBLISHED\', \'UNPUBLISHED\')) not null);');
    this.addSql('alter table "course" add constraint "course_course_image_id_unique" unique ("course_image_id");');
    this.addSql('alter table "course" add constraint "course_promotional_video_id_unique" unique ("promotional_video_id");');
    this.addSql('alter table "course" add constraint "course_pkey" primary key ("course_id");');

    this.addSql('create table "enrollment" ("enrollment_id" varchar(255) not null, "user_uid" varchar(255) not null, "course_course_id" varchar(255) not null, "enrollment_date" timestamptz(0) not null, "payment_txn_id" varchar(255) not null, "status" text check ("status" in (\'ACTIVE\', \'COMPLETED\', \'ABANDONED\')) not null);');
    this.addSql('alter table "enrollment" add constraint "enrollment_pkey" primary key ("enrollment_id");');

    this.addSql('create table "course_review" ("user_uid" varchar(255) not null, "enrollment_enrollment_id" varchar(255) not null, "rating" int not null, "review" varchar(255) not null);');
    this.addSql('alter table "course_review" add constraint "course_review_pkey" primary key ("user_uid", "enrollment_enrollment_id");');

    this.addSql('create table "course_instructors" ("course_course_id" varchar(255) not null, "user_uid" varchar(255) not null);');
    this.addSql('alter table "course_instructors" add constraint "course_instructors_pkey" primary key ("course_course_id", "user_uid");');

    this.addSql('create table "course_moderators" ("course_course_id" varchar(255) not null, "user_uid" varchar(255) not null);');
    this.addSql('alter table "course_moderators" add constraint "course_moderators_pkey" primary key ("course_course_id", "user_uid");');

    this.addSql('create table "course_material" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "time_estimate" int not null, "content_id" varchar(255) not null, "parent_id" varchar(255) not null, "course_course_id" varchar(255) not null);');
    this.addSql('alter table "course_material" add constraint "course_material_pkey" primary key ("id");');

    this.addSql('alter table "organization" add constraint "organization_customizations_logo_id_foreign" foreign key ("customizations_logo_id") references "asset" ("id") on update cascade;');

    this.addSql('alter table "user" add constraint "user_organization_org_id_foreign" foreign key ("organization_org_id") references "organization" ("org_id") on update cascade;');

    this.addSql('alter table "notification" add constraint "notification_user_uid_foreign" foreign key ("user_uid") references "user" ("uid") on update cascade;');

    this.addSql('alter table "course" add constraint "course_course_image_id_foreign" foreign key ("course_image_id") references "asset" ("id") on update cascade;');
    this.addSql('alter table "course" add constraint "course_promotional_video_id_foreign" foreign key ("promotional_video_id") references "asset" ("id") on update cascade;');
    this.addSql('alter table "course" add constraint "course_organization_org_id_foreign" foreign key ("organization_org_id") references "organization" ("org_id") on update cascade;');

    this.addSql('alter table "enrollment" add constraint "enrollment_user_uid_foreign" foreign key ("user_uid") references "user" ("uid") on update cascade;');
    this.addSql('alter table "enrollment" add constraint "enrollment_course_course_id_foreign" foreign key ("course_course_id") references "course" ("course_id") on update cascade;');
    this.addSql('alter table "enrollment" add constraint "enrollment_payment_txn_id_foreign" foreign key ("payment_txn_id") references "payment" ("txn_id") on update cascade;');

    this.addSql('alter table "course_review" add constraint "course_review_user_uid_foreign" foreign key ("user_uid") references "user" ("uid") on update cascade;');
    this.addSql('alter table "course_review" add constraint "course_review_enrollment_enrollment_id_foreign" foreign key ("enrollment_enrollment_id") references "enrollment" ("enrollment_id") on update cascade;');

    this.addSql('alter table "course_instructors" add constraint "course_instructors_course_course_id_foreign" foreign key ("course_course_id") references "course" ("course_id") on update cascade on delete cascade;');
    this.addSql('alter table "course_instructors" add constraint "course_instructors_user_uid_foreign" foreign key ("user_uid") references "user" ("uid") on update cascade on delete cascade;');

    this.addSql('alter table "course_moderators" add constraint "course_moderators_course_course_id_foreign" foreign key ("course_course_id") references "course" ("course_id") on update cascade on delete cascade;');
    this.addSql('alter table "course_moderators" add constraint "course_moderators_user_uid_foreign" foreign key ("user_uid") references "user" ("uid") on update cascade on delete cascade;');

    this.addSql('alter table "course_material" add constraint "course_material_content_id_foreign" foreign key ("content_id") references "asset" ("id") on update cascade;');
    this.addSql('alter table "course_material" add constraint "course_material_parent_id_foreign" foreign key ("parent_id") references "course_material" ("id") on update cascade;');
    this.addSql('alter table "course_material" add constraint "course_material_course_course_id_foreign" foreign key ("course_course_id") references "course" ("course_id") on update cascade;');

    this.addSql('drop table if exists "content" cascade;');
  }

  async down() {
    this.addSql('alter table "enrollment" drop constraint "enrollment_payment_txn_id_foreign";');

    this.addSql('alter table "organization" drop constraint "organization_customizations_logo_id_foreign";');

    this.addSql('alter table "course" drop constraint "course_course_image_id_foreign";');

    this.addSql('alter table "course" drop constraint "course_promotional_video_id_foreign";');

    this.addSql('alter table "course_material" drop constraint "course_material_content_id_foreign";');

    this.addSql('alter table "user" drop constraint "user_organization_org_id_foreign";');

    this.addSql('alter table "course" drop constraint "course_organization_org_id_foreign";');

    this.addSql('alter table "notification" drop constraint "notification_user_uid_foreign";');

    this.addSql('alter table "enrollment" drop constraint "enrollment_user_uid_foreign";');

    this.addSql('alter table "course_review" drop constraint "course_review_user_uid_foreign";');

    this.addSql('alter table "course_instructors" drop constraint "course_instructors_user_uid_foreign";');

    this.addSql('alter table "course_moderators" drop constraint "course_moderators_user_uid_foreign";');

    this.addSql('alter table "enrollment" drop constraint "enrollment_course_course_id_foreign";');

    this.addSql('alter table "course_instructors" drop constraint "course_instructors_course_course_id_foreign";');

    this.addSql('alter table "course_moderators" drop constraint "course_moderators_course_course_id_foreign";');

    this.addSql('alter table "course_material" drop constraint "course_material_course_course_id_foreign";');

    this.addSql('alter table "course_review" drop constraint "course_review_enrollment_enrollment_id_foreign";');

    this.addSql('alter table "course_material" drop constraint "course_material_parent_id_foreign";');

    this.addSql('create table "content" ("id" varchar(255) not null, "url" varchar(255) not null, "type" text check ("type" in (\'FILE\', \'VIDEO\')) not null, "status" text check ("status" in (\'UPLOADED\', \'ACTIVE\', \'PROCESSING\', \'DELETED\')) not null, "mime" varchar(255) not null, "name" varchar(255) not null, "config" jsonb not null, "content_key" varchar(255) null, "streaming_urls" jsonb null);');
    this.addSql('alter table "content" add constraint "content_pkey" primary key ("id");');

    this.addSql('drop table if exists "payment" cascade;');

    this.addSql('drop table if exists "asset" cascade;');

    this.addSql('drop table if exists "organization" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "notification" cascade;');

    this.addSql('drop table if exists "course" cascade;');

    this.addSql('drop table if exists "enrollment" cascade;');

    this.addSql('drop table if exists "course_review" cascade;');

    this.addSql('drop table if exists "course_instructors" cascade;');

    this.addSql('drop table if exists "course_moderators" cascade;');

    this.addSql('drop table if exists "course_material" cascade;');
  }

}
exports.Migration20220721175931 = Migration20220721175931;
