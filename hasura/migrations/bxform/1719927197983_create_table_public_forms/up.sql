CREATE TABLE "public"."forms" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "title" text NOT NULL, "start_date" timestamptz, "end_date" timestamptz, "status" int2 NOT NULL DEFAULT 1, "allowed_roles" uuid[], "target_audience" integer, "password" text, "public_id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz, "created_by" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("public_id"));
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
CREATE TRIGGER "set_public_forms_updated_at"
BEFORE UPDATE ON "public"."forms"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_forms_updated_at" ON "public"."forms"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
