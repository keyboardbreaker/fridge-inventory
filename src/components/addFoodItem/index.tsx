import { useState } from "react";
import supabase from "../../../utils/supabase";
type AddFoodModalProps = {
    fridgeId: string;
    onFoodAdded: () => Promise<void>;
};

const AddFoodModal = ({ fridgeId, onFoodAdded }: AddFoodModalProps) => {
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const { data: { user }} = await supabase.auth.getUser();

        // if (!user) {
        //     alert("Please sign in");
        //     return;
        // }

        const { error } = await supabase
            .from("food_items")
            .insert({
                fridge_id: fridgeId,
                owner_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                name,
            });

        if (error) {
            console.error(error);
            return;
        }

        setName("");
        await onFoodAdded();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your food item..."
            />

            <button type="submit">
                Add Food
            </button>
        </form>
    );
}

export default AddFoodModal;