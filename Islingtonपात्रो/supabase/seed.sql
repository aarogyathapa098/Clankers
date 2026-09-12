-- ============================================================
-- ISLINGTON COLLEGE
-- INTELLIGENT ACADEMIC SCHEDULING SYSTEM
-- SUPABASE SEED DATA
-- ============================================================
--
-- Official source:
-- https://www.islington.edu.np/programmes/computing
-- https://www.islington.edu.np/programmes/computing-with-Ai
--
-- REAL / SOURCE-BASED:
--   Programme names
--   Module names
--   Module credits
--
-- DEMO / PROTOTYPE DATA:
--   Lecturer records
--   Section records
--   Student records
--   Room records
--   Time slots
--
-- Existing academic data should eventually be imported from
-- Islington's actual database instead of the demo records.
-- ============================================================


-- ============================================================
-- 0. EXTENSION
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ============================================================
-- 1. PROGRAMMES
-- ============================================================

INSERT INTO programme (
    programme_id,
    programme_code,
    programme_name,
    duration_years,
    status
)
VALUES

(
    '10000000-0000-0000-0000-000000000001',
    'BSC-COMP',
    'BSc (Hons) Computing',
    3,
    'active'
),

(
    '10000000-0000-0000-0000-000000000002',
    'BSC-COMP-AI',
    'BSc (Hons) Computing with Artificial Intelligence',
    3,
    'active'
);


-- ============================================================
-- 2. BSc (Hons) COMPUTING MODULES
-- ============================================================

-- YEAR 1

INSERT INTO module (
    module_id,
    module_code,
    module_name,
    programme_id,
    credit_hours,
    weekly_sessions,
    duration_minutes,
    status
)
VALUES

(
    '20000000-0000-0000-0000-000000000001',
    'COMP-PROG',
    'Programming',
    '10000000-0000-0000-0000-000000000001',
    30,
    2,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000002',
    'COMP-IIS',
    'Introduction to Information Systems',
    '10000000-0000-0000-0000-000000000001',
    15,
    1,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000003',
    'COMP-HSA',
    'Computer Hardware and Software Architectures',
    '10000000-0000-0000-0000-000000000001',
    30,
    2,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000004',
    'COMP-FC',
    'Fundamentals of Computing',
    '10000000-0000-0000-0000-000000000001',
    15,
    1,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000005',
    'COMP-LPS',
    'Logic and Problem Solving',
    '10000000-0000-0000-0000-000000000001',
    30,
    2,
    120,
    'active'
);


-- YEAR 2

INSERT INTO module (
    module_id,
    module_code,
    module_name,
    programme_id,
    credit_hours,
    weekly_sessions,
    duration_minutes,
    status
)
VALUES

(
    '20000000-0000-0000-0000-000000000006',
    'COMP-DB',
    'Databases',
    '10000000-0000-0000-0000-000000000001',
    15,
    1,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000007',
    'COMP-NOS',
    'Network Operating Systems',
    '10000000-0000-0000-0000-000000000001',
    15,
    1,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000008',
    'COMP-PEI',
    'Professional and Ethical Issues',
    '10000000-0000-0000-0000-000000000001',
    15,
    1,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000009',
    'COMP-SDD',
    'Smart Data Discovery',
    '10000000-0000-0000-0000-000000000001',
    15,
    1,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000010',
    'COMP-SE',
    'Software Engineering',
    '10000000-0000-0000-0000-000000000001',
    30,
    2,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000011',
    'COMP-APT',
    'Advanced Programming and Technologies',
    '10000000-0000-0000-0000-000000000001',
    15,
    1,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000012',
    'COMP-CC-IOT',
    'Cloud Computing and Internet of Things',
    '10000000-0000-0000-0000-000000000001',
    15,
    1,
    120,
    'active'
);


-- YEAR 3

INSERT INTO module (
    module_id,
    module_code,
    module_name,
    programme_id,
    credit_hours,
    weekly_sessions,
    duration_minutes,
    status
)
VALUES

