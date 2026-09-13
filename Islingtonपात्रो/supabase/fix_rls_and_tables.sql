-- ==========================================================
-- Islington Academic Planning System - Supabase Permissions & Missing Tables
-- Execute this script in your Supabase SQL Editor if you wish
-- to allow direct write access using the publishable client key
-- and ensure all 11 required tables exist.
-- ==========================================================

-- 1. Create missing tables if they do not exist

-- Conflict Schedules Table
CREATE TABLE IF NOT EXISTS conflict_schedules (
    conflict_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    related_session_id UUID,
    conflict_type VARCHAR(40) NOT NULL,
    conflict_date DATE NOT NULL,
    time_slot_id UUID,
    severity VARCHAR(20) NOT NULL DEFAULT 'error',
    description TEXT NOT NULL,
    is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Invigilator Table
CREATE TABLE IF NOT EXISTS invigilator (
    invigilator_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lecturer_id UUID,
    session_id UUID,
    room_id UUID,
    duty_role VARCHAR(30) NOT NULL DEFAULT 'support',
    status VARCHAR(20) NOT NULL DEFAULT 'assigned',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Exam Seat Plans Table
CREATE TABLE IF NOT EXISTS exam_seat_plans (
    seat_plan_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    student_id UUID,
    room_id UUID,
    seat_number VARCHAR(20) NOT NULL,
    row_number INTEGER,
    column_number INTEGER,
    allocation_status VARCHAR(20) NOT NULL DEFAULT 'allocated',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Disable Row Level Security on all academic tables
-- This allows the Next.js API layer to read and write without 42501 RLS policy blocks

ALTER TABLE IF EXISTS room DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS lecturer DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS module DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS section DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS student DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS session DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS timeslot DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS time_slots DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS programme DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS conflict_schedules DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS invigilator DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS exam_seat_plans DISABLE ROW LEVEL SECURITY;

-- 3. Grant full permissions to anon and authenticated roles
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
