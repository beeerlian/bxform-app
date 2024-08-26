SET check_function_bodies = false;
INSERT INTO public.question_types (id, code, name, created_at, updated_at) VALUES (1, 'essai', 'Essai', '2024-07-20 16:44:15.683242+00', NULL);
INSERT INTO public.question_types (id, code, name, created_at, updated_at) VALUES (2, 'ipa', 'Importance Performance', '2024-07-20 16:44:39.569589+00', NULL);
INSERT INTO public.question_types (id, code, name, created_at, updated_at) VALUES (3, 'text', 'Text', '2024-07-20 16:44:53.796239+00', NULL);
INSERT INTO public.question_types (id, code, name, created_at, updated_at) VALUES (4, 'option', 'Option', '2024-07-20 16:45:10.05265+00', NULL);
INSERT INTO public.question_types (id, code, name, created_at, updated_at) VALUES (5, 'multiple', 'Multiple', '2024-07-20 16:45:29.238529+00', NULL);
SELECT pg_catalog.setval('public.option_types_id_seq', 5, true);
