import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as matchService from "@/services/matchService";

export const GET = withAuth(async (_req, firebaseUid) => {
  const matches = await matchService.getAllFriendlyMatches(firebaseUid);
  return NextResponse.json(matches);
});
