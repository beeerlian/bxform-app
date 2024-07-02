CREATE TABLE "public"."form_audiences" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "role_id" uuid NOT NULL, "form_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz, PRIMARY KEY ("id") , FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
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
CREATE TRIGGER "set_public_form_audiences_updated_at"
BEFORE UPDATE ON "public"."form_audiences"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_form_audiences_updated_at" ON "public"."form_audiences"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
