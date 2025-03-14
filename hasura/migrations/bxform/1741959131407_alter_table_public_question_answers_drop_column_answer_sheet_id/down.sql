alter table "public"."question_answers" alter column "answer_sheet_id" drop not null;
alter table "public"."question_answers" add column "answer_sheet_id" uuid;
