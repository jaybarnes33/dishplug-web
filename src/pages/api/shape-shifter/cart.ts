import admin from "@/lib/firebase/node";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; err?: unknown }>
) {
  try {
    const db = admin.firestore();

    const cart = await db.collectionGroup("cart").get();

    cart.forEach(item => {
      console.log(item.data(), item.ref.path);
      db.doc(item.ref.path).set({
        name: item.data().name,
        image: item.data().image,
        price: item.data().price,
        quantity: item.data().quantity,
        store: {
          id: item.data().store_id || "",
          name: item.data().store_name || ""
        }
      });
    });

    res.status(200).json({ message: "updated cart shape successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", err });
  }
}
