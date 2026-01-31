import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import Loader from "../loader";

type FoodItem = {
  id: string;
  name: string;
  share_status: "private" | "shared" | "ask";
  best_before_date: string | null;
  quantity: number | null;
  unit: string | null;
};

type FridgeWithFood = {
  id: string;
  name: string;
  food_items: FoodItem[];
};

const Fridge = () => {
	const { fridgeId } = useParams<{fridgeId : string}>();
	const [fridge, setFridge] = useState<FridgeWithFood | null> (null);

	useEffect(() => {
		if(!fridgeId) return;

		async function loadFridge() {
			const { data, error } = await supabase
				.from("fridges")
				.select(`
					id,
					name,
					food_items (
						id,
						name,
						share_status,
						best_before_date,
						quantity,
						unit
					),
					created_at
				`)
				.eq("id", fridgeId)
				.single();
			
			if(error) {
				console.error(error);
				return;
			}

			setFridge(data);
		}
		loadFridge();
	}, [fridgeId]);

  if (!fridge) return <Loader/>;

  return (
    <>
      <h1>{fridge.name}</h1>
      <ul>
				{fridge.food_items.length === 0 && (
          <li>No food yet</li>
        )}

				{fridge.food_items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.share_status}
          </li>
        ))}
			</ul>
    </>
  );
}

export default Fridge;