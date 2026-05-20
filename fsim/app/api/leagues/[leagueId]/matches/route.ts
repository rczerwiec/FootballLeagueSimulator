import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as leagueService from "@/services/leagueService";

export const GET = withAuth(async (_req, _uid, context) => {
  const { leagueId } = await context!.params;
  const matches = await leagueService.getLeagueMatches(leagueId);
  return NextResponse.json(matches);
});
