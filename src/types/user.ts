export interface User {
	fridge_id: string;
  user_id: string;
  name: string;
  role: "member" | "admin";
}