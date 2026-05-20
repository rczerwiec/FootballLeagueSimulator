"use client";

import { getClientAuth } from "@/lib/firebase/client";
import { isAuthSkipped, DEV_FIREBASE_UID } from "./authConfig";

export function getActingFirebaseUid(): string | undefined {
  if (isAuthSkipped()) {
    return DEV_FIREBASE_UID;
  }
  return getClientAuth()?.currentUser?.uid;
}
