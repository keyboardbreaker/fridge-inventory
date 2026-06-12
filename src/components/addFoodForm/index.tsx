import { useState } from "react";
import supabase from "../../../utils/supabase";
import style from "./addFoodForm.module.css";
import type { ShareStatus } from "../../types/shareStatus";

type AddFoodFormProps = {
    fridgeId: string;
    onFoodAdded: () => Promise<void>;
};

const AddFoodForm = ({ fridgeId, onFoodAdded }: AddFoodFormProps) => {
    const [name, setName] = useState<string>("");
    const [shareStatus, setShareStatus] = useState<ShareStatus>("private");
    const [bestBeforeDate, setBestBeforeDate] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { data: { user }} = await supabase.auth.getUser();

        if (!user) {
            alert("Please sign in");
            return;
        }

        const { error } = await supabase
            .from("food_items")
            .insert({
                fridge_id: fridgeId,
                owner_id: user.id,
                name,
                share_status: shareStatus,
                best_before_date: bestBeforeDate
            });

        if (error) {
            console.error(error);
            return;
        }

        setName("");
        setShareStatus("private");
        await onFoodAdded();
    }

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your food item..."
            />

            <label>Is this item sharable?
                <select
                    value={shareStatus}
                    onChange={(e) => setShareStatus(e.target.value as ShareStatus)}
                >
                    <option value="private">Private</option>
                    <option value="shared">Shared</option>
                    <option value="ask">Ask</option>
                </select>
            </label>
            <input
                value={bestBeforeDate}
                onChange={(e) => setBestBeforeDate(e.target.value)}
                placeholder="Enter item best before date..."
                type="date"
            />
            <button type="submit">
                Add Food
            </button>
        </form>
    );
}

export default AddFoodForm;