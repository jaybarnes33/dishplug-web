import { NextApiRequest, NextApiResponse } from "next";
import { sendSMS } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method !== "POST") return res.status(404);
  console.log(req.method);

  try {
    const { recipients, message } = req.body;
    sendSMS(recipients, message);

    res.status(200).json({ message: "SMS sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
