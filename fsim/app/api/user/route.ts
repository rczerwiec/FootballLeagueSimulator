import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { resolveFirebaseUid } from "@/lib/auth/resolveFirebaseUid";
import * as userService from "@/services/userService";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const auth = await resolveFirebaseUid(request);
    if (auth.ok === false) {
      return NextResponse.json({ message: auth.message }, { status: 200 });
    }
    const body = await request.json();
    const user = await userService.createUser(body);
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
