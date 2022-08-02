import { useAuth } from "@/components/Context/Auth";
import React, { useEffect, useState } from "react";
import { Alert, Container, Table } from "react-bootstrap";
import { TUserOrder } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "@/lib/firebase/client";
const Orders = () => {
  const [orders, setOrders] = useState<TUserOrder[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    (async () => {
      const ordersRef = collection(firestore, "orders");
      const q = query(ordersRef, where("customer.id", "==", user?.uid));

      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<TUserOrder, "id">),
        }));
        setOrders(data);
      });
    })();
  }, [user?.uid]);
  return (
    <div className="mt-5 pt-5">
      <Container className="mt-4">
        <h2>Hi, {user?.displayName}</h2>
        <p>Find your orders below</p>

        {!orders.length ? (
          <Alert variant="danger">You haven&apos;t made any orders yet</Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>To</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.date.toDate().toDateString()}</td>
                  <td>{order.status}</td>
                  <td>{order.deliveryLocation}</td>
                  <td>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default Orders;
