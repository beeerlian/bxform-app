alter table "public"."questions"
  add constraint "questions_question_type_fkey"
  foreign key ("question_type")
  references "public"."question_types"
  ("id") on update restrict on delete restrict;
