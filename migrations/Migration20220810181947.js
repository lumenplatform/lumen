'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20220810181947 extends Migration {

  async up() {
    this.addSql('create table "quiz" ("id" varchar(255) not null, "course_course_id" varchar(255) not null, "created_at" timestamptz(0) not null, "settings_title" varchar(255) not null, "settings_instructions" varchar(255) not null, "settings_duration_duration_minutes" int not null, "settings_contribution" int not null, "settings_duration_duration_seconds" int not null, "settings_pass_grade" int not null, "settings_randomize_questions" boolean not null, "settings_randomize_answers" boolean not null, "settings_time_box_state" boolean not null, "settings_time_box_is_all_questions" boolean not null, "settings_time_box_duration_minutes" int not null, "settings_time_box_duration_seconds" int not null);');
    this.addSql('alter table "quiz" add constraint "quiz_pkey" primary key ("id");');

    this.addSql('create table "question" ("id" varchar(255) not null, "exam_id" varchar(255) not null, "question" varchar(255) not null, "type" text check ("type" in (\'mcq\', \'essay\')) not null, "marks" int not null, "duration_seconds" int not null);');
    this.addSql('alter table "question" add constraint "question_pkey" primary key ("id");');

    this.addSql('create table "answer" ("id" varchar(255) not null, "question_id" varchar(255) not null, "answer" varchar(255) not null, "correct" boolean not null);');
    this.addSql('alter table "answer" add constraint "answer_pkey" primary key ("id");');

    this.addSql('alter table "quiz" add constraint "quiz_course_course_id_foreign" foreign key ("course_course_id") references "course" ("course_id") on update cascade;');

    this.addSql('alter table "question" add constraint "question_exam_id_foreign" foreign key ("exam_id") references "quiz" ("id") on update cascade;');

    this.addSql('alter table "answer" add constraint "answer_question_id_foreign" foreign key ("question_id") references "question" ("id") on update cascade;');
  }

  async down() {
    this.addSql('alter table "question" drop constraint "question_exam_id_foreign";');

    this.addSql('alter table "answer" drop constraint "answer_question_id_foreign";');

    this.addSql('drop table if exists "quiz" cascade;');

    this.addSql('drop table if exists "question" cascade;');

    this.addSql('drop table if exists "answer" cascade;');
  }

}
exports.Migration20220810181947 = Migration20220810181947;
