import { NextApiRequest, NextApiResponse } from "next";
import { genSalt, hash } from "bcryptjs";
import admin from "@/lib/firebase/node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } & Record<string, string>>
) {
  if (req.method !== "POST") return res.status(404);

  try {
    const { uid, name, phone, password, referrer } = req.body;

    const salt = await genSalt(8);
    const hashedPassword = await hash(password, salt);

    const updateUser = admin.auth().updateUser(uid, {
      password,
      displayName: name
    });

    const setRole = admin.auth().setCustomUserClaims(uid, { role: "BUYER" });
    const createUserDoc = admin.firestore().doc(`/buyers/${uid}`).create({
      fullName: name,
      referrer,
      phone,
      password: hashedPassword
    });

    await Promise.all([updateUser, setRole, createUserDoc]);

    console.log("doc", createUserDoc);
    console.log("role", setRole);
    console.log("update", updateUser);
    res.status(200).json({ message: "user created successfully" });
  } catch (err) {
    console.log(err);
    const error = err as any;

    if (error.errorInfo?.code) {
      return res.status(400).json({
        code: error.errorInfo.code,
        get message() {
          return this.code === "auth/user-not-found"
            ? "Phone number doesn't exist, please check and try again"
            : error.errorInfo.message;
        }
      });
    }

    res.status(500).json({ message: "Something went wrong" });
  }
}
