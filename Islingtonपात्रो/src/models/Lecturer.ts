export type LecturerStatus = "active" | "inactive";

export interface Lecturer
{
    lecturerId: string;
    employee_code: string;
    first_name: string;
    last_name: string;
    email: string;
    department: string;
    max_weekly_hours: number;
    status: LecturerStatus;
    created_at: string;
}

export interface CreateLecturerRequest
{
    employee_code: string;
    first_name: string;
    last_name: string;
    email: string;
    department: string;
    max_weekly_hours: number;
    status?: LecturerStatus;
}

export interface UpdateLecturerRequest
{
    employee_code?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    department?: string;
    max_weekly_hours?: number;
    status?: LecturerStatus;
}