(
    '20000000-0000-0000-0000-000000000013',
    'COMP-DWD',
    'Data and Web Development',
    '10000000-0000-0000-0000-000000000001',
    30,
    2,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000014',
    'COMP-AD',
    'Application Development',
    '10000000-0000-0000-0000-000000000001',
    30,
    2,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000015',
    'COMP-AI',
    'Artificial Intelligence',
    '10000000-0000-0000-0000-000000000001',
    15,
    1,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000016',
    'COMP-PROJECT',
    'Project',
    '10000000-0000-0000-0000-000000000001',
    30,
    1,
    120,
    'active'
),

(
    '20000000-0000-0000-0000-000000000017',
    'COMP-CDL',
    'Career Development Learning',
    '10000000-0000-0000-0000-000000000001',
    15,
    1,
    120,
    'active'
);


-- ============================================================
-- 3. BSc (Hons) COMPUTING WITH ARTIFICIAL INTELLIGENCE
-- ============================================================

-- YEAR 1

INSERT INTO module (
    module_id,
    module_code,
    module_name,
    programme_id,
    credit_hours,
    weekly_sessions,
    duration_minutes,
    status
)
VALUES

(
    '30000000-0000-0000-0000-000000000001',
    'AI-PROG',
    'Programming',
    '10000000-0000-0000-0000-000000000002',
    30,
    2,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000002',
    'AI-IIS',
    'Introduction to Information Systems',
    '10000000-0000-0000-0000-000000000002',
    15,
    1,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000003',
    'AI-FC',
    'Fundamentals of Computing',
    '10000000-0000-0000-0000-000000000002',
    15,
    1,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000004',
    'AI-CALC',
    'Calculus and Linear Algebra',
    '10000000-0000-0000-0000-000000000002',
    30,
    2,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000005',
    'AI-ROBOTICS',
    'Fundamentals of Robotics and IoT',
    '10000000-0000-0000-0000-000000000002',
    30,
    2,
    120,
    'active'
);


-- YEAR 2

INSERT INTO module (
    module_id,
    module_code,
    module_name,
    programme_id,
    credit_hours,
    weekly_sessions,
    duration_minutes,
    status
)
VALUES

(
    '30000000-0000-0000-0000-000000000006',
    'AI-DSP',
    'Data Structure and Specialist Programming',
    '10000000-0000-0000-0000-000000000002',
    30,
    2,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000007',
    'AI-SE',
    'Software Engineering',
    '10000000-0000-0000-0000-000000000002',
    30,
    2,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000008',
    'AI-DB',
    'Database',
    '10000000-0000-0000-0000-000000000002',
    15,
    1,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000009',
    'AI-PS',
    'Probability and Statistics',
    '10000000-0000-0000-0000-000000000002',
    15,
    1,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000010',
    'AI-FCALC',
    'Further Calculus',
    '10000000-0000-0000-0000-000000000002',
    15,
    1,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000011',
    'AI-ADS',
    'Applied Data Science',
    '10000000-0000-0000-0000-000000000002',
    15,
    1,
    120,
    'active'
);


-- YEAR 3

INSERT INTO module (
    module_id,
    module_code,
    module_name,
    programme_id,
    credit_hours,
    weekly_sessions,
    duration_minutes,
    status
)
VALUES

(
    '30000000-0000-0000-0000-000000000012',
    'AI-PROJECT',
    'Project',
    '10000000-0000-0000-0000-000000000002',
    30,
    1,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000013',
    'AI-BDDM',
    'Big Data and Data Mining',
    '10000000-0000-0000-0000-000000000002',
    30,
    2,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000014',
    'AI-CDL',
    'Career Development Learning',
    '10000000-0000-0000-0000-000000000002',
    15,
    1,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000015',
    'AI-AI',
    'Artificial Intelligence',
    '10000000-0000-0000-0000-000000000002',
    15,
    1,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000016',
    'AI-CV',
    'Computer Vision',
    '10000000-0000-0000-0000-000000000002',
    15,
    1,
    120,
    'active'
),

(
    '30000000-0000-0000-0000-000000000017',
    'AI-AML',
    'Applied Machine Learning',
    '10000000-0000-0000-0000-000000000002',
    15,
    1,
    120,
    'active'
);


