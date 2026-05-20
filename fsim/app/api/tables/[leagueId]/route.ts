import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as tableService from "@/services/tableService";

export const GET = withAuth(async (_req, _uid, context) => {
  const { leagueId } = await context!.params;
  const table = await tableService.getLeagueClubsStats(leagueId);
  return NextResponse.json(table);
});
