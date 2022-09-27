import admin from "@/lib/firebase/node";
import { FieldPath, FieldValue, Timestamp } from "firebase-admin/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method !== "POST") return res.status(404);

  try {
    const { stores } = req.body;
    const today = new Date();
    const [day] = today.toString().split(" ");
    const [yesterday] = new Date(new Date().setDate(today.getDate() - 1))
      .toString()
      .split(" ");

    const db = admin.firestore();

    await Promise.all([
      db.doc("aggregation/orders").update({
        pendingOrders: FieldValue.increment(1),
        [`pendingOrdersToday.${yesterday}`]: FieldValue.delete(),
        [`pendingOrdersToday.${day}`]: FieldValue.increment(1)
      }),
      stores.forEach((store: string) =>
        db.doc(`aggregation/orders/stores/${store}`).update({
          pendingOrders: FieldValue.increment(1),
          [`pendingOrdersToday.${yesterday}`]: FieldValue.delete(),
          [`pendingOrdersToday.${day}`]: FieldValue.increment(1)
        })
      )
    ]);

    res.status(200).json({ message: "aggregation saved successfully" });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
}
