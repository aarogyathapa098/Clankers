import { supabase } from "../config/supabase";

export class CrudService {

    async getAll(table: string) {

        const { data, error } = await supabase
            .from(table)
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async getById(
        table: string,
        idColumn: string,
        id: string
    ) {

        const { data, error } = await supabase
            .from(table)
            .select("*")
            .eq(idColumn, id)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async create(
        table: string,
        payload: any
    ) {

        const { data, error } = await supabase
            .from(table)
            .insert(payload)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async update(
        table: string,
        idColumn: string,
        id: string,
        payload: any
    ) {

        const { data, error } = await supabase
            .from(table)
            .update(payload)
            .eq(idColumn, id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async delete(
        table: string,
        idColumn: string,
        id: string
    ) {

        const { data, error } = await supabase
            .from(table)
            .delete()
            .eq(idColumn, id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}