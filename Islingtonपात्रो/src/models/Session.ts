export type SessionType = "class" | "exam";

export type SessionStatus =
    | "draft"
    | "scheduled"
    | "cancelled"
    | "completed";

export interface Session {
    session_id: string;

    module_id: string;

    lecturer_id: string;

    section_ids: string[];

    room_id: string | null;

    time_slot_id: string;

    session_type: SessionType;

    session_date: string;

    duration_minutes: number;

    is_merged: boolean;

    status: SessionStatus;

    created_at: string;
}

export interface CreateSessionRequest {
    module_id: string;
    lecturer_id: string;
    section_ids: string[];

    room_id?: string | null;

    time_slot_id: string;

    session_type: SessionType;

    session_date: string;

    duration_minutes: number;

    is_merged?: boolean;

    status?: SessionStatus;
}

export interface UpdateSessionRequest {
    module_id?: string;
    lecturer_id?: string;
    section_ids?: string[];
    room_id?: string | null;
    time_slot_id?: string;
    session_type?: SessionType;
    session_date?: string;
    duration_minutes?: number;
    is_merged?: boolean;
    status?: SessionStatus;
}