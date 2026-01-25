import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import type { Fridge as FridgeType } from "../../types/fridge";

const Fridge = () => {
	const { fridgeId } = useParams<{fridgeId : string}>();
	const [fridge, setFridge] = useState<FridgeType | null> (null);

	useEffect(() => {
		if(!fridgeId) return;

		async function loadFridge() {
			const { data, error } = await supabase
				.from("fridges")
				.select("id, name, created_at")
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

  if (!fridge) return <p>Loading…</p>;

  return (
    <>
      <h1>{fridge.name}</h1>
      <p>ID: {fridge.id}</p>
    </>
  );
}

export default Fridge;