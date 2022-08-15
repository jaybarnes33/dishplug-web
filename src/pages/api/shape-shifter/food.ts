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
      const [, store_id] = doc.ref.path.split("/");
      const data = doc.data();
      const store = stores.docs.find(({ id }) => id === store_id);

      if (!store) throw new Error("store can't be undefined");

      db.doc(doc.ref.path).set({
        name: data.name,
        price: data.price,
        image: data.image,
        available: data.available,
        description: data.description,
        store: {
          id: store.id,
          name: store.data().name,
          contact: store.data().contact
        }
      });
    });

    res.status(200).json({ message: "updated foods successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
