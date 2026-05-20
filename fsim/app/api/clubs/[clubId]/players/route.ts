import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as clubService from "@/services/clubService";

export const GET = withAuth(async (_req, _uid, context) => {
  const { clubId } = await context!.params;
  const club = await clubService.getAllClubPlayers(clubId);
  return NextResponse.json(club);
});
