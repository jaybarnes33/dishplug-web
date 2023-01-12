import type { FoodType } from "@/types";
import { useLocation } from "@/components/Context/Location";
import { useState, useEffect } from "react";

export const useMealsByLocation = (foods: FoodType[]) => {
  const { location } = useLocation();
  const [foodsInCity, setFoodsInCity] = useState<FoodType[]>([]);

  useEffect(() => {
    setFoodsInCity(() =>
      foods.sort((a, b) =>
        !b.available
          ? 0
          : a.store_city === location && b.store_city === location
          ? 0
          : a.store_city === location && b.store_city !== location
          ? -1
          : 1
      )
    );
  }, [foods, location]);

  return foodsInCity;
};
