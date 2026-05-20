import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as tableService from "@/services/tableService";

export const GET = withAuth(async (_req, _uid, context) => {
  const { clubId } = await context!.params;
  const table = await tableService.getLeagueClubStats(clubId);
  return NextResponse.json(table);
});
