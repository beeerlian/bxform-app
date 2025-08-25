SET check_function_bodies = false;

-- Note: This script assumes the questions from seed-questionnaire.sql have been inserted
-- We'll need to get the actual question IDs after running the questionnaire seed script
-- For now, I'll create sample answer sheets that can be updated with actual question IDs

-- Get user IDs from the database (these would be actual IDs after users are inserted)
-- Answer sheets for 12 different users with varied responses

-- Answer Sheet 1 - Ahmad Rizki Pratama (Teknik Informatika, Angkatan 2020)
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', (SELECT id FROM public.users WHERE email = 'mahasiswa1@univ.ac.id'), true);

-- Answer Sheet 2 - Sari Dewi Putri (Sistem Informasi, Angkatan 2021)
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', (SELECT id FROM public.users WHERE email = 'mahasiswa2@univ.ac.id'), true);

-- Answer Sheet 3 - Budi Santoso (Teknik Elektro, Angkatan 2019)
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', (SELECT id FROM public.users WHERE email = 'mahasiswa3@univ.ac.id'), true);

-- Answer Sheet 4 - Dina Rahayu (Manajemen, Angkatan 2022)
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', (SELECT id FROM public.users WHERE email = 'mahasiswa4@univ.ac.id'), true);

-- Answer Sheet 5 - Eko Nugroho (Teknik Informatika, Angkatan 2020)
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', (SELECT id FROM public.users WHERE email = 'mahasiswa5@univ.ac.id'), true);

-- Answer Sheet 6 - Fitri Handayani (Akuntansi, Angkatan 2021)
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', (SELECT id FROM public.users WHERE email = 'mahasiswa6@univ.ac.id'), true);

-- Answer Sheet 7 - Gunawan Saputra (Sistem Informasi, Angkatan 2019)
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', (SELECT id FROM public.users WHERE email = 'mahasiswa7@univ.ac.id'), true);

-- Answer Sheet 8 - Hesti Wulandari (Teknik Informatika, Angkatan 2022)
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', (SELECT id FROM public.users WHERE email = 'mahasiswa8@univ.ac.id'), true);

-- Answer Sheet 9 - Indra Kusuma (Alumni - Teknik Informatika, Angkatan 2018)
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', (SELECT id FROM public.users WHERE email = 'alumni1@univ.ac.id'), true);

-- Answer Sheet 10 - Joko Widodo (Alumni - Manajemen, Angkatan 2017)
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', (SELECT id FROM public.users WHERE email = 'alumni2@univ.ac.id'), true);

-- Answer Sheet 11 - Using existing user
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', 'a96fdcb2-4c4d-49a9-a227-dad5512fc60a', true);

-- Answer Sheet 12 - Using existing user
INSERT INTO public.answer_sheets (form_id, user_id, recorded) VALUES 
('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', 'c67aa1b1-dd73-41c6-a752-57cef6bfa6dd', true);

-- Sample answers for the questions (these would need to be updated with actual question IDs)
-- The following is a template showing the structure for answers

-- Example answers for Ahmad Rizki Pratama (Answer Sheet 1)
-- Personal Information Questions
-- Name: "Ahmad Rizki Pratama"
-- Email: "ahmad.rizki@student.univ.ac.id"
-- NIM: "20200001"
-- Angkatan: "2020"
-- Address: "Jl. Sudirman No. 123, Jakarta"
-- Phone: "081234567890"
-- Gender: Laki-laki (value: 1)

-- IPA Questions (format: {"performance":"4","importance":"5"})
-- Various performance and importance ratings from 1-5

-- Ratio Questions (format: "3")
-- Various ratio selections from 1-5

-- Multiple Choice Questions (format: "[{\"value\":\"1\",\"label\":\"Teknik Informatika\",\"selected\":true,\"id\":\"multiple1-1\"}]")
-- Various multiple choice selections

-- Note: The actual question_answers insertions would be generated after getting the real question IDs
-- This script serves as a framework and would need to be completed with actual question IDs and answer_sheet IDs

-- Example structure for question answers (to be completed with actual IDs):
/*
INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id) VALUES 
-- Personal info answers
('[QUESTION_ID_NAME]', '"Ahmad Rizki Pratama"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', '[USER_ID]', '[ANSWER_SHEET_ID]'),
('[QUESTION_ID_EMAIL]', '"ahmad.rizki@student.univ.ac.id"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', '[USER_ID]', '[ANSWER_SHEET_ID]'),
('[QUESTION_ID_NIM]', '"20200001"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', '[USER_ID]', '[ANSWER_SHEET_ID]'),
-- IPA answers
('[QUESTION_ID_IPA_1]', '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', '[USER_ID]', '[ANSWER_SHEET_ID]'),
-- Ratio answers
('[QUESTION_ID_RATIO_1]', '"3"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', '[USER_ID]', '[ANSWER_SHEET_ID]'),
-- Multiple choice answers
('[QUESTION_ID_MULTIPLE_1]', '"[{\"value\":\"1\",\"label\":\"Teknik Informatika\",\"selected\":true,\"id\":\"multiple1-1\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', '[USER_ID]', '[ANSWER_SHEET_ID]');
*/

-- To complete this script:
-- 1. Run the questionnaire seed script first
-- 2. Get the actual question IDs from the database
-- 3. Get the actual answer_sheet IDs from the database
-- 4. Generate detailed question_answers based on the patterns shown in seed_example.sql
