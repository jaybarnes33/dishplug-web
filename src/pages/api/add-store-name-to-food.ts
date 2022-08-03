import admin from "@/lib/firebase/node";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  try {
    const db = admin.firestore();

    const [stores, products] = await Promise.all([
      db.collection("stores").get(),
      db.collectionGroup("products").get()
    ]);

    products.forEach(doc => {
      const [, storeId] = doc.ref.path.split("/");

      db.doc(doc.ref.path).set({
        name: doc.data().name,
        price: doc.data().price,
        description: doc.data().description,
        image: doc.data().image,
        store_name: stores.docs.find(store => store.id === storeId)?.data().name
      });
    });

    res.status(200).json({ message: "updated foods successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
