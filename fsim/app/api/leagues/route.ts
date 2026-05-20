import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as leagueService from "@/services/leagueService";

export const GET = withAuth(async (_req, firebaseUid) => {
  const leagues = await leagueService.getAllUserLeagues(firebaseUid);
  return NextResponse.json(leagues);
});

export const POST = withAuth(async (request, firebaseUid) => {
  const body = await request.json();
  const league = await leagueService.generateLeague(firebaseUid, body);
  return NextResponse.json(league);
});
