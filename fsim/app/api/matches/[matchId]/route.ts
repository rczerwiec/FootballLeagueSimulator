import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as matchService from "@/services/matchService";

export const PATCH = withAuth(async (request, _uid, context) => {
  const { matchId } = await context!.params;
  const body = await request.json();
  const results = await matchService.updateLeagueMatch(matchId, body);
  return NextResponse.json(results);
});
