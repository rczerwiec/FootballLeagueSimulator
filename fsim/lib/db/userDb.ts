import { eq } from "drizzle-orm";
import { getDb } from "./index";
import { users } from "./schema";
import { newId } from "./helpers";
import { mapUser } from "./mappers";

export async function findUserByFirebaseId(firebaseId: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(users)
    .where(eq(users.firebaseId, firebaseId))
    .limit(1);
  return row ?? null;
}

export async function requireUserByFirebaseId(firebaseId: string) {
  const user = await findUserByFirebaseId(firebaseId);
  if (!user) throw new Error("User not found");
  return user;
}

export async function createUserRecord(body: {
  user: { uid: string; email: string };
  type: string;
}) {
  const db = getDb();
  const id = newId();
  await db.insert(users).values({
    id,
    firebaseId: body.user.uid,
    type: body.type,
    email: body.user.email,
  });
  const row = await findUserByFirebaseId(body.user.uid);
  return mapUser(row!);
}
