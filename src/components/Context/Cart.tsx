import { firestore } from "@/lib/firebase/client";
import { FoodType } from "@/types";
import type { FirestoreDataConverter } from "firebase/firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  writeBatch
} from "firebase/firestore";
import localforage from "localforage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { useAuth } from "./Auth";
import { useAvailability } from "./Availability";

interface IProviderProps {
  children: React.ReactNode;
}

export type TCart = Omit<FoodType, "rating" | "available" | "description"> & {
  quantity: number;
};

const cartConverter: FirestoreDataConverter<TCart> = {
  toFirestore(item) {
    return {
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      store: {
        id: item.store_id,
        name: item.store_name,
        phone: item.store_phone,
        city: item.store_city
      }
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      name: data.name,
      price: data.price,
      image: data.image,
      quantity: data.quantity,
      store_id: data.store.id,
      store_name: data.store.name,
      store_city: data.store.city,
      store_phone: data.store.phone
    };
  }
};

interface IContextProps {
  cart: TCart[] | null;
  availableItems: TCart[];
  itemsInCart: number;
  totalAmount: number;
  addToCart: (item: Omit<TCart, "quantity">) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: (checkedOutItems: TCart[]) => void;
}

const CartContext = createContext<IContextProps | null>(null);

const CartProvider = ({ children }: IProviderProps) => {
  const { user } = useAuth();
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cart, setCart] = useState<TCart[] | null>(null);
  const [availableItems, setAvailableItems] = useState<TCart[]>([]);
  const { unavailableFoods } = useAvailability();

  // initial local state with firestore
  useEffect(() => {
    let count = 0;

    if (user) {
      const buyersRef = collection(firestore, "buyers");
      getDocs(
        collection(buyersRef, user.uid, "cart").withConverter(cartConverter)
      )
        .then(cart => {
          const cartData = cart.docs.map(doc => doc.data());
          setCart(cartData);

          cart.forEach(doc => {
            count += doc.data().quantity;
          });

          return count;
        })
        .then(setItemsInCart);
    } else {
      localforage
        .getItem<TCart[]>("cart")
        .then(storedCart => {
          storedCart?.forEach(item => {
            count += item.quantity;
          });

          if (storedCart) setCart(storedCart);

          return count;
        })
        .then(setItemsInCart);
    }
  }, [user]);

  const removeFromCart = useCallback(
    (id: string) => {
      const remainingItems = cart ? cart.filter(item => item.id !== id) : null;
      setCart(remainingItems);

      if (user) {
        const buyersRef = collection(firestore, "buyers");
        deleteDoc(
          doc(buyersRef, user.uid, "cart", id).withConverter(cartConverter)
        );
      } else {
        localforage.setItem("cart", remainingItems);
      }
    },
    [user, cart]
  );

  // remove item from cart when quantity reaches 0
  useEffect(() => {
    if (cart) {
      let count = 0;
      let totalAmount = 0;

      cart.forEach(item => {
        count += item.quantity;

        if (!unavailableFoods.includes(item.id)) {
          totalAmount += item.price * item.quantity;
        }

        if (!item.quantity) {
          removeFromCart(item.id);
        }
      });

      setTotalAmount(totalAmount);
      setItemsInCart(count);
    }
  }, [cart, unavailableFoods, removeFromCart]);

  useEffect(() => {
    if (cart) {
      const availableItems = cart.filter(
        item => !unavailableFoods.includes(item.id)
      );
      setAvailableItems(availableItems);
    }
  }, [cart, unavailableFoods]);

  // update firestore with local state
  useEffect(() => {
    if (cart) {
      if (user) {
        const buyersRef = collection(firestore, "buyers");

        cart.forEach(({ id, ...rest }) => {
          setDoc(
            doc(buyersRef, user.uid, "cart", id).withConverter(cartConverter),
            rest
          );
        });
      } else {
        localforage.setItem("cart", cart);
      }
    }
  }, [cart, user]);

  const addToCart = (item: Omit<TCart, "quantity">) => {
    setCart(prevCart => {
      if (!prevCart) return [{ ...item, quantity: 1 }];

      const updatingItem = prevCart.find(({ id }) => id === item.id);

      if (updatingItem) {
        return prevCart.map(existingItem =>
          existingItem.id === updatingItem.id
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : existingItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const clearCart = (checkedOutItems: TCart[]) => {
    if (!cart) {
      throw new Error("Cart can't be null");
    }

    const remainingItems = cart?.filter(
      item => !checkedOutItems.some(({ id }) => id === item.id)
    );

    if (user) {
      checkedOutItems?.forEach(async item => {
        const buyersRef = collection(firestore, "buyers");
        const itemDoc = doc(buyersRef, user.uid, "cart", item.id).withConverter(
          cartConverter
        );
        const batch = writeBatch(firestore);

        batch.delete(itemDoc);
        batch.commit();
      });
    } else {
      localforage.setItem("cart", remainingItems);
    }

    setCart(remainingItems);
  };

  const increment = (id: string) => {
    setCart(prevCart => {
      if (!prevCart) return null;

      return prevCart.map(existingItem =>
        existingItem.id === id
          ? { ...existingItem, quantity: existingItem.quantity + 1 }
          : existingItem
      );
    });
  };

  const decrement = (id: string) => {
    setCart(prevCart => {
      if (!prevCart) return null;

      return prevCart.map(existingItem =>
        existingItem.id === id
          ? { ...existingItem, quantity: existingItem.quantity - 1 }
          : existingItem
      );
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemsInCart,
        addToCart,
        totalAmount,
        availableItems,
        removeFromCart,
        increment,
        decrement,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("`useCart` was called without a Provider");
  }

  return context;
};

export default CartProvider;
