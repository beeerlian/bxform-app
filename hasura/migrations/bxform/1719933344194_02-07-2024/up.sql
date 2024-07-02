SET check_function_bodies = false;
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
CREATE TABLE public.answer_sheets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    form_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);
CREATE TABLE public.form_access (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    form_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);
CREATE TABLE public.form_audiences (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    role_id uuid NOT NULL,
    form_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);
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
    created_by uuid NOT NULL
);
CREATE TABLE public.option_types (
    id integer NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);
CREATE SEQUENCE public.option_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.option_types_id_seq OWNED BY public.option_types.id;
CREATE TABLE public.question_answers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    question_id uuid NOT NULL,
    answer_sheet_id uuid NOT NULL,
    answer jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);
CREATE TABLE public.question_types (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.question_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.question_types_id_seq OWNED BY public.question_types.id;
CREATE TABLE public.questions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    question_type integer NOT NULL,
    topic text,
    content text NOT NULL,
    caption text,
    option jsonb NOT NULL,
    option_type integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);
CREATE TABLE public.roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE ONLY public.option_types ALTER COLUMN id SET DEFAULT nextval('public.option_types_id_seq'::regclass);
ALTER TABLE ONLY public.question_types ALTER COLUMN id SET DEFAULT nextval('public.question_types_id_seq'::regclass);
ALTER TABLE ONLY public.answer_sheets
    ADD CONSTRAINT answer_sheets_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.form_access
    ADD CONSTRAINT form_access_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.form_audiences
    ADD CONSTRAINT form_audiences_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_public_id_key UNIQUE (public_id);
ALTER TABLE ONLY public.option_types
    ADD CONSTRAINT option_types_code_key UNIQUE (code);
ALTER TABLE ONLY public.option_types
    ADD CONSTRAINT option_types_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.question_answers
    ADD CONSTRAINT question_answers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.question_types
    ADD CONSTRAINT question_types_name_id_key UNIQUE (name, id);
ALTER TABLE ONLY public.question_types
    ADD CONSTRAINT question_types_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_code_key UNIQUE (code);
ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_answer_sheets_updated_at BEFORE UPDATE ON public.answer_sheets FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_answer_sheets_updated_at ON public.answer_sheets IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_form_access_updated_at BEFORE UPDATE ON public.form_access FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_form_access_updated_at ON public.form_access IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_form_audiences_updated_at BEFORE UPDATE ON public.form_audiences FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_form_audiences_updated_at ON public.form_audiences IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_forms_updated_at BEFORE UPDATE ON public.forms FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_forms_updated_at ON public.forms IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_option_types_updated_at BEFORE UPDATE ON public.option_types FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_option_types_updated_at ON public.option_types IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_question_answers_updated_at BEFORE UPDATE ON public.question_answers FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_question_answers_updated_at ON public.question_answers IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_question_types_updated_at BEFORE UPDATE ON public.question_types FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_question_types_updated_at ON public.question_types IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_questions_updated_at BEFORE UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_questions_updated_at ON public.questions IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_roles_updated_at BEFORE UPDATE ON public.roles FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_roles_updated_at ON public.roles IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.answer_sheets
    ADD CONSTRAINT answer_sheets_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.answer_sheets
    ADD CONSTRAINT answer_sheets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.form_access
    ADD CONSTRAINT form_access_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.form_access
    ADD CONSTRAINT form_access_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.form_audiences
    ADD CONSTRAINT form_audiences_form_id_fkey FOREIGN KEY (form_id) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.form_audiences
    ADD CONSTRAINT form_audiences_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.question_answers
    ADD CONSTRAINT question_answers_answer_sheet_id_fkey FOREIGN KEY (answer_sheet_id) REFERENCES public.answer_sheets(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.question_answers
    ADD CONSTRAINT question_answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_option_type_fkey FOREIGN KEY (option_type) REFERENCES public.option_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_question_type_fkey FOREIGN KEY (question_type) REFERENCES public.question_types(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
