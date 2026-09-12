export type ModuleStatus = "active" | "inactive";

export interface Module
{
    moduleId: string;
    module_code: string;
    module_name: string;
    programme_id: string;
    credit_hours: number;
    weekly_sessions: number;
    duration_minutes: number;
    status: ModuleStatus;
    created_at: string;
}

export interface CreateModuleRequest
{
    module_code: string;
    module_name: string;
    programme_id: string;
    credit_hours: number;
    weekly_sessions: number;
    duration_minutes: number;
    status?: ModuleStatus;
}

export interface UpdateModuleRequest
{
    module_code?: string;
    module_name?: string;
    programme_id?: string;
    credit_hours?: number;
    weekly_sessions?: number;
    duration_minutes?: number;
    status?: ModuleStatus;
}