import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as playerService from "@/services/playerService";

export const GET = withAuth(async (_req, _uid, context) => {
  const { playerId } = await context!.params;
  const player = await playerService.getPlayer(playerId);
  return NextResponse.json(player);
});

export const DELETE = withAuth(async (_req, firebaseUid, context) => {
  const { playerId } = await context!.params;
  const player = await playerService.deletePlayer(firebaseUid, playerId);
  return NextResponse.json(player);
});

export const PATCH = withAuth(async (request, _uid, context) => {
  const { playerId } = await context!.params;
  const body = await request.json();
  const player = await playerService.updatePlayer(playerId, body);
  return NextResponse.json(player);
});
