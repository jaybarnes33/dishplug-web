import { firestore } from "@/lib/firebase/client";
import { FoodType } from "@/types";
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./Auth";

interface IProviderProps {
  children: React.ReactNode;
}

export type TItem = FoodType;

interface IContextProps {
  items: TItem[] | null;
  setItems: Dispatch<SetStateAction<TItem[] | null>>;
}

const ItemsContext = createContext<IContextProps | null>(null);

const ItemsProvider = ({ children }: IProviderProps) => {
  const [items, setItems] = useState<TItem[] | null>(null);

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);

  if (!context) {
    throw new Error("`useItems` was called without a Provider");
  }

  return context;
};

export default ItemsProvider;
