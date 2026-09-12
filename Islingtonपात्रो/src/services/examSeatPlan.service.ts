import { supabase } from "../config/supabase";

export class ExamSeatPlanService {

    async generateSeatPlan(
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

        if (session.session_type !== "exam") {
            throw new Error(
                "Seat plan can only be generated for an exam session."
            );
        }

        const sectionIds: string[] =
            session.section_ids || [];

        const { data: students, error: studentError } =
            await supabase
                .from("student")
                .select("*")
                .in("section_id", sectionIds)
                .eq("status", "active");

        if (studentError) {
            throw new Error(studentError.message);
        }

        if (!students || students.length === 0) {
            throw new Error(
                "No students found for this exam."
            );
        }

        const { data: rooms, error: roomError } =
            await supabase
                .from("room")
                .select("*")
                .eq("is_available", true)
                .eq("status", "available")
                .order("exam_capacity", {
                    ascending: false
                });

        if (roomError) {
            throw new Error(roomError.message);
        }

        let remainingStudents = [...students];
        const plans: any[] = [];

        for (const room of rooms || []) {

            if (remainingStudents.length === 0) {
                break;
            }

            const numberOfSeats =
                Math.min(
                    room.exam_capacity,
                    remainingStudents.length
                );

            const studentsForRoom =
                remainingStudents.splice(
                    0,
                    numberOfSeats
                );

            let row = 1;
            let column = 1;

            for (const student of studentsForRoom) {

                const seatNumber =
                    `R${row}-C${column}`;

                plans.push({
                    session_id:
                        sessionId,

                    student_id:
                        student.student_id,

                    room_id:
                        room.room_id,

                    seat_number:
                        seatNumber,

                    row_number:
                        row,

                    column_number:
                        column,

                    allocation_status:
                        "allocated"
                });

                column++;

                if (column > 10) {
                    column = 1;
                    row++;
                }
            }
        }

        if (remainingStudents.length > 0) {

            return {
                success: false,

                message:
                    "Not enough exam room capacity.",

                allocated:
                    plans.length,

                unallocated:
                    remainingStudents.length,

                plans:
                    plans
            };
        }

        const { data, error } =
            await supabase
                .from("exam_seat_plans")
                .insert(plans)
                .select();

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,

            allocated:
                data?.length || 0,

            rooms_used:
                new Set(
                    data?.map(item => item.room_id)
                ).size,

            plans:
                data
        };
    }


    async validateSeatPlan(
        sessionId: string
    ) {

        const { data: plans, error } =
            await supabase
                .from("exam_seat_plans")
                .select("*")
                .eq("session_id", sessionId);

        if (error) {
            throw new Error(error.message);
        }

        const seatSet = new Set<string>();
        const studentSet = new Set<string>();

        const conflicts: string[] = [];

        for (const plan of plans || []) {

            const seatKey =
                `${plan.room_id}-${plan.seat_number}`;

            if (seatSet.has(seatKey)) {

                conflicts.push(
                    `Duplicate seat: ${seatKey}`
                );
            }

            seatSet.add(seatKey);

            if (
                studentSet.has(
                    plan.student_id
                )
            ) {

                conflicts.push(
                    `Student assigned more than once: ${plan.student_id}`
                );
            }

            studentSet.add(
                plan.student_id
            );
        }

        return {
            valid:
                conflicts.length === 0,

            total_assignments:
                plans?.length || 0,

            conflicts:
                conflicts
        };
    }
}