import { firestore } from "@/lib/firebase/client";
import { FoodType } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  writeBatch
} from "firebase/firestore";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { useAuth } from "./Auth";

interface IProviderProps {
  children: React.ReactNode;
}

export type TCart = Omit<FoodType, "description"> & {
  quantity: number;
};

interface IContextProps {
  cart: TCart[] | null;
  itemsInCart: number;
  totalAmount: number;
  addToCart: (item: Omit<TCart, "quantity">) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<IContextProps | null>(null);

const CartProvider = ({ children }: IProviderProps) => {
  const { user } = useAuth();
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cart, setCart] = useState<TCart[] | null>(null);

  useEffect(() => {
    if (user) {
      const buyersRef = collection(firestore, "buyers");
      getDocs(collection(buyersRef, user.uid, "cart"))
        .then(cart => {
          let count = 0;

          const cartData = cart.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as unknown as TCart[];

          setCart(cartData);

          cart.docs.forEach(doc => {
            count += doc.data().quantity;
          });

          return count;
        })
        .then(setItemsInCart);
    }
  }, [user]);

  const removeFromCart = useCallback(
    (id: string) => {
      if (!user) throw new Error("user can't be null");

      setCart(prevCart => {
        if (!prevCart) return null;
        return prevCart.filter(item => item.id !== id);
      });

      const buyersRef = collection(firestore, "buyers");
      deleteDoc(doc(buyersRef, user.uid, "cart", id));
    },
    [user]
  );

  useEffect(() => {
    if (cart) {
      let count = 0;
      let totalAmount = 0;

      cart.forEach(item => {
        count += item.quantity;
        totalAmount += item.price * item.quantity;

        if (!item.quantity) {
          removeFromCart(item.id);
        }
      });

      setTotalAmount(totalAmount);
      setItemsInCart(count);
    }
  }, [cart, removeFromCart]);

  useEffect(() => {
    if (cart && user) {
      const buyersRef = collection(firestore, "buyers");

      cart.forEach(({ id, ...rest }) => {
        setDoc(doc(buyersRef, user.uid, "cart", id), rest);
      });
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

  const clearCart = () => {
    if (!user) throw new Error("User can't be null");

    cart?.forEach(async item => {
      const buyersRef = collection(firestore, "buyers");
      const itemDoc = doc(buyersRef, user.uid, "cart", item.id);
      const batch = writeBatch(firestore);

      batch.delete(itemDoc);
      batch.commit();
    });

    setCart([]);
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
