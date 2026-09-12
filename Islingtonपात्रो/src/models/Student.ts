export type StudentStatus = "active" | "inactive" | "graduated";

export interface Student
{
    studentId: string;
    student_number: string;
    first_name: string;
    last_name: string;
    email: string;
    programme_id: string;
    section_id: string;
    semester: number;
    status: StudentStatus;
    created_at: string;
}

export interface CreateStudentRequest
{
    student_number: string;
    first_name: string;
    last_name: string;
    email: string;
    programme_id: string;
    section_id: string;
    semester: number;
    status?: StudentStatus;
}

export interface UpdateStudentRequest
{
    student_number?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    programme_id?: string;
    section_id?: string;
    semester?: number;
    status?: StudentStatus;
}