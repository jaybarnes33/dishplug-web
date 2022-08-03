import { Timestamp } from "firebase/firestore";

export interface FoodType {
  name: string;
  price: number;
  description?: string;
  image: string;
  id: string;
  rating?: number;
  storeId: string;
  store_name: string;
}

export interface VendorType {
  name: string;
  bio: string;
  rating: number;
}

interface IOrder {
  id: string;
  amount: number;
  customer: {
    id: string;
    name: string;
    phone: string;
  };
  date: Timestamp;
  deliveryLocation: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    soldFor: number;
  }[];
  reference: string;
  status: "completed" | "pending" | "failed" | "refunded";
  type: "delivery" | "pickup";
  transaction: string;
  stores: string[];
}
export type TUserOrder = Omit<IOrder, "customer">;
