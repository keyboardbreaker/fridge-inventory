import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import type { FridgeCard } from "../types/fridgeCard";

const useFridges = () => {
    const [loading, setLoading] = useState(true);
    const [fridges, setFridges] = useState<FridgeCard[]>([]);

    useEffect(() => {
        const getFridges = async () => {
            try {
                const { data, error } = await supabase.from("fridges").select(`
                    id,
                    name,
                    food_items (
                        id,
                        created_at
                    )
                `);

                if (error) {
                    console.error(error);
                    return;
                }
                if (data) {
                    const fridgeCards: FridgeCard[] = data.map((fridge) => {
                        const itemCount = fridge.food_items.length;

                        const lastUpdated = fridge.food_items.length > 0 ? 
                            fridge.food_items.reduce((latest, item) => {
                                if (!latest) return item.created_at;

                                return new Date(item.created_at) > new Date(latest)
                                    ? item.created_at
                                    : latest;
                                },
                                null as string | null,
                            ): 
                            null;

                        return {
                            id: fridge.id,
                            name: fridge.name,
                            itemCount,
                            lastUpdated,
                        };
                    });
                    setFridges(fridgeCards);
                }
            } finally {
                setLoading(false);
            }
        }
        getFridges();
    }, []);

    return {
        fridges,
        loading,
    };
};
export default useFridges;
