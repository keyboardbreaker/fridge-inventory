import supabase from "./database";

const getExpiringFood = async () => {
    const { data, error } = await supabase
        .from("food_items")
        .select(`
            name,
            share_status,
            best_before_date,
            owner:profiles!food_items_owner_id_fkey (
                first_name,
                email,
                email_notifications,
                notify_days_before
            ),
            fridge:fridges (
                name
            )
        `);
    if(error) {
        throw error;
    }
    
    return data;
}

export default getExpiringFood;