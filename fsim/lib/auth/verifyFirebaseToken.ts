import { NextRequest } from "next/server";
import admin from "@/lib/firebase/admin";

export type AuthResult =
  | { ok: true; firebaseUid: string }
  | { ok: false; message: string };

export async function verifyFirebaseToken(
  request: NextRequest
): Promise<AuthResult> {
  const token = request.headers.get("authorization");

  if (!token) {
    return { ok: false, message: "Authorization error!" };
  }

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      return { ok: true, firebaseUid: decodeValue.uid };
    }
    return { ok: false, message: "Authorization..." };
  } catch {
    return { ok: false, message: "Authorization error!" };
  }
}
