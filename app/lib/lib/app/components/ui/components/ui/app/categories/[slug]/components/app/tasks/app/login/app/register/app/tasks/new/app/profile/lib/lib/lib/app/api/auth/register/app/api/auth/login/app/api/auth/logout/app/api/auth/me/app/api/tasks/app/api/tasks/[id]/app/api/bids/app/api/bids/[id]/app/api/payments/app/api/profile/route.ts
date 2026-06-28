import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserBySession, updateUser } from "@/lib/models";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const user = await getUserBySession(sessionToken);
  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    balance: user.balance,
    payoutSchedule: user.payoutSchedule,
    verified: user.verified,
  });
}

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const user = await getUserBySession(sessionToken);
  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const body = await request.json();
  const allowed = ["name", "payoutSchedule"];
  const updates: Record<string, any> = {};

  for (const key of allowed) {
    if (body[key] !== undefined) {
      updates[key] = body[key];
    }
  }

  await updateUser(user.id, updates);

  return NextResponse.json({ success: true });
}
