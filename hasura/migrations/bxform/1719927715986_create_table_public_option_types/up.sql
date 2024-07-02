CREATE TABLE "public"."option_types" ("id" serial NOT NULL, "code" text NOT NULL, "name" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("code"));
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
CREATE TRIGGER "set_public_option_types_updated_at"
BEFORE UPDATE ON "public"."option_types"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_option_types_updated_at" ON "public"."option_types"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
