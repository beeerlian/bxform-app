--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:6yyCQOu5ToFMkXBrgb7YCA==$9IPGafN8rA9tfzO+DsEbqyyPAGSU+DEulCBbZiBHzco=:MqY77JFTPrUniQjesm8In5dwxVAvrU5Ii1zjGGK0wdM=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "bxform" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: bxform; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE bxform WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE bxform OWNER TO postgres;

\connect bxform

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: hdb_catalog; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hdb_catalog;


ALTER SCHEMA hdb_catalog OWNER TO postgres;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: gen_hasura_uuid(); Type: FUNCTION; Schema: hdb_catalog; Owner: postgres
--

CREATE FUNCTION hdb_catalog.gen_hasura_uuid() RETURNS uuid
    LANGUAGE sql
    AS $$select gen_random_uuid()$$;


ALTER FUNCTION hdb_catalog.gen_hasura_uuid() OWNER TO postgres;

--
-- Name: set_current_timestamp_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;


ALTER FUNCTION public.set_current_timestamp_updated_at() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hdb_action_log; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_action_log (
    id uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    action_name text,
    input_payload jsonb NOT NULL,
    request_headers jsonb NOT NULL,
    session_variables jsonb NOT NULL,
    response_payload jsonb,
    errors jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    response_received_at timestamp with time zone,
    status text NOT NULL,
    CONSTRAINT hdb_action_log_status_check CHECK ((status = ANY (ARRAY['created'::text, 'processing'::text, 'completed'::text, 'error'::text])))
);


ALTER TABLE hdb_catalog.hdb_action_log OWNER TO postgres;

--
-- Name: hdb_cron_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_cron_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_cron_event_invocation_logs OWNER TO postgres;

--
-- Name: hdb_cron_events; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_cron_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    trigger_name text NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_cron_events OWNER TO postgres;

--
-- Name: hdb_metadata; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_metadata (
    id integer NOT NULL,
    metadata json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL
);


ALTER TABLE hdb_catalog.hdb_metadata OWNER TO postgres;

--
-- Name: hdb_scheduled_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_scheduled_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_scheduled_event_invocation_logs OWNER TO postgres;

--
-- Name: hdb_scheduled_events; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_scheduled_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    webhook_conf json NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    retry_conf json,
    payload json,
    header_conf json,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    comment text,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_scheduled_events OWNER TO postgres;

--
-- Name: hdb_schema_notifications; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_schema_notifications (
    id integer NOT NULL,
    notification json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL,
    instance_id uuid NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT hdb_schema_notifications_id_check CHECK ((id = 1))
);


ALTER TABLE hdb_catalog.hdb_schema_notifications OWNER TO postgres;

--
-- Name: hdb_version; Type: TABLE; Schema: hdb_catalog; Owner: postgres
--

CREATE TABLE hdb_catalog.hdb_version (
    hasura_uuid uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    version text NOT NULL,
    upgraded_on timestamp with time zone NOT NULL,
    cli_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    console_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    ee_client_id text,
    ee_client_secret text
);


ALTER TABLE hdb_catalog.hdb_version OWNER TO postgres;

--
-- Name: answer_sheets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answer_sheets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    form_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    recorded boolean DEFAULT false NOT NULL
);


ALTER TABLE public.answer_sheets OWNER TO postgres;

