export type SlotType = "lecture" | "tutorial" | "lab";

export interface TimeSlot
{
    time_slot_id: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    slot_type: SlotType;
    is_available: boolean;
    created_at: string;
}

export interface CreateTimeSlotRequest
{
    day_of_week: number;
    start_time: string;
    end_time: string;
    slot_type: SlotType;
    is_available: boolean;
}

export interface UpdateTimeSlotRequest
{
    day_of_week?: number;
    start_time?: string;
    end_time?: string;
    slot_type?: SlotType;
    is_available?: boolean;
}