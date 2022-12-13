import type { FoodType } from "@/types";
import { useState, useEffect } from "react";

const useFoodsInCity = (foods: FoodType[], city?: string) => {
  const [foodsInCity, setFoodsInCity] = useState(() =>
    foods.filter(food => food?.store_city === city)
  );

  useEffect(() => {
    setFoodsInCity(() => foods.filter(food => food?.store_city === city));
  }, [foods, city]);

  return foodsInCity;
};

export default useFoodsInCity;
