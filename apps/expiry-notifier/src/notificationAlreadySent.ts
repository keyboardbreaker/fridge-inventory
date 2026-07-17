import supabase from "./supabaseClient";

const notificationAlreadySent = async (
    foodItemId: string,
    notificationType: string
): Promise<boolean> => {
    const { data, error } = await supabase
        .from("notification_history")
        .select("id")
        .eq("food_item_id", foodItemId)
        .eq("notification_type", notificationType)
        .limit(1);

    if(error) {
        throw error;
    }

    return(data?.length ?? 0) > 0;
};

export default notificationAlreadySent;
