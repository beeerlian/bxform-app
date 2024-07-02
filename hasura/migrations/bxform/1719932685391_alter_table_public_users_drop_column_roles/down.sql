alter table "public"."users" alter column "roles" drop not null;
alter table "public"."users" add column "roles" uuid;
