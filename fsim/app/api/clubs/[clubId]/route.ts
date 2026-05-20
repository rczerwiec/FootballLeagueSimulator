import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/apiHandler";
import * as clubService from "@/services/clubService";

export const GET = withAuth(
  async (_req, _uid, context) => {
    const { clubId } = await context!.params;
    const club = await clubService.getClub(clubId);
    return NextResponse.json(club);
  }
);

export const DELETE = withAuth(
  async (_req, firebaseUid, context) => {
    const { clubId } = await context!.params;
    const club = await clubService.deleteClub(firebaseUid, clubId);
    return NextResponse.json(club);
  }
);

export const PATCH = withAuth(
  async (request, _uid, context) => {
    const { clubId } = await context!.params;
    const body = await request.json();
    const result = await clubService.updateClub(clubId, body);
    return NextResponse.json(result);
  }
);
