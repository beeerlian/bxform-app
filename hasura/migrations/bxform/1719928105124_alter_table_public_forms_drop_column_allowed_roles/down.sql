alter table "public"."forms" alter column "allowed_roles" drop not null;
alter table "public"."forms" add column "allowed_roles" _uuid;
