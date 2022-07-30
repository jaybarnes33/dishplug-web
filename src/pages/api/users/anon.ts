import { NextApiRequest, NextApiResponse } from "next";
import admin from "@/lib/firebase/node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { token: string; message?: string } & Record<string, unknown>
  >
) {
  if (req.method !== "GET") return res.status(404);

  try {
    const uid = req.query.uid as string | undefined;
    const auth = admin.auth();

    if (!uid)
      return res.status(400).json({ token: "", message: "Missing uid" });

    const user = await auth.getUser(uid);
    if (user.providerData.length)
      return res.status(400).json({ token: "", message: "User not anonymous" });

    const token = await auth.createCustomToken(uid);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ token: "", message: "Something went wrong" });
  }
}
