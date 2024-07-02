alter table "public"."form_access"
  add constraint "form_access_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
