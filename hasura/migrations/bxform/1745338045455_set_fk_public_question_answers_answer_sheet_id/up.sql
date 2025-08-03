alter table "public"."question_answers"
  add constraint "question_answers_answer_sheet_id_fkey"
  foreign key ("answer_sheet_id")
  references "public"."answer_sheets"
  ("id") on update restrict on delete restrict;
