import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as tableService from "@/services/tableService";

export const PATCH = withAuth(async (request, _uid, context) => {
  const { leagueId, clubId } = await context!.params;
  const body = await request.json();
  const table = await tableService.updateLeagueClubStats(leagueId, clubId, body);
  return NextResponse.json(table);
});
