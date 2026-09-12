export type SectionStatus = "active" | "inactive";

export interface Section
{
    sectionId: string;
    section_code: string;
    programme_id: string;
    module_id: string;
    academic_year: string;
    semester: number;
    student_count: number;
    status: SectionStatus;
    created_at: string;
}

export interface CreateSectionRequest
{
    section_code: string;
    programme_id: string;
    module_id: string;
    academic_year: string;
    semester: number;
    student_count: number;
    status?: SectionStatus;
}

export interface UpdateSectionRequest
{
    section_code?: string;
    programme_id?: string;
    module_id?: string;
    academic_year?: string;
    semester?: number;
    student_count?: number;
    status?: SectionStatus;
}