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
	owner_id: string;
	owner: {
		first_name: string;
		last_name: string;
	} | null;
};

type FridgeWithFood = {
	id: string;
	name: string;
	food_items: FoodItem[];
};


type FridgeResponse = {
	id: string;
	name: string;
	food_items: {
		id: string;
		name: string;
		share_status: "private" | "shared" | "ask";
		best_before_date: string | null;
		quantity: number | null;
		unit: string | null;
		owner_id: string;
		owner: {
		first_name: string;
		last_name: string;
		};
	}[];
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
					unit,
					owner_id,
					owner:profiles!food_items_owner_id_fkey (
						first_name,
						last_name
					)
				)
			`)
			.eq("id", fridgeId)
			.single<FridgeResponse>();
		
		if(error) {
			console.error(error);
			return;
		}

		const transformedData: FridgeWithFood = {
			...data,
			food_items: data.food_items.map((item) => ({
				...item,
				owner: item.owner ?? null,
			})),
		};

		setFridge(transformedData);
	}

	const deleteFoodItem =  async(foodItemId: string) => {
		const { error } = await supabase
			.from("food_items")
			.delete()
			.eq("id", foodItemId);

		if (error) {
			console.error(error);
			return;
		}

		await loadFridge();
	}

	useEffect(() => {
		void loadFridge();
	}, [fridgeId]);

	if (!fridge) return (
		<Loader/>
	)
	return (
		<>
			<Container>
				<h1>{fridge.name}</h1>

				<button className={style.primaryButton}
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

				<div className={style.fridgeContainer}>
					<table className={style.fridgeTable}>
						<thead>
							<tr style={{ backgroundColor: 'indigo',  }}>
								<th className={style.tableHead}>Name</th>
								<th className={style.tableHead}>Status</th>
								<th className={style.tableHead}>Best before date</th>
								<th className={style.tableHead}>Item Owner</th>
								<th className={style.tableHead}>Delete?</th>
							</tr>
						</thead>
						<tbody>
							{fridge.food_items.length === 0 && (
								<li>The fridge is empty</li>
							)}
							{fridge.food_items.map((item) => (
								<tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
									{/* <td className={style.cellStyle}>{item.id}</td> */}
									<td className={style.cellStyle}>{item.name}</td>
									<td><span className={`${style.badge} ${style[item.share_status]}`}>{item.share_status}</span></td>
									<td className={style.cellStyle}>{item.best_before_date}</td>
									<td>{item.owner ? 
										`${item.owner.first_name} ${item.owner.last_name}`: (<span className={style.unknown}>No owner</span>)}
									</td>
									<td className={style.cellStyle}>
										<button className={style.deleteButton} onClick={() => deleteFoodItem(item.id)}>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Container>
		</>
	);
}

export default Fridge;