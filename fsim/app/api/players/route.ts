import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as playerService from "@/services/playerService";

export const GET = withAuth(async (_req, firebaseUid) => {
  const players = await playerService.getAllUserPlayers(firebaseUid);
  return NextResponse.json(players);
});

export const POST = withAuth(async (request, firebaseUid) => {
  const body = await request.json();
  const response = await playerService.createPlayer(firebaseUid, body);
  return NextResponse.json(response);
});
