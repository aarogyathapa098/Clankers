import { supabase } from "../config/supabase";
import { ConflictService } from "./conflict.service";

const conflictService = new ConflictService();

export class TimetableService {

    async generateTimetable(
        programmeId?: string,
        semester?: number
    ) {

        const { data: sections, error: sectionError } =
            await supabase
                .from("section")
                .select("*")
                .eq("status", "active");

        if (sectionError) {
            throw new Error(sectionError.message);
        }

        let filteredSections = sections || [];

        if (programmeId) {

            filteredSections =
                filteredSections.filter(
                    section =>
                        section.programme_id === programmeId
                );
        }

        if (semester) {

            filteredSections =
                filteredSections.filter(
                    section =>
                        section.semester === semester
                );
        }

        const { data: modules, error: moduleError } =
            await supabase
                .from("module")
                .select("*")
                .eq("status", "active");

        if (moduleError) {
            throw new Error(moduleError.message);
        }

        const { data: lecturers, error: lecturerError } =
            await supabase
                .from("lecturer")
                .select("*")
                .eq("status", "active");

        if (lecturerError) {
            throw new Error(lecturerError.message);
        }

        const { data: rooms, error: roomError } =
            await supabase
                .from("room")
                .select("*")
                .eq("is_available", true)
                .eq("status", "available");

        if (roomError) {
            throw new Error(roomError.message);
        }

        const { data: slots, error: slotError } =
            await supabase
                .from("time_slots")
                .select("*")
                .eq("slot_type", "class")
                .eq("is_available", true);

        if (slotError) {
            throw new Error(slotError.message);
        }

        const generatedSessions: any[] = [];
        const conflicts: any[] = [];

        const today =
            new Date().toISOString().split("T")[0];

        for (const section of filteredSections) {

            const module =
                modules?.find(
                    item =>
                        item.module_id === section.module_id
                );

            if (!module) {
                continue;
            }

            const lecturer =
                lecturers?.find(
                    item =>
                        item.department
                );

            if (!lecturer) {
                conflicts.push({
                    section_id: section.section_id,
                    type: "LECTURER",
                    message:
                        "No lecturer available for module."
                });

                continue;
            }

            let sessionsRequired =
                module.weekly_sessions;

            for (
                let count = 0;
                count < sessionsRequired;
                count++
            ) {

                let scheduled = false;

                // Try every time slot
                for (const slot of slots || []) {

                    if (scheduled) {
                        break;
                    }

                    // Try every room
                    for (const room of rooms || []) {

                        if (scheduled) {
                            break;
                        }

                        if (
                            room.capacity <
                            section.student_count
                        ) {
                            continue;
                        }

                        const candidate = {
                            module_id:
                                module.module_id,

                            lecturer_id:
                                lecturer.lecturer_id,

                            section_ids: [
                                section.section_id
                            ],

                            room_id:
                                room.room_id,

                            time_slot_id:
                                slot.time_slot_id,

                            session_type:
                                "class",

                            session_date:
                                today,

                            duration_minutes:
                                module.duration_minutes,

                            is_merged:
                                false,

                            status:
                                "scheduled"
                        };

                        const existingConflicts =
                            await conflictService
                                .checkSessionConflict(candidate);

                        if (
                            existingConflicts.length > 0
                        ) {
                            continue;
                        }

                        const { data, error } =
                            await supabase
                                .from("session")
                                .insert(candidate)
                                .select()
                                .single();

                        if (error) {
                            continue;
                        }

                        generatedSessions.push(data);

                        scheduled = true;
                    }
                }

                if (!scheduled) {

                    conflicts.push({
                        section_id:
                            section.section_id,

                        module_id:
                            module.module_id,

                        type:
                            "NO_AVAILABLE_SLOT",

                        message:
                            "Unable to find a conflict-free room and time slot."
                    });
                }
            }
        }

        return {
            sessions_created:
                generatedSessions.length,

            sessions:
                generatedSessions,

            conflicts:
                conflicts
        };
    }


    async validateTimetable() {

        const { data: sessions, error } =
            await supabase
                .from("session")
                .select("*")
                .eq("status", "scheduled");

        if (error) {
            throw new Error(error.message);
        }

        const conflicts: any[] = [];

        for (const session of sessions || []) {

            const sessionConflicts =
                await conflictService
                    .checkSessionConflict(session);

            if (sessionConflicts.length > 0) {

                conflicts.push({
                    session_id:
                        session.session_id,

                    conflicts:
                        sessionConflicts
                });
            }
        }

        return {
            valid:
                conflicts.length === 0,

            conflicts:
                conflicts
        };
    }
}