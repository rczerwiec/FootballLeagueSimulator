import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { resolveFirebaseUid } from "@/lib/auth/resolveFirebaseUid";

type AuthenticatedHandler = (
  request: NextRequest,
  firebaseUid: string,
  context?: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

export function withAuth(handler: AuthenticatedHandler) {
  return async (
    request: NextRequest,
    context?: { params: Promise<Record<string, string>> }
  ) => {
    try {
      await connectDB();
      const auth = await resolveFirebaseUid(request);
      if (auth.ok === false) {
        return NextResponse.json({ message: auth.message }, { status: 200 });
      }
      return await handler(request, auth.firebaseUid, context);
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: err instanceof Error ? err.message : "Server error" },
        { status: 500 }
      );
    }
  };
}
