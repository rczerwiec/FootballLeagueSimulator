import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as playerService from "@/services/playerService";

export const POST = withAuth(async (request, firebaseUid) => {
  const body = await request.json();
  const result = await playerService.createRandomPlayers(
    firebaseUid,
    body.howMuchToGenerate
  );
  return NextResponse.json(result);
});
