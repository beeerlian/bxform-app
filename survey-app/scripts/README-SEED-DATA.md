# College Survey Seed Data Documentation

## Overview

This documentation describes the comprehensive seed data created for the college questionnaire survey with form_id: `e85960b4-4d78-4d9c-bdc2-ae263ff28d10`.

## Files Created

### 1. `seed-questionnaire.sql`

- **Purpose**: Creates the base questionnaire structure
- **Contents**:
  - 10 IPA (Importance-Performance Analysis) questions covering academic aspects
  - 10 Ratio/Multiple choice questions about satisfaction and preferences
  - 7 Personal information questions (name, email, NIM, etc.)
  - 10 new users (8 students + 2 alumni) with diverse backgrounds

### 2. `seed-questionnaire-answers-complete.sql`

- **Purpose**: Creates the first 10 answer sheets with detailed responses
- **Contents**:
  - 10 complete answer sheets with realistic responses
  - Varied satisfaction levels and demographics
  - Different response patterns for analytics testing

### 3. `seed-questionnaire-answers-additional.sql`

- **Purpose**: Adds 10 more answer sheets for comprehensive dataset
- **Contents**:
  - Additional diverse response patterns
  - Includes low, medium, and high satisfaction responses
  - Various demographic and academic backgrounds

### 4. `run-survey-seed.sh`

- **Purpose**: Automated execution script
- **Usage**: `./run-survey-seed.sh "postgresql://user:pass@host:port/database"`
- **Features**: Error handling, step-by-step progress, verification commands

## Question Types

### IPA Questions (10 questions)

1. Kualitas Dosen dalam Mengajar
2. Kelengkapan Fasilitas Kampus
3. Dukungan Pengembangan Karir
4. Kualitas Kurikulum Program Studi
5. Layanan Kemahasiswaan
6. Akses Internet dan WiFi Kampus
7. Kegiatan Ekstrakurikuler
8. Program Magang dan Internship
9. Perpustakaan dan Sumber Belajar
10. Sistem Informasi Akademik

### Ratio/Multiple Choice Questions (10 questions)

1. Seberapa puas anda dengan kualitas pendidikan di universitas? (1-5 scale)
2. Seberapa siap anda untuk dunia kerja setelah lulus? (1-5 scale)
3. Seberapa aktif anda dalam kegiatan organisasi kampus? (1-5 scale)
4. Metode pembelajaran mana yang paling efektif untuk anda? (Multiple choice)
5. Skill apa yang paling ingin anda kembangkan? (Multiple choice)

### Personal Information Questions (7 questions)

1. Nama Lengkap
2. Email
3. Nomor Induk Mahasiswa (NIM)
4. Angkatan
5. Alamat
6. Nomor Telepon
7. Jenis Kelamin

## Users Created

1. **mahasiswa1@univ.ac.id** - Ahmad Rizki (Teknik Informatika, 2020)
2. **mahasiswa2@univ.ac.id** - Siti Nurhaliza (Sistem Informasi, 2021)
3. **mahasiswa3@univ.ac.id** - Budi Santoso (Teknik Mesin, 2019)
4. **mahasiswa4@univ.ac.id** - Dewi Sartika (Manajemen, 2022)
5. **mahasiswa5@univ.ac.id** - Andi Pratama (Teknik Elektro, 2020)
6. **mahasiswa6@univ.ac.id** - Rina Melati (Psikologi, 2021)
7. **mahasiswa7@univ.ac.id** - Fajar Nugroho (Ekonomi, 2019)
8. **mahasiswa8@univ.ac.id** - Indah Permata (Hukum, 2022)
9. **alumni1@univ.ac.id** - Dr. Sarah Wijaya (Alumni Teknik Informatika, 2015)
10. **alumni2@univ.ac.id** - Ir. Rahman Hakim (Alumni Teknik Sipil, 2012)

Plus additional users in the additional seed file:

- **maya.sari@student.univ.ac.id** - Maya Sari Dewi (Sistem Informasi, 2019)
- **rahman.hakim@student.univ.ac.id** - Rahman Hakim (Teknik Elektro, 2021)
- **sari.indah@student.univ.ac.id** - Sari Indah Permata (Manajemen, 2020)
- **budi.santoso@student.univ.ac.id** - Budi Santoso (Teknik Mesin, 2022)

## Response Patterns Created

The seed data includes diverse response patterns:

### High Satisfaction Responses

- Performance ratings: 4-5
- Importance ratings: 4-5
- Active in organizations
- Positive about career readiness

### Low Satisfaction Responses

- Performance ratings: 1-2
- Importance ratings: 3-5 (still consider things important)
- Less active in organizations
- Concerns about career readiness

### Mixed/Moderate Responses

- Performance ratings: 2-4
- Importance ratings: 3-5
- Varied engagement levels
- Balanced perspectives

## Analytics Use Cases

This seed data supports testing of:

1. **IPA Analysis**: Importance vs Performance quadrant analysis
2. **K-Means Clustering**: Grouping responses by similarity patterns
3. **Bar Charts**: Response distribution visualization
4. **Heatmaps**: Response pattern visualization
5. **Correlation Analysis**: Relationships between different metrics
6. **Demographic Analysis**: Responses by angkatan, program study, etc.

## Execution Instructions

1. Ensure PostgreSQL is running and accessible
2. Navigate to the scripts directory
3. Make the script executable: `chmod +x run-survey-seed.sh`
4. Run the script: `./run-survey-seed.sh "your_database_connection_string"`
5. Verify data with the provided SQL queries

## Verification Queries

```sql
-- Check questions count
SELECT COUNT(*) FROM questions WHERE form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';

-- Check answer sheets count
SELECT COUNT(*) FROM answer_sheets WHERE form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';

-- Check question answers count
SELECT COUNT(*) FROM question_answers WHERE form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10';

-- Sample IPA data for analytics
SELECT
    q.content,
    qa.answer,
    u.email
FROM question_answers qa
JOIN questions q ON qa.question_id = q.id
JOIN users u ON qa.user_id = u.id
WHERE q.question_type_id = (SELECT id FROM question_types WHERE type = 'ipa')
AND qa.form_id = 'e85960b4-4d78-4d9c-bdc2-ae263ff28d10'
LIMIT 10;
```

## Notes

- All IDs (except form_id) are auto-generated
- Created_at and updated_at timestamps are auto-generated
- Response data is formatted as JSON strings as required by the application
- Gender responses use the required JSON array format with selected boolean flags
- Multiple choice responses include all options with selected/unselected states
