import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as clubService from "@/services/clubService";

export const GET = withAuth(async (_req, firebaseUid) => {
  const clubs = await clubService.getAllUserClubs(firebaseUid);
  return NextResponse.json(clubs);
});

export const POST = withAuth(async (request, firebaseUid) => {
  const body = await request.json();
  const club = await clubService.createNewClub(firebaseUid, body);
  return NextResponse.json(club);
});