-- ============================================================
-- 4. LECTURERS
-- ============================================================
--
-- DEMO DATA ONLY.
--
-- Do NOT use these as actual Islington College lecturers.
-- Replace with the existing lecturer records in your database.
-- ============================================================

INSERT INTO lecturer (
    lecturer_id,
    employee_code,
    first_name,
    last_name,
    email,
    department,
    max_weekly_hours,
    status
)
VALUES

(
    '60000000-0000-0000-0000-000000000001',
    'DEMO-L001',
    'Demo',
    'Programming Lecturer',
    'demo.programming@islington.edu.np',
    'Computing',
    18,
    'active'
),

(
    '60000000-0000-0000-0000-000000000002',
    'DEMO-L002',
    'Demo',
    'Database Lecturer',
    'demo.database@islington.edu.np',
    'Computing',
    18,
    'active'
),

(
    '60000000-0000-0000-0000-000000000003',
    'DEMO-L003',
    'Demo',
    'AI Lecturer',
    'demo.ai@islington.edu.np',
    'Computing with Artificial Intelligence',
    18,
    'active'
),

(
    '60000000-0000-0000-0000-000000000004',
    'DEMO-L004',
    'Demo',
    'Mathematics Lecturer',
    'demo.math@islington.edu.np',
    'Computing with Artificial Intelligence',
    18,
    'active'
);


-- ============================================================
-- 5. SECTIONS
-- ============================================================
--
-- DEMO SCHEDULING DATA.
-- Section information is not publicly exposed by Islington.
-- ============================================================

INSERT INTO section (
    section_id,
    section_code,
    programme_id,
    module_id,
    academic_year,
    semester,
    student_count,
    status
)
VALUES

(
    '70000000-0000-0000-0000-000000000001',
    'BSC-COMP-Y1-A',
    '10000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    '2026',
    1,
    45,
    'active'
),

(
    '70000000-0000-0000-0000-000000000002',
    'BSC-COMP-Y2-A',
    '10000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000010',
    '2026',
    1,
    40,
    'active'
),

(
    '70000000-0000-0000-0000-000000000003',
    'BSC-COMP-Y3-A',
    '10000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000014',
    '2026',
    1,
    35,
    'active'
),

(
    '70000000-0000-0000-0000-000000000004',
    'BSC-AI-Y1-A',
    '10000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000004',
    '2026',
    1,
    35,
    'active'
),

(
    '70000000-0000-0000-0000-000000000005',
    'BSC-AI-Y2-A',
    '10000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000009',
    '2026',
    1,
    30,
    'active'
),

(
    '70000000-0000-0000-0000-000000000006',
    'BSC-AI-Y3-A',
    '10000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000017',
    '2026',
    1,
    30,
    'active'
);


-- ============================================================
-- 6. STUDENTS
-- ============================================================
--
-- DEMO DATA ONLY.
--
-- These are not real Islington student records.
-- In the actual system, Student data already exists.
-- ============================================================

INSERT INTO student (
    student_id,
    student_number,
    first_name,
    last_name,
    email,
    programme_id,
    section_id,
    semester,
    status
)
VALUES

-- BSc Computing Y1

(
    '80000000-0000-0000-0000-000000000001',
    'DEMO001',
    'Aarav',
    'Sharma',
    'demo001@student.example',
    '10000000-0000-0000-0000-000000000001',
    '70000000-0000-0000-0000-000000000001',
    1,
    'active'
),

(
    '80000000-0000-0000-0000-000000000002',
    'DEMO002',
    'Aayush',
    'Karki',
    'demo002@student.example',
    '10000000-0000-0000-0000-000000000001',
    '70000000-0000-0000-0000-000000000001',
    1,
    'active'
),

(
    '80000000-0000-0000-0000-000000000003',
    'DEMO003',
    'Sagar',
    'Thapa',
    'demo003@student.example',
    '10000000-0000-0000-0000-000000000001',
    '70000000-0000-0000-0000-000000000001',
    1,
    'active'
),

-- BSc Computing Y2

(
    '80000000-0000-0000-0000-000000000004',
    'DEMO004',
    'Rohan',
    'Shrestha',
    'demo004@student.example',
    '10000000-0000-0000-0000-000000000001',
    '70000000-0000-0000-0000-000000000002',
    1,
    'active'
),

