export type AllocationStatus =
    | "allocated"
    | "unallocated"
    | "absent";

export interface ExamSeatPlan {
    seat_plan_id: string;

    session_id: string;

    student_id: string;

    room_id: string;

    seat_number: string;

    row_number: number;

    column_number: number;

    allocation_status: AllocationStatus;

    created_at: string;
}

export interface CreateExamSeatPlanRequest {
    session_id: string;

    student_id: string;

    room_id: string;

    seat_number: string;

    row_number: number;

    column_number: number;

    allocation_status?: AllocationStatus;
}

export interface UpdateExamSeatPlanRequest {
    room_id?: string;
    seat_number?: string;
    row_number?: number;
    column_number?: number;
    allocation_status?: AllocationStatus;
}