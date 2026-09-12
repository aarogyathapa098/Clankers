export type DutyRole = "chief" | "support";

export type InvigilatorStatus =
    | "assigned"
    | "confirmed"
    | "cancelled";

export interface Invigilator {
    invigilator_id: string;

    lecturer_id: string;

    session_id: string;

    room_id: string;

    duty_role: DutyRole;

    status: InvigilatorStatus;

    created_at: string;
}

export interface CreateInvigilatorRequest {
    lecturer_id: string;
    session_id: string;
    room_id: string;
    duty_role: DutyRole;
    status?: InvigilatorStatus;
}

export interface UpdateInvigilatorRequest {
    lecturer_id?: string;
    session_id?: string;
    room_id?: string;
    duty_role?: DutyRole;
    status?: InvigilatorStatus;
}