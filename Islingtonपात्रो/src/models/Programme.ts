export type ProgrammeStatus = "active" | "inactive";

export interface Programme
{
    programmeId: string;
    programme_code: string;
    programme_name: string;
    programme_years: number;
    duration_years: number;
    status: ProgrammeStatus;
    created_at: string;
}

export interface CreateProgrammeRequest {
    programme_code: string;
    programme_name: string;
    duration_years: number;
    status?: ProgrammeStatus;
}

export interface UpdateProgrammeRequest {
    programme_code?: string;
    programme_name?: string;
    duration_years?: number;
    status?: ProgrammeStatus;
}