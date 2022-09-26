import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";
import "firebase/auth";
import admin from "@/lib/firebase/node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { token: string; message?: string } & Record<string, unknown>
  >
) {
  if (req.method !== "POST") return res.status(404);

  try {
    const { phone, password } = req.body;

    const auth = admin.auth();
    const db = admin.firestore();

    const getAuthUser = phone
      ? auth.getUserByPhoneNumber(phone.replace("0", "+233"))
      : auth.getUserByEmail(email);

    const getStoreUser = db.collection("buyers").where("phone", "==", phone);

    const [, users] = await Promise.all([getAuthUser, getStoreUser]);
    const [user] = (await users.get()).docs;
    const userDoc = user.data();

    if (!userDoc)
      return res.status(400).json({
        token: "",
        message: "Please login at vendor.displug.com to access vendor account"
      });

    const passwordMatch = await compare(password, userDoc.password);

    if (!passwordMatch)
      return res.status(400).json({ token: "", message: "Wrong password" });

    const token = await auth.createCustomToken(user.id);

    res.status(200).json({ token });
  } catch (err) {
    const error = err as any;

    if (error.errorInfo?.code) {
      return res.status(400).json({
        token: "",
        code: error.errorInfo.code,
        get message() {
          return this.code === "auth/user-not-found"
            ? "Phone number or Email doesn't exist, please check and try again"
            : error.errorInfo.message;
        }
      });
    }

    res.status(500).json({ token: "", message: "Something went wrong" });
  }
}
