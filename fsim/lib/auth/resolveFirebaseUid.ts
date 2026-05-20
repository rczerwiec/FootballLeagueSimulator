import { NextRequest } from "next/server";
import { verifyFirebaseToken } from "./verifyFirebaseToken";
import {
  isAuthSkippedOnServer,
  DEV_FIREBASE_UID,
  DEV_USER_EMAIL,
} from "./authConfig";
import { findUserByFirebaseId, createUserRecord } from "@/lib/db/userDb";

export type ResolveUidResult =
  | { ok: true; firebaseUid: string }
  | { ok: false; message: string };

async function ensureDevUser() {
  const existing = await findUserByFirebaseId(DEV_FIREBASE_UID);
  if (!existing) {
    await createUserRecord({
      user: { uid: DEV_FIREBASE_UID, email: DEV_USER_EMAIL },
      type: "arcade",
    });
  }
}

export async function resolveFirebaseUid(
  request: NextRequest
): Promise<ResolveUidResult> {
  if (isAuthSkippedOnServer(request)) {
    await ensureDevUser();
    return { ok: true, firebaseUid: DEV_FIREBASE_UID };
  }

  return verifyFirebaseToken(request);
}
