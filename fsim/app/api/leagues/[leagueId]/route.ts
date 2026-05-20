import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as leagueService from "@/services/leagueService";

export const PATCH = withAuth(async (request, firebaseUid, context) => {
  const { leagueId } = await context!.params;
  const body = await request.json();
  try {
    const updated = await leagueService.updateLeagueProgression(
      firebaseUid,
      leagueId,
      body
    );
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      {
        message:
          err instanceof Error ? err.message : "Błąd aktualizacji ligi",
      },
      { status: 400 }
    );
  }
});
