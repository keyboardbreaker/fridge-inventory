import supabase from "./supabaseClient";

const saveNotification = async (
    foodItemId: string,
    profileId: string,
    recipientEmail: string,
    notificationType: string
) => {
    const { error } = await supabase
        .from("notification_history")
        .insert({
            food_item_id: foodItemId,
            profile_id: profileId,
            recipient_email: recipientEmail,
            notification_type: notificationType
        });

        if(error) {
            throw error;
        }

};

export default saveNotification;