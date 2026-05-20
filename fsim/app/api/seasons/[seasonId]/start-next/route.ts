import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as seasonService from "@/services/seasonService";

export const POST = withAuth(async (request, firebaseUid, context) => {
  const { seasonId } = await context!.params;
  let body: { name?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* empty body is fine */
  }
  try {
    const next = await seasonService.startNextSeason(
      firebaseUid,
      seasonId,
      body?.name
    );
    return NextResponse.json(next);
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Błąd startu sezonu" },
      { status: 400 }
    );
  }
});
