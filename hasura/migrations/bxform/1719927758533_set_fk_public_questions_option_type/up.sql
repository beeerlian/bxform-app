alter table "public"."questions"
  add constraint "questions_option_type_fkey"
  foreign key ("option_type")
  references "public"."option_types"
  ("id") on update restrict on delete restrict;
