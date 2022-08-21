import { firestore } from "@/lib/firebase/client";
import type { FoodType } from "@/types";
import {
  collectionGroup,
  FirestoreDataConverter,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

interface IProviderProps {
  children: React.ReactNode;
}

interface IContextProps {
  unavailableFoods: string[];
}

const availabilityConverter: FirestoreDataConverter<
  Pick<FoodType, "available" | "id">
> = {
  toFirestore(food) {
    return food;
  },
  fromFirestore(snapshot) {
    return {
      id: snapshot.id,
      available: snapshot.data().available
    };
  }
};

const AvailabilityContext = createContext<IContextProps | null>(null);

const AvailabilityProvider = ({ children }: IProviderProps) => {
  const [unavailableFoods, setUnavailableFoods] = useState<string[]>([]);

  useEffect(() => {
    const foodsRef = collectionGroup(firestore, "products");

    const availabilityQuery = query(
      foodsRef,
      where("available", "==", false)
    ).withConverter(availabilityConverter);

    const unsubscribe = onSnapshot(availabilityQuery, snapshot => {
      const unavailableFoods = snapshot.docs.map(doc => doc.id);
      setUnavailableFoods(unavailableFoods);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AvailabilityContext.Provider value={{ unavailableFoods }}>
      {children}
    </AvailabilityContext.Provider>
  );
};

export const useAvailability = () => {
  const context = useContext(AvailabilityContext);

  if (!context) {
    throw new Error("`useAvailability` was called without a Provider");
  }

  return context;
};

export default AvailabilityProvider;
