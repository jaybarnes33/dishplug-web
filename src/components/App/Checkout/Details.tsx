import { useAuth } from "@/components/Context/Auth";
import { TCart, useCart } from "@/components/Context/Cart";
import {
  currencyFormat,
  sendNotificationToAdmins,
  sendNotificationToVendors
} from "@/helpers/utils";
import { firestore } from "@/lib/firebase/client";
import { IPageProps } from "@/pages/checkout/[path]";
import { referrerdb } from "@/pages/_app";

import axios from "axios";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { usePaystackPayment } from "react-paystack";
import Spinner from "@/components/Core/Spinner";

const Details = ({ details }: IPageProps) => {
  const { user } = useAuth();
  const { replace } = useRouter();
  const [addressInfo, setAddressInfo] = useState(details);
  const { totalAmount, availableItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [referrer, setReferrer] = useState("");
  useEffect(() => {
    referrerdb
      .getItem("referrer")
      .then(val => setReferrer(val as unknown as string));

    const storedDetails = localStorage.getItem("address-info");
    if (storedDetails) {
      setAddressInfo(JSON.parse(storedDetails));
    }
  }, []);
  const discount = referrer ? totalAmount * 0.15 : 0;
  const initializePayment = usePaystackPayment({
    email: addressInfo.email,
    amount: Math.ceil((totalAmount - discount) * 100),
    currency: "GHS",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
  });

  const saveCheckout = async (
    items: TCart[] | null,
    paymentMethod: "online" | "delivery",
    response?: Record<string, string | number>
  ) => {
    try {
      setLoading(true);
      const stores = [
        ...new Set(
          items?.map(item => {
            return {
              id: item.store_id,
              phone: item.store_phone,
              name: item.store_name
            };
          })
        )
      ];

      const payload: Record<string, unknown> = {
        status: "pending",
        amount: totalAmount,
        customer: {
          id: user?.uid || "anon",
          name: addressInfo.name,
          phone: addressInfo.phone,
          email: addressInfo.email
        },
        deliveryLocation: addressInfo.location,
        date: Timestamp.now(),
        items: items?.map(item => ({
          id: item.id,
          name: item.name,
          soldFor: item.price,
          quantity: item.quantity,
          store_id: item.store_id
        })),
        referredBy: referrer,
        paid: paymentMethod === "online",
        paymentOnDelivery: paymentMethod === "delivery",
        type: "delivery",
        stores: stores.map(store => store.id)
      };

      if (response) {
        payload.reference = response.reference;
        payload.transaction = response.transaction;
      }

      await Promise.all([
        addDoc(collection(firestore, "orders"), payload),
        fetch("/api/aggregate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ stores: stores.map(({ id }) => id) })
        })
      ]);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { paymentMethod: _, ...rest } = addressInfo;
      localStorage.setItem("order-details", JSON.stringify(rest));

      clearCart(availableItems);

      stores.forEach(store =>
        sendNotificationToVendors({
          name: addressInfo.name,
          phone: addressInfo.phone,
          paid: false,
          location: addressInfo.location,
          topic: `${store.id}-new_order`,
          items:
            (items || [])
              .filter(item => item.store_id === store.id)
              .map(item => item.name) || []
        })
      );

      sendNotificationToAdmins({
        name: addressInfo.name,
        phone: addressInfo.phone,
        paid: false,
        location: addressInfo.location,
        stores: stores.map(store => ({ id: store.id, name: store.name })),
        items: (items || []).map(item => item.name) || []
      });

      axios.post("/api/send-messages", {
        recipients: [addressInfo.phone],
        message: `Hi ${addressInfo.name}, your order has been received, your food will be delivered in no time`
      });

      axios.post("/api/send-messages", {
        recipients: stores.map(store => store.phone),
        message: `An order has been made to your store, please check your dashboard`
      });
      referrerdb.removeItem("referrer");
      replace("/success");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSuccess = (
    response: Record<string, string | number>,
    items: TCart[] | null
  ) => {
    saveCheckout(items, "online", response);
  };

  const checkoutWithoutPayment = async (items: TCart[] | null) => {
    saveCheckout(items, "delivery");
  };

  const onClose = () => {
    console.log("closed");
  };

  return (
    <div>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="flex flex-col">
        <div>
          <div>
            <div className="border-b">
              <h2 className="text-xl font-bold">Customer Details</h2>
              <div>
                <strong className={"font-semibold"}>Delivery Location: </strong>{" "}
                {addressInfo.location}
              </div>
              <div>
                <strong className={"font-semibold"}>Contact Info: </strong>{" "}
                {addressInfo.phone} {addressInfo.email},
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg mt-2">Order(s)</h2>
              {availableItems?.length === 0 ? (
                <p>Your Cart is empty</p>
              ) : (
                <div>
                  {availableItems?.map((item, index) => (
                    <div className="border-t" key={index}>
                      <div className="flex items-center gap-1 m-1 ">
                        <Image
                          src={item.image || ""}
                          alt={item.name}
                          width={25}
                          height={25}
                          style={{ maxWidth: "30px" }}
                        />

                        <div>
                          <Link href={`/product/${item.id}`}>{item.name}</Link>
                        </div>
                        <div>
                          {item.quantity} x {item.price} = GH₵
                          {item.quantity * item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-xl font-bold mt-2">Order Summary</h2>
          </div>

          <div className="flex gap-3">
            <text>Sub Total</text>
            <text>{currencyFormat(totalAmount)}</text>
          </div>

          {referrer && (
            <div className="flex gap-3">
              <text className="font-semibold">Discount</text>
              <text>{currencyFormat(discount)}</text>
            </div>
          )}

          <div className="flex gap-3">
            <text className={"font-semibold"}>Total</text>
            <text>{currencyFormat(totalAmount - discount)}</text>
          </div>

          <div className="w-full pt-2">
            {addressInfo.paymentMethod === "online" && (
              <button
                type="button"
                className="bg-primary hover:bg-primary2 flex gap-3 justify-center py-1 px-2 rounded text-neutral-100 w-full"
                disabled={availableItems.length === 0}
                onClick={() =>
                  initializePayment(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    (res: Record<string, string>) =>
                      onSuccess(res, availableItems),
                    onClose
                  )
                }
              >
                Place Order {loading && <Spinner />}
              </button>
            )}
            {addressInfo.paymentMethod === "delivery" && (
              <button
                type="button"
                disabled={availableItems.length === 0}
                className="bg-primary hover:bg-primary2 flex gap-3 justify-center py-1 px-2 rounded text-neutral-100"
                onClick={() => checkoutWithoutPayment(availableItems)}
              >
                Place Order {loading && <Spinner />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
