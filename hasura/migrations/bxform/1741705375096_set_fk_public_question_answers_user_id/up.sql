alter table "public"."question_answers"
  add constraint "question_answers_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
