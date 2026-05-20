"use client";

import { isAuthSkipped, SKIP_AUTH_STORAGE_KEY } from "./authConfig";

/** Ensures API sees skip-auth cookie when using local / Pomij mode. */
export function applySkipAuthHeaders(headers: Headers) {
  if (isAuthSkipped() && typeof document !== "undefined") {
    document.cookie = `${SKIP_AUTH_STORAGE_KEY}=1; path=/; max-age=31536000; SameSite=Lax`;
  }
  return headers;
}
