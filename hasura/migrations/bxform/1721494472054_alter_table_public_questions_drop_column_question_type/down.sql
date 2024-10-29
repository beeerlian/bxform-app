alter table "public"."questions"
  add constraint "questions_question_type_fkey"
  foreign key (question_type)
  references "public"."question_types"
  (id) on update restrict on delete restrict;
alter table "public"."questions" alter column "question_type" drop not null;
alter table "public"."questions" add column "question_type" int4;