(
    '80000000-0000-0000-0000-000000000005',
    'DEMO005',
    'Nischal',
    'Gurung',
    'demo005@student.example',
    '10000000-0000-0000-0000-000000000001',
    '70000000-0000-0000-0000-000000000002',
    1,
    'active'
),

-- BSc Computing Y3

(
    '80000000-0000-0000-0000-000000000006',
    'DEMO006',
    'Bibek',
    'Adhikari',
    'demo006@student.example',
    '10000000-0000-0000-0000-000000000001',
    '70000000-0000-0000-0000-000000000003',
    1,
    'active'
),

-- BSc AI Y1

(
    '80000000-0000-0000-0000-000000000007',
    'DEMO007',
    'Pratik',
    'Poudel',
    'demo007@student.example',
    '10000000-0000-0000-0000-000000000002',
    '70000000-0000-0000-0000-000000000004',
    1,
    'active'
),

(
    '80000000-0000-0000-0000-000000000008',
    'DEMO008',
    'Sujan',
    'Bista',
    'demo008@student.example',
    '10000000-0000-0000-0000-000000000002',
    '70000000-0000-0000-0000-000000000004',
    1,
    'active'
),

-- BSc AI Y2

(
    '80000000-0000-0000-0000-000000000009',
    'DEMO009',
    'Anish',
    'Rana',
    'demo009@student.example',
    '10000000-0000-0000-0000-000000000002',
    '70000000-0000-0000-0000-000000000005',
    1,
    'active'
),

-- BSc AI Y3

(
    '80000000-0000-0000-0000-000000000010',
    'DEMO010',
    'Suman',
    'KC',
    'demo010@student.example',
    '10000000-0000-0000-0000-000000000002',
    '70000000-0000-0000-0000-000000000006',
    1,
    'active'
);


-- ============================================================
-- 7. ROOMS
-- ============================================================
--
-- DEMO ROOM DATA.
--
-- Islington's public website describes its facilities but does
-- not publish the complete internal room-code/capacity list.
--
-- These room records are therefore scheduling-test records.
-- ============================================================

INSERT INTO room (
    room_id,
    room_code,
    building,
    floor,
    room_type,
    capacity,
    exam_capacity,
    is_available,
    resources,
    status
)
VALUES

(
    '40000000-0000-0000-0000-000000000001',
    'LECTURE-HALL-01',
    'Islington College',
    1,
    'lecture_hall',
    60,
    40,
    true,
    '{"projector": true, "sound_system": true, "whiteboard": true}',
    'active'
),

(
    '40000000-0000-0000-0000-000000000002',
    'LECTURE-HALL-02',
    'Islington College',
    1,
    'lecture_hall',
    60,
    40,
    true,
    '{"projector": true, "sound_system": true, "whiteboard": true}',
    'active'
),

(
    '40000000-0000-0000-0000-000000000003',
    'LECTURE-HALL-03',
    'Islington College',
    2,
    'lecture_hall',
    80,
    50,
    true,
    '{"projector": true, "sound_system": true, "whiteboard": true}',
    'active'
),

(
    '40000000-0000-0000-0000-000000000004',
    'COMPUTER-LAB-01',
    'Islington College',
    2,
    'computer_lab',
    40,
    30,
    true,
    '{"computers": true, "internet": true, "projector": true}',
    'active'
),

(
    '40000000-0000-0000-0000-000000000005',
    'COMPUTER-LAB-02',
    'Islington College',
    2,
    'computer_lab',
    40,
    30,
    true,
    '{"computers": true, "internet": true, "projector": true}',
    'active'
),

(
    '40000000-0000-0000-0000-000000000006',
    'COMPUTER-LAB-03',
    'Islington College',
    50,
    35,
    true,
    '{"computers": true, "internet": true, "projector": true}',
    'active'
),

(
    '40000000-0000-0000-0000-000000000007',
    'TUTORIAL-01',
    'Islington College',
    1,
    'tutorial',
    30,
    20,
    true,
    '{"projector": true, "whiteboard": true}',
    'active'
),

