import type { NextRequest } from "next/server";

export const SKIP_AUTH_STORAGE_KEY = "fsm_skip_auth";

/** Set NEXT_PUBLIC_SKIP_AUTH=true in .env.local to bypass login entirely. */
export function isAuthSkippedFromEnv(): boolean {
  return process.env.NEXT_PUBLIC_SKIP_AUTH === "true";
}

export function isAuthSkippedOnServer(request?: NextRequest): boolean {
  if (isAuthSkippedFromEnv()) return true;
  if (request?.cookies.get(SKIP_AUTH_STORAGE_KEY)?.value === "1") {
    return true;
  }
  return false;
}

/** Client-only: env skip or user chose "Pomiń" (localStorage). */
export function isAuthSkipped(): boolean {
  if (isAuthSkippedFromEnv()) return true;
  if (typeof window !== "undefined") {
    return localStorage.getItem(SKIP_AUTH_STORAGE_KEY) === "1";
  }
  return false;
}

export function enableSkipAuthClient() {
  if (typeof window === "undefined") return;
  localStorage.setItem(SKIP_AUTH_STORAGE_KEY, "1");
  document.cookie = `${SKIP_AUTH_STORAGE_KEY}=1; path=/; max-age=31536000; SameSite=Lax`;
}

export const DEV_FIREBASE_UID =
  process.env.NEXT_PUBLIC_DEV_FIREBASE_UID || "local-dev-user";

export const DEV_USER_EMAIL =
  process.env.NEXT_PUBLIC_DEV_USER_EMAIL || "dev@local.app";
