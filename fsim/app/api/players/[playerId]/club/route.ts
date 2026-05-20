import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as playerService from "@/services/playerService";

export const GET = withAuth(async (_req, _uid, context) => {
  const { playerId } = await context!.params;
  const club = await playerService.getPlayerClub(playerId);
  return NextResponse.json(club);
});
