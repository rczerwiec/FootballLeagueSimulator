import { randomUUID } from "crypto";

export function newId(): string {
  return randomUUID();
}

export function withMongoId(row: { id: string; [key: string]: unknown }) {
  const { id, ...rest } = row;
  return { ...rest, _id: id };
}

// Drizzle insert types omit optional columns — use for .values()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function insertRow<T extends Record<string, unknown>>(row: T): any {
  return row;
}

export function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
