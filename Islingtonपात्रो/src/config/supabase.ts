import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// @ts-ignore
declare module "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is not defined");
}

if (!supabaseKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined");
}

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);