--
-- Name: form_access; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.form_access (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    form_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.form_access OWNER TO postgres;

--
-- Name: form_audiences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.form_audiences (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    role_id uuid NOT NULL,
    form_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.form_audiences OWNER TO postgres;

--
-- Name: form_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.form_category (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.form_category OWNER TO postgres;

--
-- Name: forms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forms (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    status smallint DEFAULT 1 NOT NULL,
    target_audience integer,
    password text,
    public_id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    created_by uuid NOT NULL,
    category_id uuid,
    is_public boolean DEFAULT false NOT NULL
);


ALTER TABLE public.forms OWNER TO postgres;

--
-- Name: question_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question_types (
    id integer NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.question_types OWNER TO postgres;

--
-- Name: TABLE question_types; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.question_types IS 'Tipe pertanyaan, menjadi refference table dari table questions.option_types';


--
-- Name: option_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.option_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.option_types_id_seq OWNER TO postgres;

--
-- Name: option_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.option_types_id_seq OWNED BY public.question_types.id;


--
-- Name: question_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question_answers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    question_id uuid NOT NULL,
    answer jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    form_id uuid NOT NULL,
    user_id uuid NOT NULL,
    answer_sheet_id uuid NOT NULL
);


ALTER TABLE public.question_answers OWNER TO postgres;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    topic text,
    content text NOT NULL,
    caption text,
    option jsonb,
    question_type_id integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    form_id uuid NOT NULL,
    "order" integer,
    required boolean DEFAULT false NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: question_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_types ALTER COLUMN id SET DEFAULT nextval('public.option_types_id_seq'::regclass);


--
-- Data for Name: hdb_action_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_action_log (id, action_name, input_payload, request_headers, session_variables, response_payload, errors, created_at, response_received_at, status) FROM stdin;
\.


--
-- Data for Name: hdb_cron_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_cron_event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_cron_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_cron_events (id, trigger_name, scheduled_time, status, tries, created_at, next_retry_at) FROM stdin;
\.


--
-- Data for Name: hdb_metadata; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_metadata (id, metadata, resource_version) FROM stdin;
1	{"sources":[{"configuration":{"connection_info":{"database_url":{"from_env":"HASURA_GRAPHQL_METADATA_DATABASE_URL"},"isolation_level":"read-committed","use_prepared_statements":false}},"kind":"postgres","name":"bxform","tables":[{"array_relationships":[{"name":"question_answers","using":{"foreign_key_constraint_on":{"column":"answer_sheet_id","table":{"name":"question_answers","schema":"public"}}}}],"object_relationships":[{"name":"form","using":{"foreign_key_constraint_on":"form_id"}},{"name":"user","using":{"foreign_key_constraint_on":"user_id"}}],"table":{"name":"answer_sheets","schema":"public"}},{"object_relationships":[{"name":"form","using":{"foreign_key_constraint_on":"form_id"}},{"name":"user","using":{"foreign_key_constraint_on":"user_id"}}],"table":{"name":"form_access","schema":"public"}},{"object_relationships":[{"name":"form","using":{"foreign_key_constraint_on":"form_id"}},{"name":"role","using":{"foreign_key_constraint_on":"role_id"}}],"table":{"name":"form_audiences","schema":"public"}},{"table":{"name":"form_category","schema":"public"}},{"array_relationships":[{"name":"form_accesses","using":{"foreign_key_constraint_on":{"column":"form_id","table":{"name":"form_access","schema":"public"}}}},{"name":"form_audiences","using":{"foreign_key_constraint_on":{"column":"form_id","table":{"name":"form_audiences","schema":"public"}}}},{"name":"question_answers","using":{"foreign_key_constraint_on":{"column":"form_id","table":{"name":"question_answers","schema":"public"}}}},{"name":"questions","using":{"foreign_key_constraint_on":{"column":"form_id","table":{"name":"questions","schema":"public"}}}}],"object_relationships":[{"name":"user","using":{"foreign_key_constraint_on":"created_by"}}],"table":{"name":"forms","schema":"public"}},{"object_relationships":[{"name":"form","using":{"foreign_key_constraint_on":"form_id"}},{"name":"question","using":{"foreign_key_constraint_on":"question_id"}},{"name":"user","using":{"foreign_key_constraint_on":"user_id"}}],"table":{"name":"question_answers","schema":"public"}},{"array_relationships":[{"name":"questions","using":{"foreign_key_constraint_on":{"column":"question_type_id","table":{"name":"questions","schema":"public"}}}}],"table":{"name":"question_types","schema":"public"}},{"array_relationships":[{"name":"question_answers","using":{"foreign_key_constraint_on":{"column":"question_id","table":{"name":"question_answers","schema":"public"}}}}],"object_relationships":[{"name":"form","using":{"foreign_key_constraint_on":"form_id"}},{"name":"question_type","using":{"foreign_key_constraint_on":"question_type_id"}}],"table":{"name":"questions","schema":"public"}},{"array_relationships":[{"name":"form_audiences","using":{"foreign_key_constraint_on":{"column":"role_id","table":{"name":"form_audiences","schema":"public"}}}},{"name":"user_roles","using":{"foreign_key_constraint_on":{"column":"role_id","table":{"name":"user_roles","schema":"public"}}}}],"table":{"name":"roles","schema":"public"}},{"object_relationships":[{"name":"role","using":{"foreign_key_constraint_on":"role_id"}},{"name":"user","using":{"foreign_key_constraint_on":"user_id"}}],"table":{"name":"user_roles","schema":"public"}},{"array_relationships":[{"name":"form_accesses","using":{"foreign_key_constraint_on":{"column":"user_id","table":{"name":"form_access","schema":"public"}}}},{"name":"forms","using":{"foreign_key_constraint_on":{"column":"created_by","table":{"name":"forms","schema":"public"}}}},{"name":"question_answers","using":{"foreign_key_constraint_on":{"column":"user_id","table":{"name":"question_answers","schema":"public"}}}},{"name":"user_roles","using":{"foreign_key_constraint_on":{"column":"user_id","table":{"name":"user_roles","schema":"public"}}}}],"table":{"name":"users","schema":"public"}}]}],"version":3}	8
\.


--
-- Data for Name: hdb_scheduled_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_scheduled_event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_scheduled_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_scheduled_events (id, webhook_conf, scheduled_time, retry_conf, payload, header_conf, status, tries, created_at, next_retry_at, comment) FROM stdin;
\.


--
-- Data for Name: hdb_schema_notifications; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_schema_notifications (id, notification, resource_version, instance_id, updated_at) FROM stdin;
1	{"metadata":false,"remote_schemas":[],"sources":[],"data_connectors":[]}	8	dd7c6fcf-ddf7-4781-905f-e8884f21edb3	2025-08-03 11:52:19.378832+00
\.


--
-- Data for Name: hdb_version; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_version (hasura_uuid, version, upgraded_on, cli_state, console_state, ee_client_id, ee_client_secret) FROM stdin;
df14f6f2-fc7c-4865-8b89-417b57dc2dab	48	2025-08-03 11:14:32.553905+00	{"settings": {"migration_mode": "true"}, "migrations": {"bxform": {"1719933344194": false, "1721456718911": false, "1721456758322": false, "1721493675140": false, "1721493707652": false, "1721494262441": false, "1721494419455": false, "1721494472054": false, "1721494516361": false, "1721494532764": false, "1721494551434": false, "1721494673995": false, "1722426309646": false, "1740075069157": false, "1741454721834": false, "1741704984993": false, "1741704997782": false, "1741705300597": false, "1741705350806": false, "1741705375096": false, "1741705389179": false, "1741959131407": false, "1741965767561": false, "1754223905199": false}}, "isStateCopyCompleted": true}	{"console_notifications": {"admin": {"date": "2025-08-03T11:49:53.018Z", "read": [], "showBadge": false}}}	\N	\N
\.


--
-- Data for Name: answer_sheets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answer_sheets (id, form_id, user_id, created_at, updated_at, recorded) FROM stdin;
ff39d79f-7534-49fd-b4e4-f9b7feeb25d9	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	2025-09-02 17:46:58.985311+00	\N	f
a5db008d-eeeb-4020-afe2-9075de9634d9	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	2025-09-02 17:53:21.361339+00	\N	f
89cd40d3-a5ce-4c68-94d0-7e063c933953	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	2025-09-02 17:55:25.866993+00	\N	f
0b75ec24-0e04-43f7-802c-11ec479170f1	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	2025-09-02 17:57:59.907359+00	\N	f
eaf11ed9-8721-41fc-abf0-c5e8e8cc8221	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	2025-09-02 17:59:09.840122+00	\N	f
\.


--
-- Data for Name: form_access; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.form_access (id, user_id, form_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: form_audiences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.form_audiences (id, role_id, form_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: form_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.form_category (id, name, slug, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forms (id, title, start_date, end_date, status, target_audience, password, public_id, created_at, updated_at, created_by, category_id, is_public) FROM stdin;
667c8ecc-fbc2-426a-8e56-f65613e71a95	Survey 1	\N	\N	1	\N	pass	312c0ca3-7524-45ea-8f7b-a0b0583f4dc0	2024-07-19 19:39:18.027076+00	2024-07-20 06:48:45.733514+00	3f77419b-b62d-4e52-808d-098a831ace03	\N	f
ce7e8ce7-3d7a-479f-a95b-4ecfd0f69b79	Survey 2	\N	\N	1	\N	pass	835ee5ba-e729-455c-9401-f8ec8bbd6bff	2024-07-19 19:39:23.013084+00	2024-07-20 06:48:55.843104+00	3f77419b-b62d-4e52-808d-098a831ace03	\N	f
9aea2978-060b-4094-b4ac-886e94f69455	Survey Kepuasan Pegawai	\N	\N	1	\N	pass	78844f2b-0552-4cf8-872f-0e243021b59f	2024-07-20 06:50:02.288+00	\N	3f77419b-b62d-4e52-808d-098a831ace03	\N	f
ba4b6056-8872-4a59-b2b5-f06b9b909b5f	Survey 2	\N	\N	3	\N	pass	7ee94a76-c4b5-4546-afef-7777cf7441a6	2024-07-19 19:39:21.53745+00	2024-07-20 06:53:57.160876+00	3f77419b-b62d-4e52-808d-098a831ace03	\N	f
2ea8b15d-d164-4e86-a76a-4cf7c74d85c3	Survey	\N	\N	3	\N	pass	d6b960d9-6f7b-4d2e-af7d-11be5f2a2262	2024-07-19 19:39:24.664568+00	2024-07-20 06:54:05.758759+00	3f77419b-b62d-4e52-808d-098a831ace03	\N	f
4f9a400e-dd42-4424-9cd5-5a39bab2385e	Survey	\N	\N	2	\N	pass	28eebaf6-b524-4577-8332-86274c3dde3f	2024-07-19 19:39:23.861038+00	2024-07-20 06:54:16.631073+00	3f77419b-b62d-4e52-808d-098a831ace03	\N	f
8430e17d-be9a-4789-a85a-c49a3a2a6701	Survey Kepuasan Dosen	\N	\N	2	\N	pass	0c0d1b70-631b-47cb-b6d4-a69e3b863d8a	2024-07-20 06:49:54.310727+00	2024-07-20 06:56:05.377892+00	3f77419b-b62d-4e52-808d-098a831ace03	\N	f
e4a8a21c-27be-4eb8-bb2e-03c2f2b909df	Survey Kepuasan Alumni	\N	\N	2	\N	pass	c79b7a23-716c-4e6d-805d-02cc6a28855e	2024-07-20 06:50:08.764188+00	2024-07-20 06:56:41.99316+00	3f77419b-b62d-4e52-808d-098a831ace03	\N	f
e85960b4-4d78-4d9c-bdc2-ae263ff28d10	Survey Kepuasan Mahasiswa 3	2025-03-12 17:00:00+00	2025-03-10 17:00:00+00	2	100	password	e9905e58-0ab7-4293-983d-161c86c01a01	2024-07-20 06:49:46.793502+00	2025-09-02 15:17:37.010664+00	3f77419b-b62d-4e52-808d-098a831ace03	\N	t
\.


--
-- Data for Name: question_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question_answers (id, question_id, answer, created_at, updated_at, form_id, user_id, answer_sheet_id) FROM stdin;
69942eed-24c4-4f09-8b8f-bbc1178e41f5	6f558438-a24c-45f9-a4f1-cc4472adc3d5	"[{\\"value\\":\\"1\\",\\"label\\":\\"Laki-laki\\",\\"selected\\":true,\\"id\\":\\"gender-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Perempuan\\",\\"selected\\":false,\\"id\\":\\"gender-2\\"}]"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
0b3d8434-cec7-4cda-aa16-bd668d95c6b1	84c2c406-8c0a-48b5-99f2-48b19a57aee9	"Kertabumi"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
cad1c4fe-d97a-418e-a4b1-d846b862282b	59c3167a-7957-4cff-aa5a-610a07556f2a	"2131231"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
8706e983-edfc-4573-bb70-6d4ff16a0eb8	803918d3-6e5c-4fcd-a20b-c0516b8f0fd1	"12312312312"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
35112d3e-917f-4ff1-adfb-79c1cf834e78	8ccada0e-fed8-440d-9b39-e97370aabc4d	"naufal.berlian.99@gmail.com"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
43f97ec2-844f-4a3d-b84f-cd50ef6fcac1	f47fb1a3-bbf8-4a4c-b914-5889b847bb75	"Naufal Berlian Taufiqurrohman"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
a0332304-090b-47ce-ba81-af22a2929ab9	7ce9dd01-2585-4a6e-9431-427ab1c47b0d	"{\\"id\\":\\"ratio5-5\\",\\"label\\":\\"Selalu\\",\\"value\\":5}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
d42fa572-bf54-4151-a9ae-f96d4e1fd8d8	790a4395-6833-40cb-9124-70a931193a13	"[{\\"value\\":\\"1\\",\\"label\\":\\"Programming\\",\\"selected\\":true,\\"id\\":\\"multiple5-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Leadership\\",\\"selected\\":true,\\"id\\":\\"multiple5-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Communication\\",\\"selected\\":false,\\"id\\":\\"multiple5-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Problem Solving\\",\\"selected\\":false,\\"id\\":\\"multiple5-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Project Management\\",\\"selected\\":false,\\"id\\":\\"multiple5-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Research & Analysis\\",\\"selected\\":false,\\"id\\":\\"multiple5-6\\"}]"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
8c41bb3d-4145-4fb4-83c1-491f309cefc6	64a18b13-e95d-47b8-93ab-a251932fe3b7	"{\\"id\\":\\"ratio4-4\\",\\"label\\":\\"Puas\\",\\"value\\":4}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
76b13dce-cfec-41ff-ad2e-e347fc4861a9	8add33e3-d1ff-4428-aade-f697ea648352	"[{\\"value\\":\\"1\\",\\"label\\":\\"Tatap muka di kelas\\",\\"selected\\":false,\\"id\\":\\"multiple4-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Online learning\\",\\"selected\\":false,\\"id\\":\\"multiple4-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Blended learning\\",\\"selected\\":true,\\"id\\":\\"multiple4-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Praktikum laboratorium\\",\\"selected\\":true,\\"id\\":\\"multiple4-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Project-based learning\\",\\"selected\\":true,\\"id\\":\\"multiple4-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Studi kasus\\",\\"selected\\":false,\\"id\\":\\"multiple4-6\\"}]"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
a5fbb13f-cd3b-4082-9dc8-1f97ff0dc046	1813df8e-0561-4db9-86fa-face5ff360c3	"[{\\"value\\":\\"1\\",\\"label\\":\\"Bekerja di perusahaan teknologi\\",\\"selected\\":false,\\"id\\":\\"multiple3-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Melanjutkan studi S2\\",\\"selected\\":false,\\"id\\":\\"multiple3-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Berwirausaha/startup\\",\\"selected\\":true,\\"id\\":\\"multiple3-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Bekerja sebagai freelancer\\",\\"selected\\":true,\\"id\\":\\"multiple3-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Menjadi dosen/peneliti\\",\\"selected\\":true,\\"id\\":\\"multiple3-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Belum tahu\\",\\"selected\\":false,\\"id\\":\\"multiple3-6\\"}]"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
635ef328-a1e4-44d8-bde9-08c7cf8a3639	7d90d554-3291-4e1e-aa92-a1cbdb5e1677	"[{\\"value\\":\\"1\\",\\"label\\":\\"Artificial Intelligence\\",\\"selected\\":false,\\"id\\":\\"multiple2-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Cybersecurity\\",\\"selected\\":true,\\"id\\":\\"multiple2-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Data Science\\",\\"selected\\":true,\\"id\\":\\"multiple2-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Software Engineering\\",\\"selected\\":true,\\"id\\":\\"multiple2-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Internet of Things\\",\\"selected\\":false,\\"id\\":\\"multiple2-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Mobile Development\\",\\"selected\\":false,\\"id\\":\\"multiple2-6\\"}]"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
e6d51776-9069-4422-b1e1-9a84e79f4e1c	1c812755-b1f6-4ce1-aea6-bc581cc32f50	"[{\\"value\\":\\"1\\",\\"label\\":\\"Teknik Informatika\\",\\"selected\\":false,\\"id\\":\\"multiple1-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Sistem Informasi\\",\\"selected\\":true,\\"id\\":\\"multiple1-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Teknik Elektro\\",\\"selected\\":true,\\"id\\":\\"multiple1-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Manajemen\\",\\"selected\\":true,\\"id\\":\\"multiple1-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Akuntansi\\",\\"selected\\":false,\\"id\\":\\"multiple1-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Lainnya\\",\\"selected\\":false,\\"id\\":\\"multiple1-6\\"}]"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
a0a84f91-0a6a-40b0-b4a5-1ca05551dc8e	775b363d-a81f-4e8a-88a7-0c5f5d101f2d	"{\\"id\\":\\"ratio3-2\\",\\"label\\":\\"1-2 publikasi\\",\\"value\\":2}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
97a8c253-4c2b-418b-8706-dfc256a17826	9065c95f-b599-4732-a619-19b7d7577842	"{\\"id\\":\\"ratio2-4\\",\\"label\\":\\"Sering (3-4 kali/minggu)\\",\\"value\\":4}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
e765f58a-d10c-4a20-ba2d-93f456ef1ac9	c0ca410b-fb0d-4b74-9368-946d31bab15c	"{\\"id\\":\\"ratio1-1\\",\\"label\\":\\"6 bulan\\",\\"value\\":1}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
50c14490-134a-4cda-94fa-c0b5b923f9b8	57ec4f97-9f34-451b-8298-41ff3aa441ed	"{\\"importance\\":{\\"id\\":\\"imp10-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf10-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
5fa56e5e-8808-4a54-b3f3-af8423fec584	995f7ad4-8117-409b-b0df-671d8033c752	"{\\"importance\\":{\\"id\\":\\"imp9-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf9-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
38d5fc58-dbcf-4043-bda4-449ffbfcdf32	b91d5489-4094-47d4-adc7-7c22c948b36e	"{\\"importance\\":{\\"id\\":\\"imp8-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf8-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
5a8c9696-6cf3-4de3-9fc2-1e95548eb3b1	baae43c3-0b76-4912-a150-68aeba457020	"{\\"importance\\":{\\"id\\":\\"imp7-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf7-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
ee4d7173-7508-48ef-bb04-06cc0358cd75	efc72a11-68e4-486b-8364-a938b5ade907	"{\\"importance\\":{\\"id\\":\\"imp6-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf6-3\\",\\"label\\":\\"Cukup\\",\\"value\\":3}}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
d1d2c051-322a-4b59-8385-a7c43a70918c	2615b3ad-a653-4b28-8037-f238b6b3e131	"{\\"importance\\":{\\"id\\":\\"imp5-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf5-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
f66cc2f6-6a28-4123-8002-a12c7fb835fb	48c4c3af-413f-4716-9250-a79101954bec	"{\\"importance\\":{\\"id\\":\\"imp4-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf4-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
466f8f23-5fdd-432d-87fd-5a6f756b5b7c	3a9631c3-a6fc-4da0-b74b-f2e6796430db	"{\\"importance\\":{\\"id\\":\\"imp3-3\\",\\"label\\":\\"Cukup Penting\\",\\"value\\":3},\\"performance\\":{\\"id\\":\\"perf3-3\\",\\"label\\":\\"Cukup\\",\\"value\\":3}}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
6ca0258b-5415-48bc-9fbd-bcf1c1077bbd	7c47dbdb-f3b1-4839-8d7b-9c22953cf025	"{\\"importance\\":{\\"id\\":\\"imp2-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf2-3\\",\\"label\\":\\"Cukup\\",\\"value\\":3}}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
b618e3d6-eae0-476a-9e3d-490be934c81e	9872ffe1-3564-48ea-a49c-bababa1d45c5	"{\\"importance\\":{\\"id\\":\\"imp1-2\\",\\"label\\":\\"Tidak Penting\\",\\"value\\":2},\\"performance\\":{\\"id\\":\\"perf1-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:46:58.995014+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	ff39d79f-7534-49fd-b4e4-f9b7feeb25d9
984bb830-ee25-422d-8e94-f54fbc5095b7	6f558438-a24c-45f9-a4f1-cc4472adc3d5	"[{\\"value\\":\\"1\\",\\"label\\":\\"Laki-laki\\",\\"selected\\":true,\\"id\\":\\"gender-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Perempuan\\",\\"selected\\":false,\\"id\\":\\"gender-2\\"}]"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
0f705f4c-eca5-4a8b-bdd9-dab60687e67e	84c2c406-8c0a-48b5-99f2-48b19a57aee9	"Kertabumi"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
db333d38-1099-4ffc-91cb-ddff8bd932ea	59c3167a-7957-4cff-aa5a-610a07556f2a	"2018"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
0de754d4-9fa2-4f44-b7e3-67de4f8796c7	803918d3-6e5c-4fcd-a20b-c0516b8f0fd1	"1209388923"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
35259a3e-ae66-47f1-8011-088d2a86b010	8ccada0e-fed8-440d-9b39-e97370aabc4d	"naufal.berlian.99@gmail.com"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
ff8540e3-0474-4d38-8728-7232152833a5	f47fb1a3-bbf8-4a4c-b914-5889b847bb75	"Naufal Berlian Taufiqurrohman"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
6a13c4ce-9923-4e16-b01e-7934236d4b33	7ce9dd01-2585-4a6e-9431-427ab1c47b0d	"{\\"id\\":\\"ratio5-2\\",\\"label\\":\\"Jarang\\",\\"value\\":2}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
13e7feb3-64d7-4fdc-a21c-7a5c19d4ef02	790a4395-6833-40cb-9124-70a931193a13	"[{\\"value\\":\\"1\\",\\"label\\":\\"Programming\\",\\"selected\\":true,\\"id\\":\\"multiple5-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Leadership\\",\\"selected\\":true,\\"id\\":\\"multiple5-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Communication\\",\\"selected\\":false,\\"id\\":\\"multiple5-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Problem Solving\\",\\"selected\\":false,\\"id\\":\\"multiple5-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Project Management\\",\\"selected\\":false,\\"id\\":\\"multiple5-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Research & Analysis\\",\\"selected\\":false,\\"id\\":\\"multiple5-6\\"}]"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
751062d2-4a32-4dab-9197-e40e417894b4	64a18b13-e95d-47b8-93ab-a251932fe3b7	"{\\"id\\":\\"ratio4-4\\",\\"label\\":\\"Puas\\",\\"value\\":4}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
699b79d8-960d-4732-b957-91890bce5df2	8add33e3-d1ff-4428-aade-f697ea648352	"[{\\"value\\":\\"1\\",\\"label\\":\\"Tatap muka di kelas\\",\\"selected\\":false,\\"id\\":\\"multiple4-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Online learning\\",\\"selected\\":true,\\"id\\":\\"multiple4-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Blended learning\\",\\"selected\\":true,\\"id\\":\\"multiple4-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Praktikum laboratorium\\",\\"selected\\":false,\\"id\\":\\"multiple4-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Project-based learning\\",\\"selected\\":false,\\"id\\":\\"multiple4-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Studi kasus\\",\\"selected\\":false,\\"id\\":\\"multiple4-6\\"}]"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
62100f04-982e-4aa8-853c-891ef85dfc84	1813df8e-0561-4db9-86fa-face5ff360c3	"[{\\"value\\":\\"1\\",\\"label\\":\\"Bekerja di perusahaan teknologi\\",\\"selected\\":true,\\"id\\":\\"multiple3-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Melanjutkan studi S2\\",\\"selected\\":true,\\"id\\":\\"multiple3-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Berwirausaha/startup\\",\\"selected\\":true,\\"id\\":\\"multiple3-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Bekerja sebagai freelancer\\",\\"selected\\":false,\\"id\\":\\"multiple3-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Menjadi dosen/peneliti\\",\\"selected\\":false,\\"id\\":\\"multiple3-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Belum tahu\\",\\"selected\\":false,\\"id\\":\\"multiple3-6\\"}]"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
908f3f69-0966-4d9e-877d-2a0846670603	7d90d554-3291-4e1e-aa92-a1cbdb5e1677	"[{\\"value\\":\\"1\\",\\"label\\":\\"Artificial Intelligence\\",\\"selected\\":true,\\"id\\":\\"multiple2-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Cybersecurity\\",\\"selected\\":true,\\"id\\":\\"multiple2-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Data Science\\",\\"selected\\":true,\\"id\\":\\"multiple2-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Software Engineering\\",\\"selected\\":true,\\"id\\":\\"multiple2-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Internet of Things\\",\\"selected\\":false,\\"id\\":\\"multiple2-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Mobile Development\\",\\"selected\\":false,\\"id\\":\\"multiple2-6\\"}]"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
e700bbf8-ac4c-4da5-8c41-e919c98b92f8	1c812755-b1f6-4ce1-aea6-bc581cc32f50	"[{\\"value\\":\\"1\\",\\"label\\":\\"Teknik Informatika\\",\\"selected\\":true,\\"id\\":\\"multiple1-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Sistem Informasi\\",\\"selected\\":true,\\"id\\":\\"multiple1-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Teknik Elektro\\",\\"selected\\":false,\\"id\\":\\"multiple1-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Manajemen\\",\\"selected\\":false,\\"id\\":\\"multiple1-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Akuntansi\\",\\"selected\\":false,\\"id\\":\\"multiple1-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Lainnya\\",\\"selected\\":false,\\"id\\":\\"multiple1-6\\"}]"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
eedb40c6-1d40-48ee-8d4f-229a960e8a0b	775b363d-a81f-4e8a-88a7-0c5f5d101f2d	"{\\"id\\":\\"ratio3-2\\",\\"label\\":\\"1-2 publikasi\\",\\"value\\":2}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
31a605d2-e2e4-48a2-a555-afc98cc3bd2d	9065c95f-b599-4732-a619-19b7d7577842	"{\\"id\\":\\"ratio2-3\\",\\"label\\":\\"Cukup sering (1-2 kali/minggu)\\",\\"value\\":3}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
cf38f6f5-b6c1-47e0-9d33-cadd05b54eee	c0ca410b-fb0d-4b74-9368-946d31bab15c	"{\\"id\\":\\"ratio1-1\\",\\"label\\":\\"6 bulan\\",\\"value\\":1}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
0a681d74-5344-41ff-a13c-764887ab95e1	57ec4f97-9f34-451b-8298-41ff3aa441ed	"{\\"importance\\":{\\"id\\":\\"imp10-2\\",\\"label\\":\\"Tidak Penting\\",\\"value\\":2},\\"performance\\":{\\"id\\":\\"perf10-1\\",\\"label\\":\\"Sangat Kurang\\",\\"value\\":1}}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
af2eed81-65dd-47c1-9000-d7992b517b19	995f7ad4-8117-409b-b0df-671d8033c752	"{\\"importance\\":{\\"id\\":\\"imp9-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf9-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
d44894e1-6bd2-46a1-9a06-250bdd8aeba2	b91d5489-4094-47d4-adc7-7c22c948b36e	"{\\"importance\\":{\\"id\\":\\"imp8-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf8-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
6122f6e6-b38c-440a-9ed0-24327f5b290a	baae43c3-0b76-4912-a150-68aeba457020	"{\\"importance\\":{\\"id\\":\\"imp7-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf7-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
376e1b3b-7123-4ea2-91f7-ff5168f8917d	efc72a11-68e4-486b-8364-a938b5ade907	"{\\"importance\\":{\\"id\\":\\"imp6-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf6-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
73a6bd4a-4af5-4567-8ace-595d96281d3f	2615b3ad-a653-4b28-8037-f238b6b3e131	"{\\"importance\\":{\\"id\\":\\"imp5-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf5-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
b9fd5ab8-593f-47e0-9b7a-108a2f45ad18	48c4c3af-413f-4716-9250-a79101954bec	"{\\"importance\\":{\\"id\\":\\"imp4-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf4-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
f56854a1-da36-4b43-bb16-910d8de54c91	3a9631c3-a6fc-4da0-b74b-f2e6796430db	"{\\"importance\\":{\\"id\\":\\"imp3-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf3-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
bc89cf6d-e084-4f98-b2db-80ef29d68a06	7c47dbdb-f3b1-4839-8d7b-9c22953cf025	"{\\"importance\\":{\\"id\\":\\"imp2-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf2-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
3a05c122-b5c7-48f0-975a-49d5db7a68c9	9872ffe1-3564-48ea-a49c-bababa1d45c5	"{\\"importance\\":{\\"id\\":\\"imp1-3\\",\\"label\\":\\"Cukup Penting\\",\\"value\\":3},\\"performance\\":{\\"id\\":\\"perf1-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:53:21.371424+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	a5db008d-eeeb-4020-afe2-9075de9634d9
fc24af9e-4c1c-4b6a-8656-59adc75e74fe	6f558438-a24c-45f9-a4f1-cc4472adc3d5	"[{\\"value\\":\\"1\\",\\"label\\":\\"Laki-laki\\",\\"selected\\":true,\\"id\\":\\"gender-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Perempuan\\",\\"selected\\":false,\\"id\\":\\"gender-2\\"}]"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
346f339c-791d-49af-83b4-ecdbe86e0cea	84c2c406-8c0a-48b5-99f2-48b19a57aee9	"Kertabumi"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
7c41f24b-147e-472c-9ae9-fdec254b8857	59c3167a-7957-4cff-aa5a-610a07556f2a	"2001"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
6ccd9e28-cbf3-40fb-a7e8-f2cbcb8ec2e6	803918d3-6e5c-4fcd-a20b-c0516b8f0fd1	"1231231231231"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
1b4fb7f4-2a1d-4c98-99f6-b36b17d0e759	8ccada0e-fed8-440d-9b39-e97370aabc4d	"naufal.berlian.99@gmail.com"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
9117bb4d-116d-4ce7-ba5f-91c3041a408b	f47fb1a3-bbf8-4a4c-b914-5889b847bb75	"Naufal Berlian Taufiqurrohman"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
cf7bcf4a-620c-4dc7-904d-d17aa65d9430	7ce9dd01-2585-4a6e-9431-427ab1c47b0d	"{\\"id\\":\\"ratio5-4\\",\\"label\\":\\"Sering\\",\\"value\\":4}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
2ed039da-b6c5-453e-aa7a-f7a9343d20db	790a4395-6833-40cb-9124-70a931193a13	"[{\\"value\\":\\"1\\",\\"label\\":\\"Programming\\",\\"selected\\":false,\\"id\\":\\"multiple5-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Leadership\\",\\"selected\\":false,\\"id\\":\\"multiple5-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Communication\\",\\"selected\\":false,\\"id\\":\\"multiple5-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Problem Solving\\",\\"selected\\":false,\\"id\\":\\"multiple5-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Project Management\\",\\"selected\\":true,\\"id\\":\\"multiple5-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Research & Analysis\\",\\"selected\\":false,\\"id\\":\\"multiple5-6\\"}]"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
1ed5670f-3855-4f02-8e61-53bd02e467e9	64a18b13-e95d-47b8-93ab-a251932fe3b7	"{\\"id\\":\\"ratio4-4\\",\\"label\\":\\"Puas\\",\\"value\\":4}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
7cde013c-c1c3-48b4-8495-f1aabb7259a7	8add33e3-d1ff-4428-aade-f697ea648352	"[{\\"value\\":\\"1\\",\\"label\\":\\"Tatap muka di kelas\\",\\"selected\\":true,\\"id\\":\\"multiple4-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Online learning\\",\\"selected\\":true,\\"id\\":\\"multiple4-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Blended learning\\",\\"selected\\":true,\\"id\\":\\"multiple4-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Praktikum laboratorium\\",\\"selected\\":false,\\"id\\":\\"multiple4-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Project-based learning\\",\\"selected\\":false,\\"id\\":\\"multiple4-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Studi kasus\\",\\"selected\\":false,\\"id\\":\\"multiple4-6\\"}]"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
029402e7-1d4c-4cf4-af99-89f5b2f82c8b	1813df8e-0561-4db9-86fa-face5ff360c3	"[{\\"value\\":\\"1\\",\\"label\\":\\"Bekerja di perusahaan teknologi\\",\\"selected\\":false,\\"id\\":\\"multiple3-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Melanjutkan studi S2\\",\\"selected\\":true,\\"id\\":\\"multiple3-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Berwirausaha/startup\\",\\"selected\\":true,\\"id\\":\\"multiple3-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Bekerja sebagai freelancer\\",\\"selected\\":true,\\"id\\":\\"multiple3-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Menjadi dosen/peneliti\\",\\"selected\\":false,\\"id\\":\\"multiple3-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Belum tahu\\",\\"selected\\":false,\\"id\\":\\"multiple3-6\\"}]"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
b8bb94b6-c9bd-46ba-9b42-e10c01861c07	7d90d554-3291-4e1e-aa92-a1cbdb5e1677	"[{\\"value\\":\\"1\\",\\"label\\":\\"Artificial Intelligence\\",\\"selected\\":false,\\"id\\":\\"multiple2-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Cybersecurity\\",\\"selected\\":false,\\"id\\":\\"multiple2-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Data Science\\",\\"selected\\":true,\\"id\\":\\"multiple2-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Software Engineering\\",\\"selected\\":true,\\"id\\":\\"multiple2-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Internet of Things\\",\\"selected\\":true,\\"id\\":\\"multiple2-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Mobile Development\\",\\"selected\\":false,\\"id\\":\\"multiple2-6\\"}]"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
2e41cbed-663e-480d-a82a-e818408b173b	1c812755-b1f6-4ce1-aea6-bc581cc32f50	"[{\\"value\\":\\"1\\",\\"label\\":\\"Teknik Informatika\\",\\"selected\\":false,\\"id\\":\\"multiple1-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Sistem Informasi\\",\\"selected\\":true,\\"id\\":\\"multiple1-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Teknik Elektro\\",\\"selected\\":true,\\"id\\":\\"multiple1-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Manajemen\\",\\"selected\\":true,\\"id\\":\\"multiple1-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Akuntansi\\",\\"selected\\":false,\\"id\\":\\"multiple1-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Lainnya\\",\\"selected\\":false,\\"id\\":\\"multiple1-6\\"}]"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
0312d4f2-9441-4c76-b3e2-dafb7b9ba77b	775b363d-a81f-4e8a-88a7-0c5f5d101f2d	"{\\"id\\":\\"ratio3-4\\",\\"label\\":\\"6-10 publikasi\\",\\"value\\":4}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
a2c26b6c-7afe-4fa5-8360-847529c16535	9065c95f-b599-4732-a619-19b7d7577842	"{\\"id\\":\\"ratio2-4\\",\\"label\\":\\"Sering (3-4 kali/minggu)\\",\\"value\\":4}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
e14a7cda-6ecc-48fa-86a3-d93c1bbd5c1e	c0ca410b-fb0d-4b74-9368-946d31bab15c	"{\\"id\\":\\"ratio1-3\\",\\"label\\":\\"1.5 tahun\\",\\"value\\":3}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
ff85dcb4-05e3-405c-baa8-6809ee2afc3f	57ec4f97-9f34-451b-8298-41ff3aa441ed	"{\\"importance\\":{\\"id\\":\\"imp10-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf10-2\\",\\"label\\":\\"Kurang\\",\\"value\\":2}}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
e647b5f2-0d90-4dc5-b1e7-1a2b4724f360	995f7ad4-8117-409b-b0df-671d8033c752	"{\\"importance\\":{\\"id\\":\\"imp9-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf9-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
e17e073a-1f2d-43aa-a013-ee9af0386cb6	b91d5489-4094-47d4-adc7-7c22c948b36e	"{\\"importance\\":{\\"id\\":\\"imp8-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf8-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
5ac8e34f-3762-48c9-9f37-279911b6a782	baae43c3-0b76-4912-a150-68aeba457020	"{\\"importance\\":{\\"id\\":\\"imp7-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf7-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
921922c5-9765-4d4f-b6be-ab75527bb76c	efc72a11-68e4-486b-8364-a938b5ade907	"{\\"importance\\":{\\"id\\":\\"imp6-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf6-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
1875c03b-f4df-45ec-9b15-ec9177638c40	2615b3ad-a653-4b28-8037-f238b6b3e131	"{\\"importance\\":{\\"id\\":\\"imp5-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf5-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
bc881b55-858c-4cf4-949f-aaf9546d53be	48c4c3af-413f-4716-9250-a79101954bec	"{\\"importance\\":{\\"id\\":\\"imp4-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf4-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
71d4c6f7-26a3-4001-8d24-4dec316b7e0f	3a9631c3-a6fc-4da0-b74b-f2e6796430db	"{\\"importance\\":{\\"id\\":\\"imp3-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf3-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
81a3d5d6-1c41-4e0a-8de4-61e1791abc90	7c47dbdb-f3b1-4839-8d7b-9c22953cf025	"{\\"importance\\":{\\"id\\":\\"imp2-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf2-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
c0264833-dca3-4bd5-bff6-6b9bfd02cfbf	9872ffe1-3564-48ea-a49c-bababa1d45c5	"{\\"importance\\":{\\"id\\":\\"imp1-3\\",\\"label\\":\\"Cukup Penting\\",\\"value\\":3},\\"performance\\":{\\"id\\":\\"perf1-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:55:25.878552+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	89cd40d3-a5ce-4c68-94d0-7e063c933953
84e6e004-5349-43b0-985b-0f684c6d47a3	6f558438-a24c-45f9-a4f1-cc4472adc3d5	"[{\\"value\\":\\"1\\",\\"label\\":\\"Laki-laki\\",\\"selected\\":true,\\"id\\":\\"gender-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Perempuan\\",\\"selected\\":false,\\"id\\":\\"gender-2\\"}]"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
f69dd044-3c88-4d75-b98f-254b85465be6	84c2c406-8c0a-48b5-99f2-48b19a57aee9	"Kertabumi"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
2afd5ca2-7483-4c28-9ef7-d70701237674	59c3167a-7957-4cff-aa5a-610a07556f2a	"2018"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
bd962588-9398-4017-88f3-6c2652324853	803918d3-6e5c-4fcd-a20b-c0516b8f0fd1	"12313123123"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
1f285fa7-bf9b-4554-b5d1-48fb73472542	8ccada0e-fed8-440d-9b39-e97370aabc4d	"naufal.berlian.99@gmail.com"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
89a8e8ac-bd83-400c-97b9-dfb0b90511d4	f47fb1a3-bbf8-4a4c-b914-5889b847bb75	"Naufal Berlian Taufiqurrohman"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
0c392bbc-c590-4262-8107-2029ba69aae6	7ce9dd01-2585-4a6e-9431-427ab1c47b0d	"{\\"id\\":\\"ratio5-3\\",\\"label\\":\\"Kadang-kadang\\",\\"value\\":3}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
80bed1ad-cd68-45b9-903b-160dbb6cdefa	790a4395-6833-40cb-9124-70a931193a13	"[{\\"value\\":\\"1\\",\\"label\\":\\"Programming\\",\\"selected\\":false,\\"id\\":\\"multiple5-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Leadership\\",\\"selected\\":false,\\"id\\":\\"multiple5-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Communication\\",\\"selected\\":true,\\"id\\":\\"multiple5-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Problem Solving\\",\\"selected\\":false,\\"id\\":\\"multiple5-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Project Management\\",\\"selected\\":false,\\"id\\":\\"multiple5-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Research & Analysis\\",\\"selected\\":false,\\"id\\":\\"multiple5-6\\"}]"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
10189059-c450-451e-a9ca-467800053ca5	64a18b13-e95d-47b8-93ab-a251932fe3b7	"{\\"id\\":\\"ratio4-5\\",\\"label\\":\\"Sangat puas\\",\\"value\\":5}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
a8c0bf59-33fe-4742-975c-25da98aff22c	8add33e3-d1ff-4428-aade-f697ea648352	"[{\\"value\\":\\"1\\",\\"label\\":\\"Tatap muka di kelas\\",\\"selected\\":false,\\"id\\":\\"multiple4-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Online learning\\",\\"selected\\":false,\\"id\\":\\"multiple4-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Blended learning\\",\\"selected\\":true,\\"id\\":\\"multiple4-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Praktikum laboratorium\\",\\"selected\\":false,\\"id\\":\\"multiple4-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Project-based learning\\",\\"selected\\":false,\\"id\\":\\"multiple4-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Studi kasus\\",\\"selected\\":false,\\"id\\":\\"multiple4-6\\"}]"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
41eb4a9a-2382-4a19-beeb-ba1d9ad460a8	1813df8e-0561-4db9-86fa-face5ff360c3	"[{\\"value\\":\\"1\\",\\"label\\":\\"Bekerja di perusahaan teknologi\\",\\"selected\\":false,\\"id\\":\\"multiple3-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Melanjutkan studi S2\\",\\"selected\\":false,\\"id\\":\\"multiple3-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Berwirausaha/startup\\",\\"selected\\":true,\\"id\\":\\"multiple3-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Bekerja sebagai freelancer\\",\\"selected\\":false,\\"id\\":\\"multiple3-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Menjadi dosen/peneliti\\",\\"selected\\":false,\\"id\\":\\"multiple3-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Belum tahu\\",\\"selected\\":false,\\"id\\":\\"multiple3-6\\"}]"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
9d38fa5c-e70e-4622-af36-5b12e7203c9a	7d90d554-3291-4e1e-aa92-a1cbdb5e1677	"[{\\"value\\":\\"1\\",\\"label\\":\\"Artificial Intelligence\\",\\"selected\\":false,\\"id\\":\\"multiple2-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Cybersecurity\\",\\"selected\\":false,\\"id\\":\\"multiple2-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Data Science\\",\\"selected\\":false,\\"id\\":\\"multiple2-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Software Engineering\\",\\"selected\\":false,\\"id\\":\\"multiple2-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Internet of Things\\",\\"selected\\":true,\\"id\\":\\"multiple2-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Mobile Development\\",\\"selected\\":false,\\"id\\":\\"multiple2-6\\"}]"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
48e11bf4-1a26-48c9-a79b-a3e0471e642d	1c812755-b1f6-4ce1-aea6-bc581cc32f50	"[{\\"value\\":\\"1\\",\\"label\\":\\"Teknik Informatika\\",\\"selected\\":false,\\"id\\":\\"multiple1-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Sistem Informasi\\",\\"selected\\":true,\\"id\\":\\"multiple1-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Teknik Elektro\\",\\"selected\\":false,\\"id\\":\\"multiple1-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Manajemen\\",\\"selected\\":true,\\"id\\":\\"multiple1-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Akuntansi\\",\\"selected\\":false,\\"id\\":\\"multiple1-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Lainnya\\",\\"selected\\":false,\\"id\\":\\"multiple1-6\\"}]"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
7d962e3b-0ebe-4713-9de6-279d769984c9	775b363d-a81f-4e8a-88a7-0c5f5d101f2d	"{\\"id\\":\\"ratio3-2\\",\\"label\\":\\"1-2 publikasi\\",\\"value\\":2}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
ef105dad-bad4-4b52-89fa-66800b098ed6	9065c95f-b599-4732-a619-19b7d7577842	"{\\"id\\":\\"ratio2-4\\",\\"label\\":\\"Sering (3-4 kali/minggu)\\",\\"value\\":4}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
c299a5a0-8e81-4948-8ef1-f8cbb3c30c3a	c0ca410b-fb0d-4b74-9368-946d31bab15c	"{\\"id\\":\\"ratio1-3\\",\\"label\\":\\"1.5 tahun\\",\\"value\\":3}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
d7d47d3a-4187-4352-9516-a61d0ef861c1	57ec4f97-9f34-451b-8298-41ff3aa441ed	"{\\"importance\\":{\\"id\\":\\"imp10-1\\",\\"label\\":\\"Sangat Tidak Penting\\",\\"value\\":1},\\"performance\\":{\\"id\\":\\"perf10-2\\",\\"label\\":\\"Kurang\\",\\"value\\":2}}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
af9dfc2c-34b2-4c60-a408-f9c434cad8c3	995f7ad4-8117-409b-b0df-671d8033c752	"{\\"importance\\":{\\"id\\":\\"imp9-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf9-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
edb39c70-8d39-481c-b7b7-295db5704522	b91d5489-4094-47d4-adc7-7c22c948b36e	"{\\"importance\\":{\\"id\\":\\"imp8-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf8-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
10223ec8-2068-4708-926f-b96873ee40bb	baae43c3-0b76-4912-a150-68aeba457020	"{\\"importance\\":{\\"id\\":\\"imp7-3\\",\\"label\\":\\"Cukup Penting\\",\\"value\\":3},\\"performance\\":{\\"id\\":\\"perf7-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
af1b53f7-a1c5-4495-a852-fdc7b2be2843	efc72a11-68e4-486b-8364-a938b5ade907	"{\\"importance\\":{\\"id\\":\\"imp6-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf6-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
8ee6a0e0-1800-4203-a22d-eb040dd46bb6	2615b3ad-a653-4b28-8037-f238b6b3e131	"{\\"importance\\":{\\"id\\":\\"imp5-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf5-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
83906114-b217-4a60-ad3f-5bd02051407e	48c4c3af-413f-4716-9250-a79101954bec	"{\\"importance\\":{\\"id\\":\\"imp4-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf4-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
23cb8ff7-f982-4779-a72a-6be45a6b904d	3a9631c3-a6fc-4da0-b74b-f2e6796430db	"{\\"importance\\":{\\"id\\":\\"imp3-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf3-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
dbf9d911-7f42-4057-835a-c4876315e176	7c47dbdb-f3b1-4839-8d7b-9c22953cf025	"{\\"importance\\":{\\"id\\":\\"imp2-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf2-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
9bb46074-f5c7-49d8-a34f-1025acd2aae9	9872ffe1-3564-48ea-a49c-bababa1d45c5	"{\\"importance\\":{\\"id\\":\\"imp1-2\\",\\"label\\":\\"Tidak Penting\\",\\"value\\":2},\\"performance\\":{\\"id\\":\\"perf1-3\\",\\"label\\":\\"Cukup\\",\\"value\\":3}}"	2025-09-02 17:57:59.922007+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	0b75ec24-0e04-43f7-802c-11ec479170f1
b60a8a04-7b71-4e5a-908f-a7277b667f89	6f558438-a24c-45f9-a4f1-cc4472adc3d5	"[{\\"value\\":\\"1\\",\\"label\\":\\"Laki-laki\\",\\"selected\\":true,\\"id\\":\\"gender-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Perempuan\\",\\"selected\\":false,\\"id\\":\\"gender-2\\"}]"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
64bec1d6-a646-4d3d-98de-41345e567e0e	84c2c406-8c0a-48b5-99f2-48b19a57aee9	"Kertabumi"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
41c25c74-fed2-4198-ac2a-e5a7e3782ea1	59c3167a-7957-4cff-aa5a-610a07556f2a	"2019"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
e528eebe-ed1d-4810-b14e-c265624fae78	803918d3-6e5c-4fcd-a20b-c0516b8f0fd1	"213131231231"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
b8ec1fe0-86ca-4bd8-aca5-9f92e373365d	8ccada0e-fed8-440d-9b39-e97370aabc4d	"naufal.berlian.99@gmail.com"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
5bd6969f-b549-4c08-91d0-b671d296bf3d	f47fb1a3-bbf8-4a4c-b914-5889b847bb75	"Naufal Berlian Taufiqurrohman"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
011e4135-981b-4ff5-8995-ed088f8658f3	7ce9dd01-2585-4a6e-9431-427ab1c47b0d	"{\\"id\\":\\"ratio5-1\\",\\"label\\":\\"Tidak pernah\\",\\"value\\":1}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
24b49d69-09f5-4494-b812-9919c2c96abf	790a4395-6833-40cb-9124-70a931193a13	"[{\\"value\\":\\"1\\",\\"label\\":\\"Programming\\",\\"selected\\":false,\\"id\\":\\"multiple5-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Leadership\\",\\"selected\\":true,\\"id\\":\\"multiple5-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Communication\\",\\"selected\\":false,\\"id\\":\\"multiple5-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Problem Solving\\",\\"selected\\":false,\\"id\\":\\"multiple5-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Project Management\\",\\"selected\\":false,\\"id\\":\\"multiple5-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Research & Analysis\\",\\"selected\\":false,\\"id\\":\\"multiple5-6\\"}]"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
012bd690-6127-4a2b-9a51-5df1c41f8326	64a18b13-e95d-47b8-93ab-a251932fe3b7	"{\\"id\\":\\"ratio4-4\\",\\"label\\":\\"Puas\\",\\"value\\":4}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
0f972229-d324-42bb-af34-f99ab554fd87	8add33e3-d1ff-4428-aade-f697ea648352	"[{\\"value\\":\\"1\\",\\"label\\":\\"Tatap muka di kelas\\",\\"selected\\":false,\\"id\\":\\"multiple4-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Online learning\\",\\"selected\\":true,\\"id\\":\\"multiple4-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Blended learning\\",\\"selected\\":true,\\"id\\":\\"multiple4-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Praktikum laboratorium\\",\\"selected\\":false,\\"id\\":\\"multiple4-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Project-based learning\\",\\"selected\\":false,\\"id\\":\\"multiple4-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Studi kasus\\",\\"selected\\":false,\\"id\\":\\"multiple4-6\\"}]"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
8631add6-aaab-45ee-9628-a9a555f4a3da	1813df8e-0561-4db9-86fa-face5ff360c3	"[{\\"value\\":\\"1\\",\\"label\\":\\"Bekerja di perusahaan teknologi\\",\\"selected\\":false,\\"id\\":\\"multiple3-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Melanjutkan studi S2\\",\\"selected\\":true,\\"id\\":\\"multiple3-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Berwirausaha/startup\\",\\"selected\\":false,\\"id\\":\\"multiple3-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Bekerja sebagai freelancer\\",\\"selected\\":true,\\"id\\":\\"multiple3-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Menjadi dosen/peneliti\\",\\"selected\\":false,\\"id\\":\\"multiple3-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Belum tahu\\",\\"selected\\":false,\\"id\\":\\"multiple3-6\\"}]"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
bef94401-d1ad-4317-969a-c245be011b01	7d90d554-3291-4e1e-aa92-a1cbdb5e1677	"[{\\"value\\":\\"1\\",\\"label\\":\\"Artificial Intelligence\\",\\"selected\\":false,\\"id\\":\\"multiple2-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Cybersecurity\\",\\"selected\\":true,\\"id\\":\\"multiple2-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Data Science\\",\\"selected\\":true,\\"id\\":\\"multiple2-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Software Engineering\\",\\"selected\\":false,\\"id\\":\\"multiple2-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Internet of Things\\",\\"selected\\":false,\\"id\\":\\"multiple2-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Mobile Development\\",\\"selected\\":false,\\"id\\":\\"multiple2-6\\"}]"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
0ef9b46e-ed9b-4699-b8b5-1731820bf380	1c812755-b1f6-4ce1-aea6-bc581cc32f50	"[{\\"value\\":\\"1\\",\\"label\\":\\"Teknik Informatika\\",\\"selected\\":true,\\"id\\":\\"multiple1-1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Sistem Informasi\\",\\"selected\\":true,\\"id\\":\\"multiple1-2\\"},{\\"value\\":\\"3\\",\\"label\\":\\"Teknik Elektro\\",\\"selected\\":false,\\"id\\":\\"multiple1-3\\"},{\\"value\\":\\"4\\",\\"label\\":\\"Manajemen\\",\\"selected\\":false,\\"id\\":\\"multiple1-4\\"},{\\"value\\":\\"5\\",\\"label\\":\\"Akuntansi\\",\\"selected\\":false,\\"id\\":\\"multiple1-5\\"},{\\"value\\":\\"6\\",\\"label\\":\\"Lainnya\\",\\"selected\\":false,\\"id\\":\\"multiple1-6\\"}]"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
a011cf20-24d6-4e04-8039-414fc0f3024f	775b363d-a81f-4e8a-88a7-0c5f5d101f2d	"{\\"id\\":\\"ratio3-2\\",\\"label\\":\\"1-2 publikasi\\",\\"value\\":2}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
dc741c19-b27e-4720-aa18-25192921c1c0	9065c95f-b599-4732-a619-19b7d7577842	"{\\"id\\":\\"ratio2-3\\",\\"label\\":\\"Cukup sering (1-2 kali/minggu)\\",\\"value\\":3}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
c19d330b-58e1-4f63-838f-149ff3fece58	c0ca410b-fb0d-4b74-9368-946d31bab15c	"{\\"id\\":\\"ratio1-4\\",\\"label\\":\\"2 tahun\\",\\"value\\":4}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
252567d5-17d5-49b0-a268-a9a356b1eaf4	57ec4f97-9f34-451b-8298-41ff3aa441ed	"{\\"importance\\":{\\"id\\":\\"imp10-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf10-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
f1f5f9d8-5c48-407b-a2a1-b20fdce3b77d	995f7ad4-8117-409b-b0df-671d8033c752	"{\\"importance\\":{\\"id\\":\\"imp9-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf9-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
1b3719b7-a4b3-4a90-bec7-7c9730b84a15	b91d5489-4094-47d4-adc7-7c22c948b36e	"{\\"importance\\":{\\"id\\":\\"imp8-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf8-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
b59e54b0-4f2b-4a31-8f19-fec406a1c319	baae43c3-0b76-4912-a150-68aeba457020	"{\\"importance\\":{\\"id\\":\\"imp7-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf7-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
e0722081-74f3-44ec-9495-8edaf6621ed4	efc72a11-68e4-486b-8364-a938b5ade907	"{\\"importance\\":{\\"id\\":\\"imp6-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf6-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
eecc7a5e-5eaa-42eb-bdf2-1c45583461b3	2615b3ad-a653-4b28-8037-f238b6b3e131	"{\\"importance\\":{\\"id\\":\\"imp5-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf5-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
b0ad1b27-a938-43ba-be8a-49ed81ced8b2	48c4c3af-413f-4716-9250-a79101954bec	"{\\"importance\\":{\\"id\\":\\"imp4-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf4-4\\",\\"label\\":\\"Baik\\",\\"value\\":4}}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
002d4f9a-a867-4e74-9c60-7c93f7ebec4a	3a9631c3-a6fc-4da0-b74b-f2e6796430db	"{\\"importance\\":{\\"id\\":\\"imp3-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf3-3\\",\\"label\\":\\"Cukup\\",\\"value\\":3}}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
06c679b2-0e63-4906-807f-ca5b8b2773bd	7c47dbdb-f3b1-4839-8d7b-9c22953cf025	"{\\"importance\\":{\\"id\\":\\"imp2-4\\",\\"label\\":\\"Penting\\",\\"value\\":4},\\"performance\\":{\\"id\\":\\"perf2-3\\",\\"label\\":\\"Cukup\\",\\"value\\":3}}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
a7d486f2-b6ea-4f26-8cff-adc682d87d08	9872ffe1-3564-48ea-a49c-bababa1d45c5	"{\\"importance\\":{\\"id\\":\\"imp1-5\\",\\"label\\":\\"Sangat Penting\\",\\"value\\":5},\\"performance\\":{\\"id\\":\\"perf1-5\\",\\"label\\":\\"Sangat Baik\\",\\"value\\":5}}"	2025-09-02 17:59:09.851936+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	eaf11ed9-8721-41fc-abf0-c5e8e8cc8221
\.


--
-- Data for Name: question_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question_types (id, code, name, created_at, updated_at) FROM stdin;
1	essai	Essai	2024-07-20 16:44:15.683242+00	\N
2	ipa	Importance Performance	2024-07-20 16:44:39.569589+00	\N
3	text	Text	2024-07-20 16:44:53.796239+00	\N
4	option	Option	2024-07-20 16:45:10.05265+00	\N
5	multiple	Multiple	2024-07-20 16:45:29.238529+00	\N
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, topic, content, caption, option, question_type_id, created_at, updated_at, form_id, "order", required) FROM stdin;
81be1801-c35f-4719-9567-74a316a931b9	\N	Data Diri	Semalat mengerjakan	{"type": "Text"}	\N	2025-03-14 18:20:50.085055+00	2025-09-02 15:22:38.750954+00	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	9	f
9872ffe1-3564-48ea-a49c-bababa1d45c5	\N	Kualitas Dosen dalam Mengajar	\N	{"type": "Importance Performance", "importance": [{"id": "imp1-1", "label": "Sangat Tidak Penting", "value": 1}, {"id": "imp1-2", "label": "Tidak Penting", "value": 2}, {"id": "imp1-3", "label": "Cukup Penting", "value": 3}, {"id": "imp1-4", "label": "Penting", "value": 4}, {"id": "imp1-5", "label": "Sangat Penting", "value": 5}], "performance": [{"id": "perf1-1", "label": "Sangat Kurang", "value": 1}, {"id": "perf1-2", "label": "Kurang", "value": 2}, {"id": "perf1-3", "label": "Cukup", "value": 3}, {"id": "perf1-4", "label": "Baik", "value": 4}, {"id": "perf1-5", "label": "Sangat Baik", "value": 5}], "importanceQuestion": "Seberapa penting kualitas dosen dalam mengajar bagi anda?", "performanceQuestion": "Bagaimana performa kualitas dosen dalam mengajar menurut anda?"}	2	2025-08-25 13:16:50.167645+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	101	t
f47fb1a3-bbf8-4a4c-b914-5889b847bb75	\N	Nama Lengkap	\N	{"type": "Name", "option": []}	3	2025-08-25 13:05:15.220358+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	301	t
803918d3-6e5c-4fcd-a20b-c0516b8f0fd1	\N	Nomor Induk Mahasiswa (NIM)	\N	{"type": "Number"}	3	2025-08-25 13:05:15.220358+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	303	t
59c3167a-7957-4cff-aa5a-610a07556f2a	\N	Angkatan	\N	{"type": "Number"}	3	2025-08-25 13:05:15.220358+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	304	t
8ccada0e-fed8-440d-9b39-e97370aabc4d	\N	Email	\N	{"type": "Email"}	3	2025-08-25 13:06:02.873857+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	302	t
84c2c406-8c0a-48b5-99f2-48b19a57aee9	\N	Alamat	\N	{"type": "Address"}	3	2025-08-25 13:06:02.873857+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	305	f
6f558438-a24c-45f9-a4f1-cc4472adc3d5	\N	Jenis Kelamin	\N	{"type": "Multiple", "option": [{"id": "gender-1", "label": "Laki-laki", "value": 1}, {"id": "gender-2", "label": "Perempuan", "value": 2}]}	5	2025-08-25 13:06:02.873857+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	307	t
7c47dbdb-f3b1-4839-8d7b-9c22953cf025	\N	Fasilitas Laboratorium dan Perpustakaan	\N	{"type": "Importance Performance", "importance": [{"id": "imp2-1", "label": "Sangat Tidak Penting", "value": 1}, {"id": "imp2-2", "label": "Tidak Penting", "value": 2}, {"id": "imp2-3", "label": "Cukup Penting", "value": 3}, {"id": "imp2-4", "label": "Penting", "value": 4}, {"id": "imp2-5", "label": "Sangat Penting", "value": 5}], "performance": [{"id": "perf2-1", "label": "Sangat Kurang", "value": 1}, {"id": "perf2-2", "label": "Kurang", "value": 2}, {"id": "perf2-3", "label": "Cukup", "value": 3}, {"id": "perf2-4", "label": "Baik", "value": 4}, {"id": "perf2-5", "label": "Sangat Baik", "value": 5}], "importanceQuestion": "Seberapa penting fasilitas laboratorium dan perpustakaan bagi anda?", "performanceQuestion": "Bagaimana kondisi fasilitas laboratorium dan perpustakaan menurut anda?"}	2	2025-08-25 13:16:50.167645+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	102	t
3a9631c3-a6fc-4da0-b74b-f2e6796430db	\N	Bimbingan Akademik dan Konseling	\N	{"type": "Importance Performance", "importance": [{"id": "imp3-1", "label": "Sangat Tidak Penting", "value": 1}, {"id": "imp3-2", "label": "Tidak Penting", "value": 2}, {"id": "imp3-3", "label": "Cukup Penting", "value": 3}, {"id": "imp3-4", "label": "Penting", "value": 4}, {"id": "imp3-5", "label": "Sangat Penting", "value": 5}], "performance": [{"id": "perf3-1", "label": "Sangat Kurang", "value": 1}, {"id": "perf3-2", "label": "Kurang", "value": 2}, {"id": "perf3-3", "label": "Cukup", "value": 3}, {"id": "perf3-4", "label": "Baik", "value": 4}, {"id": "perf3-5", "label": "Sangat Baik", "value": 5}], "importanceQuestion": "Seberapa penting bimbingan akademik dan konseling bagi anda?", "performanceQuestion": "Bagaimana kualitas bimbingan akademik dan konseling yang anda terima?"}	2	2025-08-25 13:16:50.167645+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	103	t
48c4c3af-413f-4716-9250-a79101954bec	\N	Kurikulum dan Materi Pembelajaran	\N	{"type": "Importance Performance", "importance": [{"id": "imp4-1", "label": "Sangat Tidak Penting", "value": 1}, {"id": "imp4-2", "label": "Tidak Penting", "value": 2}, {"id": "imp4-3", "label": "Cukup Penting", "value": 3}, {"id": "imp4-4", "label": "Penting", "value": 4}, {"id": "imp4-5", "label": "Sangat Penting", "value": 5}], "performance": [{"id": "perf4-1", "label": "Sangat Kurang", "value": 1}, {"id": "perf4-2", "label": "Kurang", "value": 2}, {"id": "perf4-3", "label": "Cukup", "value": 3}, {"id": "perf4-4", "label": "Baik", "value": 4}, {"id": "perf4-5", "label": "Sangat Baik", "value": 5}], "importanceQuestion": "Seberapa penting kurikulum dan materi pembelajaran bagi anda?", "performanceQuestion": "Bagaimana relevansi kurikulum dan materi pembelajaran menurut anda?"}	2	2025-08-25 13:16:50.167645+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	104	t
2615b3ad-a653-4b28-8037-f238b6b3e131	\N	Penelitian dan Publikasi Ilmiah	\N	{"type": "Importance Performance", "importance": [{"id": "imp5-1", "label": "Sangat Tidak Penting", "value": 1}, {"id": "imp5-2", "label": "Tidak Penting", "value": 2}, {"id": "imp5-3", "label": "Cukup Penting", "value": 3}, {"id": "imp5-4", "label": "Penting", "value": 4}, {"id": "imp5-5", "label": "Sangat Penting", "value": 5}], "performance": [{"id": "perf5-1", "label": "Sangat Kurang", "value": 1}, {"id": "perf5-2", "label": "Kurang", "value": 2}, {"id": "perf5-3", "label": "Cukup", "value": 3}, {"id": "perf5-4", "label": "Baik", "value": 4}, {"id": "perf5-5", "label": "Sangat Baik", "value": 5}], "importanceQuestion": "Seberapa penting program penelitian dan publikasi ilmiah bagi anda?", "performanceQuestion": "Bagaimana dukungan untuk penelitian dan publikasi ilmiah yang anda terima?"}	2	2025-08-25 13:16:50.167645+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	105	t
efc72a11-68e4-486b-8364-a938b5ade907	\N	Kesiapan Kerja dan Career Development	\N	{"type": "Importance Performance", "importance": [{"id": "imp6-1", "label": "Sangat Tidak Penting", "value": 1}, {"id": "imp6-2", "label": "Tidak Penting", "value": 2}, {"id": "imp6-3", "label": "Cukup Penting", "value": 3}, {"id": "imp6-4", "label": "Penting", "value": 4}, {"id": "imp6-5", "label": "Sangat Penting", "value": 5}], "performance": [{"id": "perf6-1", "label": "Sangat Kurang", "value": 1}, {"id": "perf6-2", "label": "Kurang", "value": 2}, {"id": "perf6-3", "label": "Cukup", "value": 3}, {"id": "perf6-4", "label": "Baik", "value": 4}, {"id": "perf6-5", "label": "Sangat Baik", "value": 5}], "importanceQuestion": "Seberapa penting program kesiapan kerja dan career development bagi anda?", "performanceQuestion": "Bagaimana efektivitas program kesiapan kerja dan career development menurut anda?"}	2	2025-08-25 13:16:50.167645+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	106	t
baae43c3-0b76-4912-a150-68aeba457020	\N	Praktikum dan Pengalaman Lapangan	\N	{"type": "Importance Performance", "importance": [{"id": "imp7-1", "label": "Sangat Tidak Penting", "value": 1}, {"id": "imp7-2", "label": "Tidak Penting", "value": 2}, {"id": "imp7-3", "label": "Cukup Penting", "value": 3}, {"id": "imp7-4", "label": "Penting", "value": 4}, {"id": "imp7-5", "label": "Sangat Penting", "value": 5}], "performance": [{"id": "perf7-1", "label": "Sangat Kurang", "value": 1}, {"id": "perf7-2", "label": "Kurang", "value": 2}, {"id": "perf7-3", "label": "Cukup", "value": 3}, {"id": "perf7-4", "label": "Baik", "value": 4}, {"id": "perf7-5", "label": "Sangat Baik", "value": 5}], "importanceQuestion": "Seberapa penting kegiatan praktikum dan pengalaman lapangan bagi anda?", "performanceQuestion": "Bagaimana kualitas kegiatan praktikum dan pengalaman lapangan yang anda dapatkan?"}	2	2025-08-25 13:16:50.167645+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	107	t
b91d5489-4094-47d4-adc7-7c22c948b36e	\N	Teknologi dan E-Learning	\N	{"type": "Importance Performance", "importance": [{"id": "imp8-1", "label": "Sangat Tidak Penting", "value": 1}, {"id": "imp8-2", "label": "Tidak Penting", "value": 2}, {"id": "imp8-3", "label": "Cukup Penting", "value": 3}, {"id": "imp8-4", "label": "Penting", "value": 4}, {"id": "imp8-5", "label": "Sangat Penting", "value": 5}], "performance": [{"id": "perf8-1", "label": "Sangat Kurang", "value": 1}, {"id": "perf8-2", "label": "Kurang", "value": 2}, {"id": "perf8-3", "label": "Cukup", "value": 3}, {"id": "perf8-4", "label": "Baik", "value": 4}, {"id": "perf8-5", "label": "Sangat Baik", "value": 5}], "importanceQuestion": "Seberapa penting teknologi dan platform e-learning bagi anda?", "performanceQuestion": "Bagaimana kualitas teknologi dan platform e-learning yang disediakan?"}	2	2025-08-25 13:16:50.167645+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	108	t
995f7ad4-8117-409b-b0df-671d8033c752	\N	Organisasi Kemahasiswaan dan Soft Skills	\N	{"type": "Importance Performance", "importance": [{"id": "imp9-1", "label": "Sangat Tidak Penting", "value": 1}, {"id": "imp9-2", "label": "Tidak Penting", "value": 2}, {"id": "imp9-3", "label": "Cukup Penting", "value": 3}, {"id": "imp9-4", "label": "Penting", "value": 4}, {"id": "imp9-5", "label": "Sangat Penting", "value": 5}], "performance": [{"id": "perf9-1", "label": "Sangat Kurang", "value": 1}, {"id": "perf9-2", "label": "Kurang", "value": 2}, {"id": "perf9-3", "label": "Cukup", "value": 3}, {"id": "perf9-4", "label": "Baik", "value": 4}, {"id": "perf9-5", "label": "Sangat Baik", "value": 5}], "importanceQuestion": "Seberapa penting organisasi kemahasiswaan dalam pengembangan soft skills bagi anda?", "performanceQuestion": "Bagaimana kontribusi organisasi kemahasiswaan dalam pengembangan soft skills anda?"}	2	2025-08-25 13:16:50.167645+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	109	t
57ec4f97-9f34-451b-8298-41ff3aa441ed	\N	Alumni Network dan Job Placement	\N	{"type": "Importance Performance", "importance": [{"id": "imp10-1", "label": "Sangat Tidak Penting", "value": 1}, {"id": "imp10-2", "label": "Tidak Penting", "value": 2}, {"id": "imp10-3", "label": "Cukup Penting", "value": 3}, {"id": "imp10-4", "label": "Penting", "value": 4}, {"id": "imp10-5", "label": "Sangat Penting", "value": 5}], "performance": [{"id": "perf10-1", "label": "Sangat Kurang", "value": 1}, {"id": "perf10-2", "label": "Kurang", "value": 2}, {"id": "perf10-3", "label": "Cukup", "value": 3}, {"id": "perf10-4", "label": "Baik", "value": 4}, {"id": "perf10-5", "label": "Sangat Baik", "value": 5}], "importanceQuestion": "Seberapa penting jaringan alumni dan job placement bagi anda?", "performanceQuestion": "Bagaimana efektivitas jaringan alumni dan job placement menurut anda?"}	2	2025-08-25 13:16:50.167645+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	110	t
c0ca410b-fb0d-4b74-9368-946d31bab15c	\N	Berapa lama waktu ideal untuk menyelesaikan tugas akhir/skripsi?	\N	{"type": "Ratio", "option": [{"id": "ratio1-1", "label": "6 bulan", "value": 1}, {"id": "ratio1-2", "label": "1 tahun", "value": 2}, {"id": "ratio1-3", "label": "1.5 tahun", "value": 3}, {"id": "ratio1-4", "label": "2 tahun", "value": 4}, {"id": "ratio1-5", "label": "Lebih dari 2 tahun", "value": 5}]}	4	2025-08-25 13:16:51.892029+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	201	t
9065c95f-b599-4732-a619-19b7d7577842	\N	Seberapa sering anda mengakses perpustakaan untuk keperluan akademik?	\N	{"type": "Ratio", "option": [{"id": "ratio2-1", "label": "Tidak pernah", "value": 1}, {"id": "ratio2-2", "label": "Jarang (1-2 kali/bulan)", "value": 2}, {"id": "ratio2-3", "label": "Cukup sering (1-2 kali/minggu)", "value": 3}, {"id": "ratio2-4", "label": "Sering (3-4 kali/minggu)", "value": 4}, {"id": "ratio2-5", "label": "Sangat sering (setiap hari)", "value": 5}]}	4	2025-08-25 13:16:51.892029+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	202	t
775b363d-a81f-4e8a-88a7-0c5f5d101f2d	\N	Berapa banyak publikasi ilmiah yang telah anda hasilkan selama kuliah?	\N	{"type": "Ratio", "option": [{"id": "ratio3-1", "label": "Belum ada", "value": 1}, {"id": "ratio3-2", "label": "1-2 publikasi", "value": 2}, {"id": "ratio3-3", "label": "3-5 publikasi", "value": 3}, {"id": "ratio3-4", "label": "6-10 publikasi", "value": 4}, {"id": "ratio3-5", "label": "Lebih dari 10 publikasi", "value": 5}]}	4	2025-08-25 13:16:51.892029+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	203	t
1c812755-b1f6-4ce1-aea6-bc581cc32f50	\N	Apa program studi yang anda ambil?	\N	{"type": "Multiple", "option": [{"id": "multiple1-1", "label": "Teknik Informatika", "value": 1}, {"id": "multiple1-2", "label": "Sistem Informasi", "value": 2}, {"id": "multiple1-3", "label": "Teknik Elektro", "value": 3}, {"id": "multiple1-4", "label": "Manajemen", "value": 4}, {"id": "multiple1-5", "label": "Akuntansi", "value": 5}, {"id": "multiple1-6", "label": "Lainnya", "value": 6}]}	5	2025-08-25 13:16:51.892029+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	204	t
7d90d554-3291-4e1e-aa92-a1cbdb5e1677	\N	Bidang penelitian apa yang paling menarik bagi anda?	\N	{"type": "Multiple", "option": [{"id": "multiple2-1", "label": "Artificial Intelligence", "value": 1}, {"id": "multiple2-2", "label": "Cybersecurity", "value": 2}, {"id": "multiple2-3", "label": "Data Science", "value": 3}, {"id": "multiple2-4", "label": "Software Engineering", "value": 4}, {"id": "multiple2-5", "label": "Internet of Things", "value": 5}, {"id": "multiple2-6", "label": "Mobile Development", "value": 6}]}	5	2025-08-25 13:16:51.892029+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	205	t
1813df8e-0561-4db9-86fa-face5ff360c3	\N	Setelah lulus, apa rencana karir anda?	\N	{"type": "Multiple", "option": [{"id": "multiple3-1", "label": "Bekerja di perusahaan teknologi", "value": 1}, {"id": "multiple3-2", "label": "Melanjutkan studi S2", "value": 2}, {"id": "multiple3-3", "label": "Berwirausaha/startup", "value": 3}, {"id": "multiple3-4", "label": "Bekerja sebagai freelancer", "value": 4}, {"id": "multiple3-5", "label": "Menjadi dosen/peneliti", "value": 5}, {"id": "multiple3-6", "label": "Belum tahu", "value": 6}]}	5	2025-08-25 13:16:51.892029+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	206	t
8add33e3-d1ff-4428-aade-f697ea648352	\N	Metode pembelajaran mana yang paling efektif untuk anda?	\N	{"type": "Multiple", "option": [{"id": "multiple4-1", "label": "Tatap muka di kelas", "value": 1}, {"id": "multiple4-2", "label": "Online learning", "value": 2}, {"id": "multiple4-3", "label": "Blended learning", "value": 3}, {"id": "multiple4-4", "label": "Praktikum laboratorium", "value": 4}, {"id": "multiple4-5", "label": "Project-based learning", "value": 5}, {"id": "multiple4-6", "label": "Studi kasus", "value": 6}]}	5	2025-08-25 13:16:51.892029+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	207	t
64a18b13-e95d-47b8-93ab-a251932fe3b7	\N	Seberapa puas anda dengan layanan administrasi akademik?	\N	{"type": "Ratio", "option": [{"id": "ratio4-1", "label": "Sangat tidak puas", "value": 1}, {"id": "ratio4-2", "label": "Tidak puas", "value": 2}, {"id": "ratio4-3", "label": "Cukup puas", "value": 3}, {"id": "ratio4-4", "label": "Puas", "value": 4}, {"id": "ratio4-5", "label": "Sangat puas", "value": 5}]}	4	2025-08-25 13:16:51.892029+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	208	t
790a4395-6833-40cb-9124-70a931193a13	\N	Skill apa yang paling ingin anda kembangkan?	\N	{"type": "Multiple", "option": [{"id": "multiple5-1", "label": "Programming", "value": 1}, {"id": "multiple5-2", "label": "Leadership", "value": 2}, {"id": "multiple5-3", "label": "Communication", "value": 3}, {"id": "multiple5-4", "label": "Problem Solving", "value": 4}, {"id": "multiple5-5", "label": "Project Management", "value": 5}, {"id": "multiple5-6", "label": "Research & Analysis", "value": 6}]}	5	2025-08-25 13:16:51.892029+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	209	t
7ce9dd01-2585-4a6e-9431-427ab1c47b0d	\N	Seberapa sering anda berpartisipasi dalam kegiatan akademik di luar kelas?	\N	{"type": "Ratio", "option": [{"id": "ratio5-1", "label": "Tidak pernah", "value": 1}, {"id": "ratio5-2", "label": "Jarang", "value": 2}, {"id": "ratio5-3", "label": "Kadang-kadang", "value": 3}, {"id": "ratio5-4", "label": "Sering", "value": 4}, {"id": "ratio5-5", "label": "Selalu", "value": 5}]}	4	2025-08-25 13:16:51.892029+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	210	t
fbc4d8b5-bc27-4c3c-bfcb-8cc2b349c25a	\N	Thanks, muachh💋	\N	{"type": "Text"}	\N	2025-09-02 15:22:05.167442+00	\N	e85960b4-4d78-4d9c-bdc2-ae263ff28d10	308	f
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, code, name, created_at, updated_at) FROM stdin;
77269ee5-962e-402e-be47-6c595656c37f	lecturer	Pengajar	2024-07-31 13:06:32.674485+00	2024-07-31 13:06:32.674485+00
7b25b9b0-e18a-48ff-bd70-c202325ec71b	student	Mahasiswa	2024-07-31 13:06:42.53812+00	2024-07-31 13:06:42.53812+00
de2d0245-4a5d-4cd1-9b66-72a89efcf01c	employee	Pegawai	2024-07-31 13:06:53.667135+00	2024-07-31 13:06:53.667135+00
c21b6bdf-b83e-41b4-a7c2-68693c954e5b	alumni	Alumni	2024-07-31 13:07:51.923134+00	2024-07-31 13:07:51.923134+00
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (id, user_id, role_id, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, created_at, updated_at) FROM stdin;
5aebcff9-8c1e-40e9-9238-ae09c855cffc				2024-07-18 16:16:33.447013+00	2024-07-18 16:16:33.447013+00
a96fdcb2-4c4d-49a9-a227-dad5512fc60a	naufal.berlian.99@gmail.com	password	naufal.berlian.99@gmail.com	2024-07-18 16:52:59.095489+00	2024-07-18 16:52:59.095489+00
3f77419b-b62d-4e52-808d-098a831ace03	naufal.berlian.9@gmail.com	password	naufal.berlian.9@gmail.com	2024-07-18 16:54:47.959978+00	2024-07-18 16:54:47.959978+00
c67aa1b1-dd73-41c6-a752-57cef6bfa6dd	naufal.berlian.91@gmail.com	password	naufal.berlian.91@gmail.com	2024-07-18 17:11:55.48287+00	2024-07-18 17:11:55.48287+00
d6254dc4-fdb3-4a96-a00c-d17185869c36	alumni2@univ.ac.id	password	Joko Widodo	2025-08-25 13:07:14.569407+00	2025-08-25 13:07:14.569407+00
35f97a4a-f0e4-45a4-b066-78d094b35f24	alumni1@univ.ac.id	password	Indra Kusuma	2025-08-25 13:07:45.934204+00	2025-08-25 13:07:45.934204+00
699badda-96f3-42e1-a997-0e6ad2a65852	mahasiswa8@univ.ac.id	password	Hesti Wulandari	2025-08-25 13:07:54.018915+00	2025-08-25 13:07:54.018915+00
64a8ab00-27e1-4d2d-9a89-36e45dd70839	mahasiswa7@univ.ac.id	password	Gunawan Saputra	2025-08-25 13:07:58.552765+00	2025-08-25 13:07:58.552765+00
b167292e-373d-45ca-a113-4d227bac0cc0	mahasiswa6@univ.ac.id	password	Fitri Handayani	2025-08-25 13:08:28.985628+00	2025-08-25 13:08:28.985628+00
04efabcf-4c82-4e94-86a8-a37cbba90db1	mahasiswa5@univ.ac.id	password	Eko Nugroho	2025-08-25 13:08:32.306934+00	2025-08-25 13:08:32.306934+00
df5bca81-bf74-4a01-b841-4a63a8e8ed3e	mahasiswa4@univ.ac.id	password	Dina Rahayu	2025-08-25 13:08:35.219831+00	2025-08-25 13:08:35.219831+00
cb2cef6a-3653-4ff0-bc7e-96be290a36f7	mahasiswa3@univ.ac.id	password	Budi Santoso	2025-08-25 13:08:37.957307+00	2025-08-25 13:08:37.957307+00
4097e627-71ab-400c-8048-d83e892528bb	mahasiswa2@univ.ac.id	password	Sari Dewi Putri	2025-08-25 13:08:41.2535+00	2025-08-25 13:08:41.2535+00
b5386535-dec2-4bc9-ba51-c6d8806cf488	mahasiswa1@univ.ac.id	password	Ahmad Rizki Pratama	2025-08-25 13:08:54.886035+00	2025-08-25 13:08:54.886035+00
\.


--
-- Name: option_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.option_types_id_seq', 5, true);


--
-- Name: hdb_action_log hdb_action_log_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_action_log
    ADD CONSTRAINT hdb_action_log_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_events hdb_cron_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_events
    ADD CONSTRAINT hdb_cron_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_resource_version_key; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_resource_version_key UNIQUE (resource_version);


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_scheduled_events hdb_scheduled_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_events
    ADD CONSTRAINT hdb_scheduled_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_schema_notifications hdb_schema_notifications_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_schema_notifications
    ADD CONSTRAINT hdb_schema_notifications_pkey PRIMARY KEY (id);


--
-- Name: hdb_version hdb_version_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_version
    ADD CONSTRAINT hdb_version_pkey PRIMARY KEY (hasura_uuid);


--
-- Name: answer_sheets answer_sheets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer_sheets
    ADD CONSTRAINT answer_sheets_pkey PRIMARY KEY (id);


--
-- Name: form_access form_access_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_access
    ADD CONSTRAINT form_access_pkey PRIMARY KEY (id);


--
-- Name: form_audiences form_audiences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_audiences
    ADD CONSTRAINT form_audiences_pkey PRIMARY KEY (id);


--
-- Name: form_category form_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_category
    ADD CONSTRAINT form_category_pkey PRIMARY KEY (id);


--
-- Name: form_category form_category_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_category
    ADD CONSTRAINT form_category_slug_key UNIQUE (slug);


--
-- Name: forms forms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (id);


--
-- Name: forms forms_public_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_public_id_key UNIQUE (public_id);


--
-- Name: question_types option_types_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_types
    ADD CONSTRAINT option_types_code_key UNIQUE (code);


--
-- Name: question_types option_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_types
    ADD CONSTRAINT option_types_pkey PRIMARY KEY (id);


--
-- Name: question_answers question_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_answers
    ADD CONSTRAINT question_answers_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: roles roles_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_code_key UNIQUE (code);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_event_invocation_event_id; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_cron_event_invocation_event_id ON hdb_catalog.hdb_cron_event_invocation_logs USING btree (event_id);


--
-- Name: hdb_cron_event_status; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_cron_event_status ON hdb_catalog.hdb_cron_events USING btree (status);


--
-- Name: hdb_cron_events_unique_scheduled; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_cron_events_unique_scheduled ON hdb_catalog.hdb_cron_events USING btree (trigger_name, scheduled_time) WHERE (status = 'scheduled'::text);


--
-- Name: hdb_scheduled_event_status; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE INDEX hdb_scheduled_event_status ON hdb_catalog.hdb_scheduled_events USING btree (status);


--
-- Name: hdb_version_one_row; Type: INDEX; Schema: hdb_catalog; Owner: postgres
--

CREATE UNIQUE INDEX hdb_version_one_row ON hdb_catalog.hdb_version USING btree (((version IS NOT NULL)));


--
-- Name: answer_sheets set_public_answer_sheets_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_answer_sheets_updated_at BEFORE UPDATE ON public.answer_sheets FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_answer_sheets_updated_at ON answer_sheets; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_answer_sheets_updated_at ON public.answer_sheets IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: form_access set_public_form_access_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_form_access_updated_at BEFORE UPDATE ON public.form_access FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_form_access_updated_at ON form_access; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_form_access_updated_at ON public.form_access IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: form_audiences set_public_form_audiences_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_form_audiences_updated_at BEFORE UPDATE ON public.form_audiences FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_form_audiences_updated_at ON form_audiences; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_form_audiences_updated_at ON public.form_audiences IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: form_category set_public_form_category_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_form_category_updated_at BEFORE UPDATE ON public.form_category FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_form_category_updated_at ON form_category; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_form_category_updated_at ON public.form_category IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: forms set_public_forms_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_forms_updated_at BEFORE UPDATE ON public.forms FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_forms_updated_at ON forms; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_forms_updated_at ON public.forms IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: question_types set_public_option_types_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_option_types_updated_at BEFORE UPDATE ON public.question_types FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_option_types_updated_at ON question_types; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_option_types_updated_at ON public.question_types IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: question_answers set_public_question_answers_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_question_answers_updated_at BEFORE UPDATE ON public.question_answers FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_question_answers_updated_at ON question_answers; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_question_answers_updated_at ON public.question_answers IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: questions set_public_questions_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_questions_updated_at BEFORE UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_questions_updated_at ON questions; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_questions_updated_at ON public.questions IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: roles set_public_roles_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_roles_updated_at BEFORE UPDATE ON public.roles FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_roles_updated_at ON roles; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_roles_updated_at ON public.roles IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: users set_public_users_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_users_updated_at ON users; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_cron_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: postgres
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_scheduled_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: answer_sheets answer_sheets_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer_sheets
    ADD CONSTRAINT answer_sheets_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: answer_sheets answer_sheets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer_sheets
    ADD CONSTRAINT answer_sheets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: form_access form_access_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_access
    ADD CONSTRAINT form_access_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: form_access form_access_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_access
    ADD CONSTRAINT form_access_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: form_audiences form_audiences_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_audiences
    ADD CONSTRAINT form_audiences_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: form_audiences form_audiences_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form_audiences
    ADD CONSTRAINT form_audiences_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: forms forms_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: question_answers question_answers_answer_sheet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_answers
    ADD CONSTRAINT question_answers_answer_sheet_id_fkey FOREIGN KEY (answer_sheet_id) REFERENCES public.answer_sheets(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: question_answers question_answers_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_answers
    ADD CONSTRAINT question_answers_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: question_answers question_answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_answers
    ADD CONSTRAINT question_answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: question_answers question_answers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_answers
    ADD CONSTRAINT question_answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: questions questions_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: questions questions_option_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_option_type_fkey FOREIGN KEY (question_type_id) REFERENCES public.question_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

