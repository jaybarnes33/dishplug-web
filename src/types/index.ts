export interface FoodType {
  name: string;
  price: number;
  description?: string;
  rating: number;
  image: string;
  id: string;
  storeId: string;
}

export interface VendorType {
  name: string;
  bio: string;
  rating: number;
}
