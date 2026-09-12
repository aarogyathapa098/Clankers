export type ConflictType =
    | "ROOM"
    | "LECTURER"
    | "SECTION"
    | "CAPACITY"
    | "AVAILABILITY"
    | "STUDENT"
    | "INVIGILATOR";

export type ConflictSeverity =
    | "low"
    | "medium"
    | "high"
    | "critical";

export interface ConflictSchedule {
    conflict_id: string;

    session_id: string;

    related_session_id: string | null;

    conflict_type: ConflictType;

    conflict_date: string;

    time_slot_id: string | null;

    severity: ConflictSeverity;

    description: string;

    is_resolved: boolean;

    resolved_at: string | null;

    created_at: string;
}

export interface CreateConflictScheduleRequest {
    session_id: string;
    related_session_id?: string | null;
    conflict_type: ConflictType;
    conflict_date: string;
    time_slot_id?: string | null;
    severity: ConflictSeverity;
    description: string;
    is_resolved?: boolean;
}

export interface ResolveConflictRequest {
    is_resolved: boolean;
}