SET check_function_bodies = false;

-- Complete answer sheets with realistic diverse responses for college survey
-- This script should be run after seed-questionnaire.sql

-- Answer Sheet 1 - Ahmad Rizki Pratama (Teknik Informatika, Angkatan 2020)
-- Personal Information
DO $$
DECLARE
    user_id UUID;
    sheet_id UUID;
    question_name_id UUID;
    question_email_id UUID;
    question_nim_id UUID;
    question_angkatan_id UUID;
    question_alamat_id UUID;
    question_telp_id UUID;
    question_gender_id UUID;
BEGIN
    -- Get user ID
    SELECT id INTO user_id FROM public.users WHERE email = 'mahasiswa1@univ.ac.id';
    
    -- Insert answer sheet and get ID
    INSERT INTO public.answer_sheets (form_id, user_id, recorded) 
    VALUES ('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, true)
    RETURNING id INTO sheet_id;
    
    -- Get question IDs for personal information
    SELECT id INTO question_name_id FROM public.questions WHERE content = 'Nama Lengkap' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    SELECT id INTO question_email_id FROM public.questions WHERE content = 'Email' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    SELECT id INTO question_nim_id FROM public.questions WHERE content = 'Nomor Induk Mahasiswa (NIM)' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    SELECT id INTO question_angkatan_id FROM public.questions WHERE content = 'Angkatan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    SELECT id INTO question_alamat_id FROM public.questions WHERE content = 'Alamat' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    SELECT id INTO question_telp_id FROM public.questions WHERE content = 'Nomor Telepon' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    SELECT id INTO question_gender_id FROM public.questions WHERE content = 'Jenis Kelamin' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Insert personal information answers
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id) VALUES
    (question_name_id, '"Ahmad Rizki Pratama"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id),
    (question_email_id, '"ahmad.rizki@student.univ.ac.id"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id),
    (question_nim_id, '"20200001"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id),
    (question_angkatan_id, '"2020"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id),
    (question_alamat_id, '"Jl. Sudirman No. 123, Jakarta Pusat"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id),
    (question_telp_id, '"081234567890"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id),
    (question_gender_id, '"[{\"value\":\"1\",\"label\":\"Laki-laki\",\"selected\":true,\"id\":\"gender-1\"},{\"value\":\"2\",\"label\":\"Perempuan\",\"selected\":false,\"id\":\"gender-2\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id);
    
    -- Insert IPA answers (importance and performance ratings)
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Dosen dalam Mengajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Fasilitas Laboratorium dan Perpustakaan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Bimbingan Akademik dan Konseling' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kurikulum dan Materi Pembelajaran' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Penelitian dan Publikasi Ilmiah' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kesiapan Kerja dan Career Development' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Praktikum dan Pengalaman Lapangan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Teknologi dan E-Learning' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Organisasi Kemahasiswaan dan Soft Skills' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alumni Network dan Job Placement' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Insert Ratio answers
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Berapa lama waktu ideal untuk menyelesaikan tugas akhir/skripsi?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"3"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa sering anda mengakses perpustakaan untuk keperluan akademik?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"1"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Berapa banyak publikasi ilmiah yang telah anda hasilkan selama kuliah?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"4"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa puas anda dengan layanan administrasi akademik?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"3"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa sering anda berpartisipasi dalam kegiatan akademik di luar kelas?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Insert Multiple Choice answers
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Teknik Informatika\",\"selected\":true,\"id\":\"multiple1-1\"},{\"value\":\"2\",\"label\":\"Sistem Informasi\",\"selected\":false,\"id\":\"multiple1-2\"},{\"value\":\"3\",\"label\":\"Teknik Elektro\",\"selected\":false,\"id\":\"multiple1-3\"},{\"value\":\"4\",\"label\":\"Manajemen\",\"selected\":false,\"id\":\"multiple1-4\"},{\"value\":\"5\",\"label\":\"Akuntansi\",\"selected\":false,\"id\":\"multiple1-5\"},{\"value\":\"6\",\"label\":\"Lainnya\",\"selected\":false,\"id\":\"multiple1-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Apa program studi yang anda ambil?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Artificial Intelligence\",\"selected\":true,\"id\":\"multiple2-1\"},{\"value\":\"2\",\"label\":\"Cybersecurity\",\"selected\":false,\"id\":\"multiple2-2\"},{\"value\":\"3\",\"label\":\"Data Science\",\"selected\":true,\"id\":\"multiple2-3\"},{\"value\":\"4\",\"label\":\"Software Engineering\",\"selected\":false,\"id\":\"multiple2-4\"},{\"value\":\"5\",\"label\":\"Internet of Things\",\"selected\":false,\"id\":\"multiple2-5\"},{\"value\":\"6\",\"label\":\"Mobile Development\",\"selected\":false,\"id\":\"multiple2-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Bidang penelitian apa yang paling menarik bagi anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Bekerja di perusahaan teknologi\",\"selected\":true,\"id\":\"multiple3-1\"},{\"value\":\"2\",\"label\":\"Melanjutkan studi S2\",\"selected\":false,\"id\":\"multiple3-2\"},{\"value\":\"3\",\"label\":\"Berwirausaha/startup\",\"selected\":false,\"id\":\"multiple3-3\"},{\"value\":\"4\",\"label\":\"Bekerja sebagai freelancer\",\"selected\":false,\"id\":\"multiple3-4\"},{\"value\":\"5\",\"label\":\"Menjadi dosen/peneliti\",\"selected\":false,\"id\":\"multiple3-5\"},{\"value\":\"6\",\"label\":\"Belum tahu\",\"selected\":false,\"id\":\"multiple3-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Setelah lulus, apa rencana karir anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Tatap muka di kelas\",\"selected\":false,\"id\":\"multiple4-1\"},{\"value\":\"2\",\"label\":\"Online learning\",\"selected\":false,\"id\":\"multiple4-2\"},{\"value\":\"3\",\"label\":\"Blended learning\",\"selected\":true,\"id\":\"multiple4-3\"},{\"value\":\"4\",\"label\":\"Praktikum laboratorium\",\"selected\":true,\"id\":\"multiple4-4\"},{\"value\":\"5\",\"label\":\"Project-based learning\",\"selected\":false,\"id\":\"multiple4-5\"},{\"value\":\"6\",\"label\":\"Studi kasus\",\"selected\":false,\"id\":\"multiple4-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Metode pembelajaran mana yang paling efektif untuk anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Programming\",\"selected\":true,\"id\":\"multiple5-1\"},{\"value\":\"2\",\"label\":\"Leadership\",\"selected\":false,\"id\":\"multiple5-2\"},{\"value\":\"3\",\"label\":\"Communication\",\"selected\":false,\"id\":\"multiple5-3\"},{\"value\":\"4\",\"label\":\"Problem Solving\",\"selected\":true,\"id\":\"multiple5-4\"},{\"value\":\"5\",\"label\":\"Project Management\",\"selected\":false,\"id\":\"multiple5-5\"},{\"value\":\"6\",\"label\":\"Research & Analysis\",\"selected\":false,\"id\":\"multiple5-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Skill apa yang paling ingin anda kembangkan?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
END $$;

-- Continue with more diverse answer sheets for other users...
-- Answer Sheet 2 - Sari Dewi Putri (Sistem Informasi, Angkatan 2021)
DO $$
DECLARE
    user_id UUID;
    sheet_id UUID;
BEGIN
    SELECT id INTO user_id FROM public.users WHERE email = 'mahasiswa2@univ.ac.id';
    
    INSERT INTO public.answer_sheets (form_id, user_id, recorded) 
    VALUES ('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, true)
    RETURNING id INTO sheet_id;
    
    -- Personal Information
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Sari Dewi Putri"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nama Lengkap' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"sari.dewi@student.univ.ac.id"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Email' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"21210002"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Induk Mahasiswa (NIM)' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2021"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Angkatan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Jl. Merdeka No. 45, Bandung"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alamat' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"082345678901"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Telepon' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Laki-laki\",\"selected\":false,\"id\":\"gender-1\"},{\"value\":\"2\",\"label\":\"Perempuan\",\"selected\":true,\"id\":\"gender-2\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Jenis Kelamin' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Different IPA responses
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"5\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Dosen dalam Mengajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Fasilitas Laboratorium dan Perpustakaan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Program studi: Sistem Informasi
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Teknik Informatika\",\"selected\":false,\"id\":\"multiple1-1\"},{\"value\":\"2\",\"label\":\"Sistem Informasi\",\"selected\":true,\"id\":\"multiple1-2\"},{\"value\":\"3\",\"label\":\"Teknik Elektro\",\"selected\":false,\"id\":\"multiple1-3\"},{\"value\":\"4\",\"label\":\"Manajemen\",\"selected\":false,\"id\":\"multiple1-4\"},{\"value\":\"5\",\"label\":\"Akuntansi\",\"selected\":false,\"id\":\"multiple1-5\"},{\"value\":\"6\",\"label\":\"Lainnya\",\"selected\":false,\"id\":\"multiple1-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Apa program studi yang anda ambil?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Interest in Data Science and Software Engineering
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Artificial Intelligence\",\"selected\":false,\"id\":\"multiple2-1\"},{\"value\":\"2\",\"label\":\"Cybersecurity\",\"selected\":false,\"id\":\"multiple2-2\"},{\"value\":\"3\",\"label\":\"Data Science\",\"selected\":true,\"id\":\"multiple2-3\"},{\"value\":\"4\",\"label\":\"Software Engineering\",\"selected\":true,\"id\":\"multiple2-4\"},{\"value\":\"5\",\"label\":\"Internet of Things\",\"selected\":false,\"id\":\"multiple2-5\"},{\"value\":\"6\",\"label\":\"Mobile Development\",\"selected\":false,\"id\":\"multiple2-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Bidang penelitian apa yang paling menarik bagi anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Plans for graduate study
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Bekerja di perusahaan teknologi\",\"selected\":false,\"id\":\"multiple3-1\"},{\"value\":\"2\",\"label\":\"Melanjutkan studi S2\",\"selected\":true,\"id\":\"multiple3-2\"},{\"value\":\"3\",\"label\":\"Berwirausaha/startup\",\"selected\":false,\"id\":\"multiple3-3\"},{\"value\":\"4\",\"label\":\"Bekerja sebagai freelancer\",\"selected\":false,\"id\":\"multiple3-4\"},{\"value\":\"5\",\"label\":\"Menjadi dosen/peneliti\",\"selected\":false,\"id\":\"multiple3-5\"},{\"value\":\"6\",\"label\":\"Belum tahu\",\"selected\":false,\"id\":\"multiple3-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Setelah lulus, apa rencana karir anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Tatap muka di kelas\",\"selected\":false,\"id\":\"multiple4-1\"},{\"value\":\"2\",\"label\":\"Online learning\",\"selected\":false,\"id\":\"multiple4-2\"},{\"value\":\"3\",\"label\":\"Blended learning\",\"selected\":true,\"id\":\"multiple4-3\"},{\"value\":\"4\",\"label\":\"Praktikum laboratorium\",\"selected\":true,\"id\":\"multiple4-4\"},{\"value\":\"5\",\"label\":\"Project-based learning\",\"selected\":false,\"id\":\"multiple4-5\"},{\"value\":\"6\",\"label\":\"Studi kasus\",\"selected\":false,\"id\":\"multiple4-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Metode pembelajaran mana yang paling efektif untuk anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Programming\",\"selected\":true,\"id\":\"multiple5-1\"},{\"value\":\"2\",\"label\":\"Leadership\",\"selected\":false,\"id\":\"multiple5-2\"},{\"value\":\"3\",\"label\":\"Communication\",\"selected\":false,\"id\":\"multiple5-3\"},{\"value\":\"4\",\"label\":\"Problem Solving\",\"selected\":true,\"id\":\"multiple5-4\"},{\"value\":\"5\",\"label\":\"Project Management\",\"selected\":false,\"id\":\"multiple5-5\"},{\"value\":\"6\",\"label\":\"Research & Analysis\",\"selected\":false,\"id\":\"multiple5-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Skill apa yang paling ingin anda kembangkan?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
END $$;

-- Answer Sheet 3 - Budi Santoso (Teknik Elektro, Angkatan 2019)
DO $$
DECLARE
    user_id UUID;
    sheet_id UUID;
BEGIN
    SELECT id INTO user_id FROM public.users WHERE email = 'mahasiswa3@univ.ac.id';
    
    INSERT INTO public.answer_sheets (form_id, user_id, recorded) 
    VALUES ('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, true)
    RETURNING id INTO sheet_id;
    
    -- Personal Information
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Budi Santoso"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nama Lengkap' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"budi.santoso@student.univ.ac.id"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Email' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"19190003"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Induk Mahasiswa (NIM)' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2019"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Angkatan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Jl. Diponegoro No. 78, Surabaya"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alamat' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"083456789012"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Telepon' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Laki-laki\",\"selected\":true,\"id\":\"gender-1\"},{\"value\":\"2\",\"label\":\"Perempuan\",\"selected\":false,\"id\":\"gender-2\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Jenis Kelamin' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- IPA responses - Mixed ratings
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Dosen dalam Mengajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"5\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Fasilitas Laboratorium dan Perpustakaan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Bimbingan Akademik dan Konseling' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kurikulum dan Materi Pembelajaran' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Penelitian dan Publikasi Ilmiah' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kesiapan Kerja dan Career Development' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"5\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Praktikum dan Pengalaman Lapangan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Teknologi dan E-Learning' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"2\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Organisasi Kemahasiswaan dan Soft Skills' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"1\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alumni Network dan Job Placement' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Ratio responses
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"3"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Berapa lama waktu ideal untuk menyelesaikan tugas akhir/skripsi?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"4"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa sering anda mengakses perpustakaan untuk keperluan akademik?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Berapa banyak publikasi ilmiah yang telah anda hasilkan selama kuliah?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"3"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa puas anda dengan layanan administrasi akademik?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"4"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa sering anda berpartisipasi dalam kegiatan akademik di luar kelas?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Multiple choice responses - Teknik Elektro
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Teknik Informatika\",\"selected\":false,\"id\":\"multiple1-1\"},{\"value\":\"2\",\"label\":\"Sistem Informasi\",\"selected\":false,\"id\":\"multiple1-2\"},{\"value\":\"3\",\"label\":\"Teknik Elektro\",\"selected\":true,\"id\":\"multiple1-3\"},{\"value\":\"4\",\"label\":\"Manajemen\",\"selected\":false,\"id\":\"multiple1-4\"},{\"value\":\"5\",\"label\":\"Akuntansi\",\"selected\":false,\"id\":\"multiple1-5\"},{\"value\":\"6\",\"label\":\"Lainnya\",\"selected\":false,\"id\":\"multiple1-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Apa program studi yang anda ambil?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Artificial Intelligence\",\"selected\":false,\"id\":\"multiple2-1\"},{\"value\":\"2\",\"label\":\"Cybersecurity\",\"selected\":true,\"id\":\"multiple2-2\"},{\"value\":\"3\",\"label\":\"Data Science\",\"selected\":false,\"id\":\"multiple2-3\"},{\"value\":\"4\",\"label\":\"Software Engineering\",\"selected\":false,\"id\":\"multiple2-4\"},{\"value\":\"5\",\"label\":\"Internet of Things\",\"selected\":true,\"id\":\"multiple2-5\"},{\"value\":\"6\",\"label\":\"Mobile Development\",\"selected\":false,\"id\":\"multiple2-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Bidang penelitian apa yang paling menarik bagi anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Bekerja di perusahaan teknologi\",\"selected\":true,\"id\":\"multiple3-1\"},{\"value\":\"2\",\"label\":\"Melanjutkan studi S2\",\"selected\":false,\"id\":\"multiple3-2\"},{\"value\":\"3\",\"label\":\"Berwirausaha/startup\",\"selected\":false,\"id\":\"multiple3-3\"},{\"value\":\"4\",\"label\":\"Bekerja sebagai freelancer\",\"selected\":false,\"id\":\"multiple3-4\"},{\"value\":\"5\",\"label\":\"Menjadi dosen/peneliti\",\"selected\":false,\"id\":\"multiple3-5\"},{\"value\":\"6\",\"label\":\"Belum tahu\",\"selected\":false,\"id\":\"multiple3-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Setelah lulus, apa rencana karir anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Tatap muka di kelas\",\"selected\":true,\"id\":\"multiple4-1\"},{\"value\":\"2\",\"label\":\"Online learning\",\"selected\":false,\"id\":\"multiple4-2\"},{\"value\":\"3\",\"label\":\"Blended learning\",\"selected\":false,\"id\":\"multiple4-3\"},{\"value\":\"4\",\"label\":\"Praktikum laboratorium\",\"selected\":true,\"id\":\"multiple4-4\"},{\"value\":\"5\",\"label\":\"Project-based learning\",\"selected\":false,\"id\":\"multiple4-5\"},{\"value\":\"6\",\"label\":\"Studi kasus\",\"selected\":false,\"id\":\"multiple4-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Metode pembelajaran mana yang paling efektif untuk anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Programming\",\"selected\":false,\"id\":\"multiple5-1\"},{\"value\":\"2\",\"label\":\"Leadership\",\"selected\":true,\"id\":\"multiple5-2\"},{\"value\":\"3\",\"label\":\"Communication\",\"selected\":true,\"id\":\"multiple5-3\"},{\"value\":\"4\",\"label\":\"Problem Solving\",\"selected\":false,\"id\":\"multiple5-4\"},{\"value\":\"5\",\"label\":\"Project Management\",\"selected\":true,\"id\":\"multiple5-5\"},{\"value\":\"6\",\"label\":\"Research & Analysis\",\"selected\":false,\"id\":\"multiple5-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Skill apa yang paling ingin anda kembangkan?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
END $$;

-- Answer Sheet 4 - Dina Rahayu (Manajemen, Angkatan 2022)
DO $$
DECLARE
    user_id UUID;
    sheet_id UUID;
BEGIN
    SELECT id INTO user_id FROM public.users WHERE email = 'mahasiswa4@univ.ac.id';
    
    INSERT INTO public.answer_sheets (form_id, user_id, recorded) 
    VALUES ('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, true)
    RETURNING id INTO sheet_id;
    
    -- Personal Information
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Dina Rahayu"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nama Lengkap' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"dina.rahayu@student.univ.ac.id"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Email' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"22220004"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Induk Mahasiswa (NIM)' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2022"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Angkatan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Jl. Ahmad Yani No. 56, Yogyakarta"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alamat' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"084567890123"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Telepon' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Laki-laki\",\"selected\":false,\"id\":\"gender-1\"},{\"value\":\"2\",\"label\":\"Perempuan\",\"selected\":true,\"id\":\"gender-2\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Jenis Kelamin' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- IPA responses - Generally positive
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Dosen dalam Mengajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Fasilitas Laboratorium dan Perpustakaan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"5\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Bimbingan Akademik dan Konseling' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kurikulum dan Materi Pembelajaran' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"1\",\"importance\":\"2\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Penelitian dan Publikasi Ilmiah' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kesiapan Kerja dan Career Development' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Praktikum dan Pengalaman Lapangan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Teknologi dan E-Learning' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"5\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Organisasi Kemahasiswaan dan Soft Skills' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alumni Network dan Job Placement' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Ratio responses
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Berapa lama waktu ideal untuk menyelesaikan tugas akhir/skripsi?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa sering anda mengakses perpustakaan untuk keperluan akademik?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"1"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Berapa banyak publikasi ilmiah yang telah anda hasilkan selama kuliah?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"4"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa puas anda dengan layanan administrasi akademik?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"4"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa sering anda berpartisipasi dalam kegiatan akademik di luar kelas?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Multiple choice responses - Manajemen
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Teknik Informatika\",\"selected\":false,\"id\":\"multiple1-1\"},{\"value\":\"2\",\"label\":\"Sistem Informasi\",\"selected\":false,\"id\":\"multiple1-2\"},{\"value\":\"3\",\"label\":\"Teknik Elektro\",\"selected\":false,\"id\":\"multiple1-3\"},{\"value\":\"4\",\"label\":\"Manajemen\",\"selected\":true,\"id\":\"multiple1-4\"},{\"value\":\"5\",\"label\":\"Akuntansi\",\"selected\":false,\"id\":\"multiple1-5\"},{\"value\":\"6\",\"label\":\"Lainnya\",\"selected\":false,\"id\":\"multiple1-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Apa program studi yang anda ambil?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Artificial Intelligence\",\"selected\":false,\"id\":\"multiple2-1\"},{\"value\":\"2\",\"label\":\"Cybersecurity\",\"selected\":false,\"id\":\"multiple2-2\"},{\"value\":\"3\",\"label\":\"Data Science\",\"selected\":true,\"id\":\"multiple2-3\"},{\"value\":\"4\",\"label\":\"Software Engineering\",\"selected\":false,\"id\":\"multiple2-4\"},{\"value\":\"5\",\"label\":\"Internet of Things\",\"selected\":false,\"id\":\"multiple2-5\"},{\"value\":\"6\",\"label\":\"Mobile Development\",\"selected\":false,\"id\":\"multiple2-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Bidang penelitian apa yang paling menarik bagi anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Bekerja di perusahaan teknologi\",\"selected\":false,\"id\":\"multiple3-1\"},{\"value\":\"2\",\"label\":\"Melanjutkan studi S2\",\"selected\":false,\"id\":\"multiple3-2\"},{\"value\":\"3\",\"label\":\"Berwirausaha/startup\",\"selected\":true,\"id\":\"multiple3-3\"},{\"value\":\"4\",\"label\":\"Bekerja sebagai freelancer\",\"selected\":false,\"id\":\"multiple3-4\"},{\"value\":\"5\",\"label\":\"Menjadi dosen/peneliti\",\"selected\":false,\"id\":\"multiple3-5\"},{\"value\":\"6\",\"label\":\"Belum tahu\",\"selected\":false,\"id\":\"multiple3-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Setelah lulus, apa rencana karir anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Tatap muka di kelas\",\"selected\":false,\"id\":\"multiple4-1\"},{\"value\":\"2\",\"label\":\"Online learning\",\"selected\":true,\"id\":\"multiple4-2\"},{\"value\":\"3\",\"label\":\"Blended learning\",\"selected\":true,\"id\":\"multiple4-3\"},{\"value\":\"4\",\"label\":\"Praktikum laboratorium\",\"selected\":false,\"id\":\"multiple4-4\"},{\"value\":\"5\",\"label\":\"Project-based learning\",\"selected\":false,\"id\":\"multiple4-5\"},{\"value\":\"6\",\"label\":\"Studi kasus\",\"selected\":true,\"id\":\"multiple4-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Metode pembelajaran mana yang paling efektif untuk anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Programming\",\"selected\":false,\"id\":\"multiple5-1\"},{\"value\":\"2\",\"label\":\"Leadership\",\"selected\":true,\"id\":\"multiple5-2\"},{\"value\":\"3\",\"label\":\"Communication\",\"selected\":true,\"id\":\"multiple5-3\"},{\"value\":\"4\",\"label\":\"Problem Solving\",\"selected\":false,\"id\":\"multiple5-4\"},{\"value\":\"5\",\"label\":\"Project Management\",\"selected\":true,\"id\":\"multiple5-5\"},{\"value\":\"6\",\"label\":\"Research & Analysis\",\"selected\":false,\"id\":\"multiple5-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Skill apa yang paling ingin anda kembangkan?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
END $$;

-- Additional answer sheets would continue here for the remaining 6 users...
-- Each with varied responses to show diversity in the data

-- Answer Sheet 5 - Eko Prasetyo (Teknik Informatika, Angkatan 2020)
DO $$
DECLARE
    user_id UUID;
    sheet_id UUID;
BEGIN
    SELECT id INTO user_id FROM public.users WHERE email = 'mahasiswa5@univ.ac.id';
    
    INSERT INTO public.answer_sheets (form_id, user_id, recorded) 
    VALUES ('e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, true)
    RETURNING id INTO sheet_id;
    
    -- Personal Information
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Eko Prasetyo"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nama Lengkap' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"eko.prasetyo@student.univ.ac.id"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Email' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"20200003"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Induk Mahasiswa (NIM)' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2020"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Angkatan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"Jl. Pahlawan No. 10, Semarang"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alamat' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"085678901234"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Nomor Telepon' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Laki-laki\",\"selected\":true,\"id\":\"gender-1\"},{\"value\":\"2\",\"label\":\"Perempuan\",\"selected\":false,\"id\":\"gender-2\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Jenis Kelamin' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- IPA responses - Varied ratings
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kualitas Dosen dalam Mengajar' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Fasilitas Laboratorium dan Perpustakaan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Bimbingan Akademik dan Konseling' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kurikulum dan Materi Pembelajaran' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"2\",\"importance\":\"3\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Penelitian dan Publikasi Ilmiah' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Kesiapan Kerja dan Career Development' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Praktikum dan Pengalaman Lapangan' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Teknologi dan E-Learning' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"4\",\"importance\":\"5\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Organisasi Kemahasiswaan dan Soft Skills' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"{\"performance\":\"3\",\"importance\":\"4\"}"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Alumni Network dan Job Placement' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Ratio responses
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Berapa lama waktu ideal untuk menyelesaikan tugas akhir/skripsi?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"2"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa sering anda mengakses perpustakaan untuk keperluan akademik?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"1"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Berapa banyak publikasi ilmiah yang telah anda hasilkan selama kuliah?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"4"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa puas anda dengan layanan administrasi akademik?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"4"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Seberapa sering anda berpartisipasi dalam kegiatan akademik di luar kelas?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    -- Multiple choice responses - Manajemen
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Teknik Informatika\",\"selected\":false,\"id\":\"multiple1-1\"},{\"value\":\"2\",\"label\":\"Sistem Informasi\",\"selected\":false,\"id\":\"multiple1-2\"},{\"value\":\"3\",\"label\":\"Teknik Elektro\",\"selected\":false,\"id\":\"multiple1-3\"},{\"value\":\"4\",\"label\":\"Manajemen\",\"selected\":true,\"id\":\"multiple1-4\"},{\"value\":\"5\",\"label\":\"Akuntansi\",\"selected\":false,\"id\":\"multiple1-5\"},{\"value\":\"6\",\"label\":\"Lainnya\",\"selected\":false,\"id\":\"multiple1-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Apa program studi yang anda ambil?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Artificial Intelligence\",\"selected\":false,\"id\":\"multiple2-1\"},{\"value\":\"2\",\"label\":\"Cybersecurity\",\"selected\":false,\"id\":\"multiple2-2\"},{\"value\":\"3\",\"label\":\"Data Science\",\"selected\":true,\"id\":\"multiple2-3\"},{\"value\":\"4\",\"label\":\"Software Engineering\",\"selected\":false,\"id\":\"multiple2-4\"},{\"value\":\"5\",\"label\":\"Internet of Things\",\"selected\":false,\"id\":\"multiple2-5\"},{\"value\":\"6\",\"label\":\"Mobile Development\",\"selected\":false,\"id\":\"multiple2-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Bidang penelitian apa yang paling menarik bagi anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Bekerja di perusahaan teknologi\",\"selected\":false,\"id\":\"multiple3-1\"},{\"value\":\"2\",\"label\":\"Melanjutkan studi S2\",\"selected\":false,\"id\":\"multiple3-2\"},{\"value\":\"3\",\"label\":\"Berwirausaha/startup\",\"selected\":true,\"id\":\"multiple3-3\"},{\"value\":\"4\",\"label\":\"Bekerja sebagai freelancer\",\"selected\":false,\"id\":\"multiple3-4\"},{\"value\":\"5\",\"label\":\"Menjadi dosen/peneliti\",\"selected\":false,\"id\":\"multiple3-5\"},{\"value\":\"6\",\"label\":\"Belum tahu\",\"selected\":false,\"id\":\"multiple3-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Setelah lulus, apa rencana karir anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Tatap muka di kelas\",\"selected\":false,\"id\":\"multiple4-1\"},{\"value\":\"2\",\"label\":\"Online learning\",\"selected\":true,\"id\":\"multiple4-2\"},{\"value\":\"3\",\"label\":\"Blended learning\",\"selected\":true,\"id\":\"multiple4-3\"},{\"value\":\"4\",\"label\":\"Praktikum laboratorium\",\"selected\":false,\"id\":\"multiple4-4\"},{\"value\":\"5\",\"label\":\"Project-based learning\",\"selected\":false,\"id\":\"multiple4-5\"},{\"value\":\"6\",\"label\":\"Studi kasus\",\"selected\":true,\"id\":\"multiple4-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Metode pembelajaran mana yang paling efektif untuk anda?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
    INSERT INTO public.question_answers (question_id, answer, form_id, user_id, answer_sheet_id)
    SELECT id, '"[{\"value\":\"1\",\"label\":\"Programming\",\"selected\":false,\"id\":\"multiple5-1\"},{\"value\":\"2\",\"label\":\"Leadership\",\"selected\":true,\"id\":\"multiple5-2\"},{\"value\":\"3\",\"label\":\"Communication\",\"selected\":true,\"id\":\"multiple5-3\"},{\"value\":\"4\",\"label\":\"Problem Solving\",\"selected\":false,\"id\":\"multiple5-4\"},{\"value\":\"5\",\"label\":\"Project Management\",\"selected\":true,\"id\":\"multiple5-5\"},{\"value\":\"6\",\"label\":\"Research & Analysis\",\"selected\":false,\"id\":\"multiple5-6\"}]"', 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10', user_id, sheet_id
    FROM public.questions WHERE content = 'Skill apa yang paling ingin anda kembangkan?' AND form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';
    
END $$;