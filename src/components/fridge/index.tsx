import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import Loader from "../loader";
import style from "./fridge.module.css";
import AddFoodForm from "../addFoodForm";
import Container from "../container";

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
	const [showModal, setShowModal] = useState<boolean>(false);

	const loadFridge = async () => {
		if (!fridgeId) return;

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

	useEffect(() => {
		void loadFridge();
	}, [fridgeId]);

	if (!fridge) return <Loader/>;

	return (
		<>
			<Container>
				<h1>{fridge.name}</h1>

							<button
				onClick={() => setShowModal(true)}
			>
				Add New Food Item
			</button>
			{showModal && (
				<div className={style.backdrop}>
					<div className={style.modal}>
						<div className={style.modalHeader}>
						<h2>Add food Item</h2>
						<button
							className={style.closeButton}
							onClick={() => setShowModal(false)}
						>x</button>
					</div>

					<AddFoodForm
						fridgeId={fridge.id}
						onFoodAdded={async () => {
							await loadFridge();
							setShowModal(false);
						}}
					/>
					</div>
				</div>
			)}
				<ul className={style.fridgeContainer}>
						{fridge.food_items.length === 0 && (
							<li>The fridge is empty</li>
						)}

						{fridge.food_items.map((item) => (
							<li key={item.id}>
								{item.name} — {item.share_status}
							</li>
						))}
				</ul>
			</Container>
		</>
	);
}

export default Fridge;