CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Programme Table

CREATE TABLE IF NOT EXISTS programme (
    programme_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    programme_code VARCHAR(20) NOT NULL UNIQUE,
    programme_name VARCHAR(150) NOT NULL,
    duration_years INTEGER NOT NULL CHECK (duration_years > 0),
    status VARCHAR(20) NOT NULL DEFAULT 'active'CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Module Table

CREATE TABLE IF NOT EXISTS module (
    module_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_code VARCHAR(30) NOT NULL UNIQUE,
    module_name VARCHAR(150) NOT NULL,
    programme_id UUID NOT NULL,
    credit_hours INTEGER NOT NULL DEFAULT 0 CHECK (credit_hours >= 0),
    weekly_sessions INTEGER NOT NULL DEFAULT 1 CHECK (weekly_sessions > 0),
    duration_minutes INTEGER NOT NULL DEFAULT 60 CHECK (duration_minutes > 0),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_module_programme
        FOREIGN KEY (programme_id)
        REFERENCES programme(programme_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- 3. Lecturer Table

CREATE TABLE IF NOT EXISTS lecturer (
    lecturer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_code VARCHAR(30) NOT NULL UNIQUE,

    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    department VARCHAR(100),

    max_weekly_hours INTEGER NOT NULL DEFAULT 20
        CHECK (max_weekly_hours > 0),

    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Section Table

CREATE TABLE IF NOT EXISTS section (
    section_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    section_code VARCHAR(30) NOT NULL UNIQUE,

    programme_id UUID NOT NULL,
    module_id UUID NOT NULL,

    academic_year VARCHAR(20) NOT NULL,
    semester VARCHAR(30) NOT NULL,

    student_count INTEGER NOT NULL DEFAULT 0
        CHECK (student_count >= 0),

    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_section_programme
        FOREIGN KEY (programme_id)
        REFERENCES programme(programme_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_section_module
        FOREIGN KEY (module_id)
        REFERENCES module(module_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- 5. Student Table

CREATE TABLE IF NOT EXISTS student (
    student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_number VARCHAR(30) NOT NULL UNIQUE,

    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,

    email VARCHAR(150) UNIQUE,

    programme_id UUID NOT NULL,
    section_id UUID NOT NULL,

    semester VARCHAR(30) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_student_programme
        FOREIGN KEY (programme_id)
        REFERENCES programme(programme_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_student_section
        FOREIGN KEY (section_id)
        REFERENCES section(section_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- 6. Room Table

CREATE TABLE IF NOT EXISTS room (
    room_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    room_code VARCHAR(30) NOT NULL UNIQUE,

    building VARCHAR(100) NOT NULL,
    floor INTEGER,

    room_type VARCHAR(30) NOT NULL
        CHECK (room_type IN ('classroom', 'lab', 'hall')),

    capacity INTEGER NOT NULL
        CHECK (capacity > 0),

    exam_capacity INTEGER NOT NULL
        CHECK (exam_capacity > 0),

    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    resources JSONB NOT NULL DEFAULT '{}'::jsonb,

    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_exam_capacity
        CHECK (exam_capacity <= capacity)
);

-- 7. Time_Sllots Table

CREATE TABLE IF NOT EXISTS time_slots (
    time_slot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    day_of_week SMALLINT NOT NULL
        CHECK (day_of_week BETWEEN 1 AND 7),

    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    slot_type VARCHAR(20) NOT NULL
        CHECK (slot_type IN ('class', 'exam')),

    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_time_range
        CHECK (start_time < end_time)
);

-- 8. Session Table

CREATE TABLE IF NOT EXISTS session (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    module_id UUID NOT NULL,
    lecturer_id UUID NOT NULL,

    -- Supports normal classes and merged classes.
    -- Multiple section IDs can belong to one session.
    section_ids UUID[] NOT NULL DEFAULT '{}',

    room_id UUID NOT NULL,
    time_slot_id UUID NOT NULL,

    session_type VARCHAR(20) NOT NULL
        CHECK (session_type IN ('class', 'exam')),

    session_date DATE NOT NULL,

    duration_minutes INTEGER NOT NULL
        CHECK (duration_minutes > 0),

    is_merged BOOLEAN NOT NULL DEFAULT FALSE,

    status VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (
            status IN (
                'draft',
                'scheduled',
                'cancelled'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_session_module
        FOREIGN KEY (module_id)
        REFERENCES module(module_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_session_lecturer
        FOREIGN KEY (lecturer_id)
        REFERENCES lecturer(lecturer_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_session_room
        FOREIGN KEY (room_id)
        REFERENCES room(room_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_session_time_slot
        FOREIGN KEY (time_slot_id)
        REFERENCES time_slots(time_slot_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- 9. Conflict_Schedules Table

CREATE TABLE IF NOT EXISTS conflict_schedules (
    conflict_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    session_id UUID NOT NULL,

    related_session_id UUID,

    conflict_type VARCHAR(40) NOT NULL
        CHECK (
            conflict_type IN (
                'ROOM',
                'LECTURER',
                'SECTION',
                'CAPACITY',
                'STUDENT_EXAM',
                'INVIGILATOR'
            )
        ),

    conflict_date DATE NOT NULL,

    time_slot_id UUID,

    severity VARCHAR(20) NOT NULL DEFAULT 'error'
        CHECK (
            severity IN (
                'warning',
                'error',
                'critical'
            )
        ),

    description TEXT NOT NULL,

    is_resolved BOOLEAN NOT NULL DEFAULT FALSE,

    resolved_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_conflict_session
        FOREIGN KEY (session_id)
        REFERENCES session(session_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_conflict_related_session
        FOREIGN KEY (related_session_id)
        REFERENCES session(session_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_conflict_time_slot
        FOREIGN KEY (time_slot_id)
        REFERENCES time_slots(time_slot_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- 10. Invigilator Table

CREATE TABLE IF NOT EXISTS invigilator (
    invigilator_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    lecturer_id UUID NOT NULL,
    session_id UUID NOT NULL,
    room_id UUID NOT NULL,

    duty_role VARCHAR(30) NOT NULL DEFAULT 'support'
        CHECK (
            duty_role IN (
                'chief',
                'support'
            )
        ),

    status VARCHAR(20) NOT NULL DEFAULT 'assigned'
        CHECK (
            status IN (
                'assigned',
                'confirmed',
                'cancelled'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_invigilator_lecturer
        FOREIGN KEY (lecturer_id)
        REFERENCES lecturer(lecturer_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_invigilator_session
        FOREIGN KEY (session_id)
        REFERENCES session(session_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_invigilator_room
        FOREIGN KEY (room_id)
        REFERENCES room(room_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- 11. Exam_Seat_Plans Table

CREATE TABLE IF NOT EXISTS exam_seat_plans (
    seat_plan_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    session_id UUID NOT NULL,
    student_id UUID NOT NULL,
    room_id UUID NOT NULL,

    seat_number VARCHAR(20) NOT NULL,

    row_number INTEGER,
    column_number INTEGER,

    allocation_status VARCHAR(20) NOT NULL DEFAULT 'allocated'
        CHECK (
            allocation_status IN (
                'allocated',
                'unallocated'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_seat_plan_session
        FOREIGN KEY (session_id)
        REFERENCES session(session_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_seat_plan_student
        FOREIGN KEY (student_id)
        REFERENCES student(student_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_seat_plan_room
        FOREIGN KEY (room_id)
        REFERENCES room(room_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    -- One student cannot have two seats for one exam
    CONSTRAINT uq_student_exam
        UNIQUE (session_id, student_id),

    -- One physical seat cannot be assigned twice
    CONSTRAINT uq_room_seat
        UNIQUE (session_id, room_id, seat_number)
);

-- Indexes for performance optimization

CREATE INDEX IF NOT EXISTS idx_module_programme ON module(programme_id);
CREATE INDEX IF NOT EXISTS idx_section_programme ON section(programme_id);
CREATE INDEX IF NOT EXISTS idx_section_module ON section(module_id);
CREATE INDEX IF NOT EXISTS idx_student_programme ON student(programme_id);
CREATE INDEX IF NOT EXISTS idx_student_section ON student(section_id);
CREATE INDEX IF NOT EXISTS idx_session_module ON session(module_id);
CREATE INDEX IF NOT EXISTS idx_session_lecturer ON session(lecturer_id);
CREATE INDEX IF NOT EXISTS idx_session_room ON session(room_id);
CREATE INDEX IF NOT EXISTS idx_session_time_slot ON session(time_slot_id);
CREATE INDEX IF NOT EXISTS idx_conflict_session ON conflict_schedules(session_id);
CREATE INDEX IF NOT EXISTS idx_conflict_related_session ON conflict_schedules(related_session_id);
CREATE INDEX IF NOT EXISTS idx_conflict_time_slot ON conflict_schedules(time_slot_id);
CREATE INDEX IF NOT EXISTS idx_invigilator_lecturer ON invigilator(lecturer_id);
CREATE INDEX IF NOT EXISTS idx_invigilator_session ON invigilator(session_id);
CREATE INDEX IF NOT EXISTS idx_invigilator_room ON invigilator(room_id);
CREATE INDEX IF NOT EXISTS idx_seat_plan_session ON exam_seat_plans(session_id);
CREATE INDEX IF NOT EXISTS idx_seat_plan_student ON exam_seat_plans(student_id);
CREATE INDEX IF NOT EXISTS idx_seat_plan_room ON exam_seat_plans(room_id);

-- Double Booking Prevention: Ensure that a lecturer, room, or section cannot be double-booked for the same time slot.

CREATE UNIQUE INDEX uq_lecturer_schedule
ON session (
    lecturer_id,
    session_date,
    time_slot_id
)
WHERE status = 'scheduled';


-- Prevent room from having two scheduled sessions
-- in the same date and time slot.

CREATE UNIQUE INDEX uq_room_schedule
ON session (
    room_id,
    session_date,
    time_slot_id
)
WHERE status = 'scheduled';