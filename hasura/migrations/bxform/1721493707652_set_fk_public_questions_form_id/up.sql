alter table "public"."questions"
  add constraint "questions_form_id_fkey"
  foreign key ("form_id")
  references "public"."forms"
  ("id") on update restrict on delete restrict;
