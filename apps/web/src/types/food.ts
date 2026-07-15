import type { ShareStatus } from "./shareStatus";

export interface Food {
  id: string;
  bestBeforeDate?: string;
  name: string;
  ownerId: string;
  shareStatus: ShareStatus;
  sharedWithUserIds?: string[];
  quantity?: number;
  unit?: "pcs" | "ml" | "g";
  notes?: string; // “eg. don’t eat before Friday, leave one egg for baking”
  createdAt: string;
}