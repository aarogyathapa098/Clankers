import { supabase } from "../config/supabase";

export class InvigilatorService {

    async generateInvigilators(
        sessionId: string
    ) {

        const { data: session, error: sessionError } =
            await supabase
                .from("session")
                .select("*")
                .eq("session_id", sessionId)
                .single();

        if (sessionError) {
            throw new Error(sessionError.message);
        }

        const { data: rooms, error: roomError } =
            await supabase
                .from("room")
                .select("*")
                .eq("room_id", session.room_id);

        if (roomError) {
            throw new Error(roomError.message);
        }

        const room = rooms?.[0];

        if (!room) {
            throw new Error(
                "Room not found for exam session."
            );
        }

        const { count: studentCount } =
            await supabase
                .from("exam_seat_plans")
                .select("*", {
                    count: "exact",
                    head: true
                })
                .eq("session_id", sessionId);

        const students =
            studentCount || 0;

        const studentsPerInvigilator = 30;

        const required =
            Math.ceil(
                students /
                studentsPerInvigilator
            );

        const { data: lecturers, error: lecturerError } =
            await supabase
                .from("lecturer")
                .select("*")
                .eq("status", "active");

        if (lecturerError) {
            throw new Error(
                lecturerError.message
            );
        }

        const selected =
            (lecturers || [])
                .filter(
                    lecturer =>
                        lecturer.lecturer_id !==
                        session.lecturer_id
                )
                .slice(0, required);

        if (selected.length < required) {

            throw new Error(
                "Not enough lecturers available for invigilation."
            );
        }

        const assignments =
            selected.map(
                (lecturer, index) => ({

                    lecturer_id:
                        lecturer.lecturer_id,

                    session_id:
                        sessionId,

                    room_id:
                        room.room_id,

                    duty_role:
                        index === 0
                            ? "chief"
                            : "support",

                    status:
                        "assigned"
                })
            );

        const { data, error } =
            await supabase
                .from("invigilator")
                .insert(assignments)
                .select();

        if (error) {
            throw new Error(error.message);
        }

        return {
            required:
                required,

            assigned:
                data?.length || 0,

            assignments:
                data
        };
    }
}