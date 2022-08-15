import type { NextApiRequest, NextApiResponse } from "next";
import type { TCart } from "@/components/Context/Cart";
import { sendNotification } from "@/helpers/utils";
import { sendSMS } from "@/utils";
import admin from "@/lib/firebase/node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method !== "POST") return res.status(404);

  try {
    const db = admin.firestore();

    res.status(200).json({ message: "Messages sent" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
