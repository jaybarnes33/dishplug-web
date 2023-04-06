import { useAuth } from "@/components/Context/Auth";
import React, { useEffect, useState } from "react";

import { TUserOrder } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "@/lib/firebase/client";

const Orders = () => {
  const [orders, setOrders] = useState<TUserOrder[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (user) {
        const ordersRef = collection(firestore, "orders");
        const q = query(ordersRef, where("customer.id", "==", user?.uid));

        onSnapshot(q, snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<TUserOrder, "id">)
          }));
          setOrders(data);
        });
      }
    })();
  }, [user, user?.uid]);

  return (
    <div className="mt-5 pt-5">
      <div className="mt-5">
        {user ? (
          <>
            <h2>Hi, {user?.displayName}</h2>
            <p>Find your orders below</p>

            {!orders.length ? (
              <p>You haven&apos;t made any orders yet</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>To</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.date.toDate().toDateString()}</td>
                      <td>{order.status}</td>
                      <td>{order.deliveryLocation}</td>
                      <td>{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        ) : (
          <p>Please login or sign up to save and retrieve your orders</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
