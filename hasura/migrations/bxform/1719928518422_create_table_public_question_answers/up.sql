CREATE TABLE "public"."question_answers" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "question_id" uuid NOT NULL, "answer_sheet_id" uuid NOT NULL, "answer" jsonb NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz, PRIMARY KEY ("id") , FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("answer_sheet_id") REFERENCES "public"."answer_sheets"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_question_answers_updated_at"
BEFORE UPDATE ON "public"."question_answers"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_question_answers_updated_at" ON "public"."question_answers"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