(
    '40000000-0000-0000-0000-000000000008',
    'TUTORIAL-02',
    'Islington College',
    1,
    'tutorial',
    30,
    20,
    true,
    '{"projector": true, "whiteboard": true}',
    'active'
);


-- ============================================================
-- 8. TIME SLOTS
-- ============================================================
--
-- DEMO SCHEDULING TIME SLOTS.
--
-- day_of_week:
-- 1 = Monday
-- 2 = Tuesday
-- 3 = Wednesday
-- 4 = Thursday
-- 5 = Friday
-- ============================================================

INSERT INTO time_slots (
    time_slot_id,
    day_of_week,
    start_time,
    end_time,
    slot_type,
    is_available
)
VALUES

-- MONDAY

(
    '50000000-0000-0000-0000-000000000001',
    1,
    '08:00',
    '10:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000002',
    1,
    '10:00',
    '12:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000003',
    1,
    '13:00',
    '15:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000004',
    1,
    '15:00',
    '17:00',
    'class',
    true
),

-- TUESDAY

(
    '50000000-0000-0000-0000-000000000005',
    2,
    '08:00',
    '10:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000006',
    2,
    '10:00',
    '12:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000007',
    2,
    '13:00',
    '15:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000008',
    2,
    '15:00',
    '17:00',
    'class',
    true
),

-- WEDNESDAY

(
    '50000000-0000-0000-0000-000000000009',
    3,
    '08:00',
    '10:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000010',
    3,
    '10:00',
    '12:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000011',
    3,
    '13:00',
    '15:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000012',
    3,
    '15:00',
    '17:00',
    'class',
    true
),

-- THURSDAY

(
    '50000000-0000-0000-0000-000000000013',
    4,
    '08:00',
    '10:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000014',
    4,
    '10:00',
    '12:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000015',
    4,
    '13:00',
    '15:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000016',
    4,
    '15:00',
    '17:00',
    'class',
    true
),

-- FRIDAY

(
    '50000000-0000-0000-0000-000000000017',
    5,
    '08:00',
    '10:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000018',
    5,
    '10:00',
    '12:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000019',
    5,
    '13:00',
    '15:00',
    'class',
    true
),

(
    '50000000-0000-0000-0000-000000000020',
    5,
    '15:00',
    '17:00',
    'class',
    true
);


-- ============================================================
-- 9. EXAM TIME SLOTS
-- ============================================================

INSERT INTO time_slots (
    time_slot_id,
    day_of_week,
    start_time,
    end_time,
    slot_type,
    is_available
)
VALUES

(
    '50000000-0000-0000-0000-000000000021',
    1,
    '09:00',
    '12:00',
    'exam',
    true
),

(
    '50000000-0000-0000-0000-000000000022',
    1,
    '13:00',
    '16:00',
    'exam',
    true
),

(
    '50000000-0000-0000-0000-000000000023',
    3,
    '09:00',
    '12:00',
    'exam',
    true
),

(
    '50000000-0000-0000-0000-000000000024',
    3,
    '13:00',
    '16:00',
    'exam',
    true
),

(
    '50000000-0000-0000-0000-000000000025',
    5,
    '09:00',
    '12:00',
    'exam',
    true
),

(
    '50000000-0000-0000-0000-000000000026',
    5,
    '13:00',
    '16:00',
    'exam',
    true
);


-- ============================================================
-- 10. VERIFICATION QUERIES
-- ============================================================

SELECT
    programme_code,
    programme_name,
    duration_years,
    status
FROM programme
ORDER BY programme_code;


SELECT
    m.module_code,
    m.module_name,
    p.programme_code,
    m.credit_hours
FROM module m
JOIN programme p
    ON p.programme_id = m.programme_id
ORDER BY
    p.programme_code,
    m.module_code;


SELECT
    employee_code,
    first_name,
    last_name,
    department
FROM lecturer
ORDER BY employee_code;


SELECT
    section_code,
    academic_year,
    semester,
    student_count
FROM section
ORDER BY section_code;


SELECT
    room_code,
    room_type,
    capacity,
    exam_capacity,
    is_available
FROM room
ORDER BY room_code;


SELECT
    day_of_week,
    start_time,
    end_time,
    slot_type
FROM time_slots
ORDER BY
    day_of_week,
    start_time;