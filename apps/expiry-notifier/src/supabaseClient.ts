import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/database.types";

const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
);

export default supabase;