import supabase from "./supabaseClient";
import type { QueryData } from "@supabase/supabase-js";

const query = supabase
    .from("food_items")
    .select(`
        id,
        name,
        share_status,
        best_before_date,
        owner:profiles!food_items_owner_id_fkey (
            id,
            first_name,
            email,
            email_notifications,
            notify_days_before
        ),
        fridge:fridges (
            name
        )
    `);
    
export type ExpiringFood = QueryData<typeof query>[number];

const getExpiringFood = async (): Promise<ExpiringFood[]> => {
    const { data, error } = await query;
    if(error) {
        throw error;
    }
    
    return data;
}

export default getExpiringFood;