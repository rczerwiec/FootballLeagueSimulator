import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as seasonService from "@/services/seasonService";

export const GET = withAuth(async (_req, firebaseUid) => {
  const list = await seasonService.getAllUserSeasons(firebaseUid);
  return NextResponse.json(list);
});

export const POST = withAuth(async (request, firebaseUid) => {
  const body = await request.json();
  try {
    const season = await seasonService.createSeason(firebaseUid, body);
    return NextResponse.json(season);
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Błąd tworzenia sezonu" },
      { status: 400 }
    );
  }
});
