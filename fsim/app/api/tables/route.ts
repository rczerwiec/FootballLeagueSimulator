import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as tableService from "@/services/tableService";

export const POST = withAuth(async (request) => {
  const body = await request.json();
  const table = await tableService.createNewLeagueClubStats(body);
  return NextResponse.json(table);
});
