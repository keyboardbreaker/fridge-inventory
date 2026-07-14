export interface FoodRow {
  id: string;
  fridge_id: string;
  owner_id: string;
  name: string;
  best_before_date: string | null;
  share_status: "private" | "shared" | "ask";
  quantity: number | null;
  unit: "pcs" | "ml" | "g" | null;
  notes: string | null;
  created_at: string;
}
