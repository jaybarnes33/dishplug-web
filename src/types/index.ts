import { Timestamp } from "firebase/firestore";

export interface FoodType {
  name: string;
  price: number;
  description?: string;
  image: string;
  id: string;
  rating?: number;
  available: boolean;
  store_id: string;
  store_name: string;
  store_city: string;
  store_phone: string;
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
    store: {
      id: string;
      name: string;
      city: string;
      contact: string;
    };
  }[];
  reference: string;
  status: "completed" | "pending" | "failed" | "refunded";
  type: "delivery" | "pickup";
  transaction: string;
  stores: string[];
}
export type TUserOrder = Omit<IOrder, "customer">;

export interface StoreType {
  city: string;
  contact: string;
  id: string;
  name: string;
  owner: {
    contact: string;
    name: string;
    uid: string;
  };
}
