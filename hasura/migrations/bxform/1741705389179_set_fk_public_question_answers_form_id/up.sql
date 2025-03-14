alter table "public"."question_answers"
  add constraint "question_answers_form_id_fkey"
  foreign key ("form_id")
  references "public"."forms"
  ("id") on update restrict on delete restrict;
