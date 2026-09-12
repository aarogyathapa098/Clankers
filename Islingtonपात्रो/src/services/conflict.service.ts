import { supabase } from "../config/supabase";

export class ConflictService {

    async checkSessionConflict(session: any) {

        const conflicts: any[] = [];

        const { data: sessions, error } = await supabase
            .from("session")
            .select("*")
            .eq("session_date", session.session_date)
            .eq("time_slot_id", session.time_slot_id)
            .eq("status", "scheduled");

        if (error) {
            throw new Error(error.message);
        }

        for (const existing of sessions || []) {

            if (
                session.session_id &&
                existing.session_id === session.session_id
            ) {
                continue;
            }

            // Room conflict
            if (
                session.room_id &&
                existing.room_id === session.room_id
            ) {

                conflicts.push({
                    conflict_type: "ROOM",
                    severity: "critical",
                    related_session_id: existing.session_id,
                    description: "Room is already booked for this time slot."
                });
            }

            // Lecturer conflict
            if (
                session.lecturer_id === existing.lecturer_id
            ) {

                conflicts.push({
                    conflict_type: "LECTURER",
                    severity: "critical",
                    related_session_id: existing.session_id,
                    description: "Lecturer is already assigned to another session."
                });
            }

            // Section conflict
            const newSections: string[] =
                session.section_ids || [];

            const existingSections: string[] =
                existing.section_ids || [];

            const sectionOverlap =
                newSections.some(
                    sectionId =>
                        existingSections.includes(sectionId)
                );

            if (sectionOverlap) {

                conflicts.push({
                    conflict_type: "SECTION",
                    severity: "critical",
                    related_session_id: existing.session_id,
                    description: "Section has another session at the same time."
                });
            }
        }

        return conflicts;
    }


    async saveConflicts(
        sessionId: string,
        conflicts: any[],
        sessionDate: string,
        timeSlotId: string
    ) {

        if (conflicts.length === 0) {
            return [];
        }

        const records = conflicts.map(conflict => ({
            session_id: sessionId,
            related_session_id:
                conflict.related_session_id || null,
            conflict_type: conflict.conflict_type,
            conflict_date: sessionDate,
            time_slot_id: timeSlotId,
            severity: conflict.severity,
            description: conflict.description,
            is_resolved: false
        }));

        const { data, error } = await supabase
            .from("conflict_schedules")
            .insert(records)
            .select();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }


    async getAllConflicts() {

        const { data, error } = await supabase
            .from("conflict_schedules")
            .select("*")
            .order("created_at", {
                ascending: false
            });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }


    async resolveConflict(id: string) {

        const { data, error } = await supabase
            .from("conflict_schedules")
            .update({
                is_resolved: true,
                resolved_at: new Date().toISOString()
            })
            .eq("conflict_id", id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}