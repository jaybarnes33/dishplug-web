import admin from "@/lib/firebase/node";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  try {
    const db = admin.firestore();

    const products = await db.collectionGroup("products").get();

    products.forEach(doc => {
      const [, storeId] = doc.ref.path.split("/");

      db.doc(doc.ref.path).update({
        promo: 0
      });
    });

    res.status(200).json({ message: "updated foods successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
