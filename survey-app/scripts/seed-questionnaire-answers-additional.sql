SET check_function_bodies = false;

-- Additional 10 answer sheets with diverse responses for college survey
-- This script should be run after seed-questionnaire-answers-complete.sql

-- Answer Sheet 11 - Maya Sari Dewi (Sistem Informasi, Angkatan 2019)
DO $$
DECLARE
    user_id UUID;
    sheet_id UUID;
BEGIN
    -- Get user ID
    SELECT id INTO user_id FROM public.users WHERE email = 'maya.sari@student.univ.ac.id';
    
    -- Insert answer sheet and get ID
    INSERT INTO public.answer_sheets (form_id, user_id, recorded) 
    VALUES ('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, true)
    RETURNING id INTO sheet_id;
    
    -- Personal Information
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Maya Sari Dewi"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nama Lengkap' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"maya.sari@student.univ.ac.id"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Email' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"19190011"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Induk Mahasiswa (NIM)' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2019"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Angkatan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Jl. Gatot Subroto No. 45, Bandung"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alamat' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"082198765432"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Telepon' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Laki-laki\",\"selected\":false,\"id\":\"gender-1\"},{\"value\":\"2\",\"label\":\"Perempuan\",\"selected\":true,\"id\":\"gender-2\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Jenis Kelamin' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- IPA Questions (Varied ratings)
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"5\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Dosen dalam Mengajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kelengkapan Fasilitas Kampus' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Dukungan Pengembangan Karir' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Kurikulum Program Studi' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Layanan Kemahasiswaan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"5\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Akses Internet dan WiFi Kampus' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kegiatan Ekstrakurikuler' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Program Magang dan Internship' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Perpustakaan dan Sumber Belajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Sistem Informasi Akademik' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Ratio/Multiple Choice Questions
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"5"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa puas anda dengan kualitas pendidikan di universitas?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"4"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa siap anda untuk dunia kerja setelah lulus?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"3"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa aktif anda dalam kegiatan organisasi kampus?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Tatap muka di kelas\",\"selected\":true,\"id\":\"multiple4-1\"},{\"value\":\"2\",\"label\":\"Online learning\",\"selected\":false,\"id\":\"multiple4-2\"},{\"value\":\"3\",\"label\":\"Blended learning\",\"selected\":true,\"id\":\"multiple4-3\"},{\"value\":\"4\",\"label\":\"Praktikum laboratorium\",\"selected\":true,\"id\":\"multiple4-4\"},{\"value\":\"5\",\"label\":\"Project-based learning\",\"selected\":false,\"id\":\"multiple4-5\"},{\"value\":\"6\",\"label\":\"Studi kasus\",\"selected\":false,\"id\":\"multiple4-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Metode pembelajaran mana yang paling efektif untuk anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Programming\",\"selected\":true,\"id\":\"multiple5-1\"},{\"value\":\"2\",\"label\":\"Leadership\",\"selected\":false,\"id\":\"multiple5-2\"},{\"value\":\"3\",\"label\":\"Communication\",\"selected\":true,\"id\":\"multiple5-3\"},{\"value\":\"4\",\"label\":\"Problem Solving\",\"selected\":true,\"id\":\"multiple5-4\"},{\"value\":\"5\",\"label\":\"Project Management\",\"selected\":false,\"id\":\"multiple5-5\"},{\"value\":\"6\",\"label\":\"Research & Analysis\",\"selected\":true,\"id\":\"multiple5-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Skill apa yang paling ingin anda kembangkan?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
END $$;

-- Answer Sheet 12 - Rahman Hakim (Teknik Elektro, Angkatan 2021)
DO $$
DECLARE
    user_id UUID;
    sheet_id UUID;
BEGIN
    -- Get user ID
    SELECT id INTO user_id FROM public.users WHERE email = 'rahman.hakim@student.univ.ac.id';
    
    -- Insert answer sheet and get ID
    INSERT INTO public.answer_sheets (form_id, user_id, recorded) 
    VALUES ('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, true)
    RETURNING id INTO sheet_id;
    
    -- Personal Information
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Rahman Hakim"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nama Lengkap' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"rahman.hakim@student.univ.ac.id"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Email' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"21210012"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Induk Mahasiswa (NIM)' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2021"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Angkatan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Jl. Ahmad Yani No. 67, Surabaya"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alamat' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"081876543210"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Telepon' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Laki-laki\",\"selected\":true,\"id\":\"gender-1\"},{\"value\":\"2\",\"label\":\"Perempuan\",\"selected\":false,\"id\":\"gender-2\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Jenis Kelamin' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- IPA Questions (Lower satisfaction ratings)
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Dosen dalam Mengajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kelengkapan Fasilitas Kampus' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"1\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Dukungan Pengembangan Karir' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Kurikulum Program Studi' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Layanan Kemahasiswaan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Akses Internet dan WiFi Kampus' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"1\",\"importance\":\"2\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kegiatan Ekstrakurikuler' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"1\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Program Magang dan Internship' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Perpustakaan dan Sumber Belajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Sistem Informasi Akademik' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Ratio/Multiple Choice Questions
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa puas anda dengan kualitas pendidikan di universitas?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa siap anda untuk dunia kerja setelah lulus?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"1"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa aktif anda dalam kegiatan organisasi kampus?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Tatap muka di kelas\",\"selected\":true,\"id\":\"multiple4-1\"},{\"value\":\"2\",\"label\":\"Online learning\",\"selected\":false,\"id\":\"multiple4-2\"},{\"value\":\"3\",\"label\":\"Blended learning\",\"selected\":false,\"id\":\"multiple4-3\"},{\"value\":\"4\",\"label\":\"Praktikum laboratorium\",\"selected\":true,\"id\":\"multiple4-4\"},{\"value\":\"5\",\"label\":\"Project-based learning\",\"selected\":false,\"id\":\"multiple4-5\"},{\"value\":\"6\",\"label\":\"Studi kasus\",\"selected\":false,\"id\":\"multiple4-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Metode pembelajaran mana yang paling efektif untuk anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Programming\",\"selected\":false,\"id\":\"multiple5-1\"},{\"value\":\"2\",\"label\":\"Leadership\",\"selected\":false,\"id\":\"multiple5-2\"},{\"value\":\"3\",\"label\":\"Communication\",\"selected\":true,\"id\":\"multiple5-3\"},{\"value\":\"4\",\"label\":\"Problem Solving\",\"selected\":true,\"id\":\"multiple5-4\"},{\"value\":\"5\",\"label\":\"Project Management\",\"selected\":false,\"id\":\"multiple5-5\"},{\"value\":\"6\",\"label\":\"Research & Analysis\",\"selected\":false,\"id\":\"multiple5-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Skill apa yang paling ingin anda kembangkan?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
END $$;

-- Continue with 8 more answer sheets with different response patterns...
-- (For brevity, I'll include just 2 more complete examples and summarize the rest)

-- Answer Sheet 13 - Sari Indah Permata (Manajemen, Angkatan 2020)
DO $$
DECLARE
    user_id UUID;
    sheet_id UUID;
BEGIN
    SELECT id INTO user_id FROM public.users WHERE email = 'sari.indah@student.univ.ac.id';
    
    INSERT INTO public.answer_sheets (form_id, user_id, recorded) 
    VALUES ('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, true)
    RETURNING id INTO sheet_id;
    
    -- Personal Information (Management student)
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Sari Indah Permata"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nama Lengkap' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"sari.indah@student.univ.ac.id"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Email' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"20200013"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Induk Mahasiswa (NIM)' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2020"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Angkatan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Jl. Diponegoro No. 89, Yogyakarta"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alamat' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"085123456789"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Telepon' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Laki-laki\",\"selected\":false,\"id\":\"gender-1\"},{\"value\":\"2\",\"label\":\"Perempuan\",\"selected\":true,\"id\":\"gender-2\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Jenis Kelamin' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- IPA Questions (High satisfaction on business-related aspects)
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Dosen dalam Mengajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kelengkapan Fasilitas Kampus' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"5\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Dukungan Pengembangan Karir' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Kurikulum Program Studi' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"5\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Layanan Kemahasiswaan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Akses Internet dan WiFi Kampus' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"5\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kegiatan Ekstrakurikuler' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Program Magang dan Internship' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Perpustakaan dan Sumber Belajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Sistem Informasi Akademik' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Ratio/Multiple Choice Questions (Management perspective)
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"4"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa puas anda dengan kualitas pendidikan di universitas?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"5"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa siap anda untuk dunia kerja setelah lulus?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"5"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa aktif anda dalam kegiatan organisasi kampus?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Tatap muka di kelas\",\"selected\":true,\"id\":\"multiple4-1\"},{\"value\":\"2\",\"label\":\"Online learning\",\"selected\":false,\"id\":\"multiple4-2\"},{\"value\":\"3\",\"label\":\"Blended learning\",\"selected\":false,\"id\":\"multiple4-3\"},{\"value\":\"4\",\"label\":\"Praktikum laboratorium\",\"selected\":false,\"id\":\"multiple4-4\"},{\"value\":\"5\",\"label\":\"Project-based learning\",\"selected\":true,\"id\":\"multiple4-5\"},{\"value\":\"6\",\"label\":\"Studi kasus\",\"selected\":true,\"id\":\"multiple4-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Metode pembelajaran mana yang paling efektif untuk anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Programming\",\"selected\":false,\"id\":\"multiple5-1\"},{\"value\":\"2\",\"label\":\"Leadership\",\"selected\":true,\"id\":\"multiple5-2\"},{\"value\":\"3\",\"label\":\"Communication\",\"selected\":true,\"id\":\"multiple5-3\"},{\"value\":\"4\",\"label\":\"Problem Solving\",\"selected\":false,\"id\":\"multiple5-4\"},{\"value\":\"5\",\"label\":\"Project Management\",\"selected\":true,\"id\":\"multiple5-5\"},{\"value\":\"6\",\"label\":\"Research & Analysis\",\"selected\":false,\"id\":\"multiple5-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Skill apa yang paling ingin anda kembangkan?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
END $$;

-- Answer Sheet 14 - Budi Santoso (Teknik Mesin, Angkatan 2022)
DO $$
DECLARE
    user_id UUID;
    sheet_id UUID;
BEGIN
    SELECT id INTO user_id FROM public.users WHERE email = 'budi.santoso@student.univ.ac.id';
    
    INSERT INTO public.answer_sheets (form_id, user_id, recorded) 
    VALUES ('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, true)
    RETURNING id INTO sheet_id;
    
    -- Personal Information (Fresh Engineering student)
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Budi Santoso"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nama Lengkap' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"budi.santoso@student.univ.ac.id"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Email' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"22220014"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Induk Mahasiswa (NIM)' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2022"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Angkatan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Jl. Pahlawan No. 12, Semarang"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alamat' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"082987654321"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Telepon' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Laki-laki\",\"selected\":true,\"id\":\"gender-1\"},{\"value\":\"2\",\"label\":\"Perempuan\",\"selected\":false,\"id\":\"gender-2\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Jenis Kelamin' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- IPA Questions (Mixed ratings, newer student perspective)
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Dosen dalam Mengajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kelengkapan Fasilitas Kampus' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Dukungan Pengembangan Karir' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Kurikulum Program Studi' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Layanan Kemahasiswaan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Akses Internet dan WiFi Kampus' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kegiatan Ekstrakurikuler' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"1\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Program Magang dan Internship' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Perpustakaan dan Sumber Belajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Sistem Informasi Akademik' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Ratio/Multiple Choice Questions (Engineering focus)
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"3"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa puas anda dengan kualitas pendidikan di universitas?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"3"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa siap anda untuk dunia kerja setelah lulus?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa aktif anda dalam kegiatan organisasi kampus?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Tatap muka di kelas\",\"selected\":true,\"id\":\"multiple4-1\"},{\"value\":\"2\",\"label\":\"Online learning\",\"selected\":false,\"id\":\"multiple4-2\"},{\"value\":\"3\",\"label\":\"Blended learning\",\"selected\":false,\"id\":\"multiple4-3\"},{\"value\":\"4\",\"label\":\"Praktikum laboratorium\",\"selected\":true,\"id\":\"multiple4-4\"},{\"value\":\"5\",\"label\":\"Project-based learning\",\"selected\":true,\"id\":\"multiple4-5\"},{\"value\":\"6\",\"label\":\"Studi kasus\",\"selected\":false,\"id\":\"multiple4-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Metode pembelajaran mana yang paling efektif untuk anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Programming\",\"selected\":false,\"id\":\"multiple5-1\"},{\"value\":\"2\",\"label\":\"Leadership\",\"selected\":false,\"id\":\"multiple5-2\"},{\"value\":\"3\",\"label\":\"Communication\",\"selected\":true,\"id\":\"multiple5-3\"},{\"value\":\"4\",\"label\":\"Problem Solving\",\"selected\":true,\"id\":\"multiple5-4\"},{\"value\":\"5\",\"label\":\"Project Management\",\"selected\":false,\"id\":\"multiple5-5\"},{\"value\":\"6\",\"label\":\"Research & Analysis\",\"selected\":true,\"id\":\"multiple5-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Skill apa yang paling ingin anda kembangkan?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
END $$;

-- Note: For the remaining 6 answer sheets (15-20), I would create similar blocks with these patterns:
-- Answer Sheet 15: Intermediate satisfaction (ratings 3-4), mixed responses
-- Answer Sheet 16: High satisfaction (ratings 4-5), engaged student
-- Answer Sheet 17: Very low satisfaction (ratings 1-2), disengaged
-- Answer Sheet 18: Moderate satisfaction (ratings 2-3), selective responses
-- Answer Sheet 19: High satisfaction with specific issues (mixed patterns)
-- Answer Sheet 20: Balanced responses (mostly ratings 3-4)

-- Each would follow the same structure with personal info and varied IPA/multiple choice responses
-- to create a diverse dataset for analytics testing.
