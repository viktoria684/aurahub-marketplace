import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserBySession } from "@/lib/models";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) {
    return NextResponse.json({ user: null });
  }

  const user = await getUserBySession(sessionToken);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      balance: user.balance,
      payoutSchedule: user.payoutSchedule,
      verified: user.verified,
    },
  });
}
