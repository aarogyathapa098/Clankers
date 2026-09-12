export type RoomType = "lecture" | "tutorial" | "lab";

export type RoomStatus = "available" | "occupied" | "maintenance";

export interface Room
{
    roomId: string;
    room_code: string;
    building: string;
    floor: number;
    room_type: RoomType;
    capacity: number;
    exam_capacity: number;
    is_available: boolean;
    resources: Record<string, unknown>;
    status: RoomStatus;
    created_at: string;
}

export interface CreateRoomRequest
{
    room_code: string;
    building: string;
    floor: number;
    room_type: RoomType;
    capacity: number;
    exam_capacity: number;
    is_available: boolean;
    resources: Record<string, unknown>;
    status?: RoomStatus;
}

export interface UpdateRoomRequest
{
    room_code?: string;
    building?: string;
    floor?: number;
    room_type?: RoomType;
    capacity?: number;
    exam_capacity?: number;
    is_available?: boolean;
    resources?: Record<string, unknown>;
    status?: RoomStatus;
}
