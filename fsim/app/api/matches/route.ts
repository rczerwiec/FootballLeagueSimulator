import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as matchService from "@/services/matchService";

export const POST = withAuth(async (request, firebaseUid) => {
  const body = await request.json();
  const match = await matchService.createFriendlyMatch(firebaseUid, body);
  return NextResponse.json(match);
});
