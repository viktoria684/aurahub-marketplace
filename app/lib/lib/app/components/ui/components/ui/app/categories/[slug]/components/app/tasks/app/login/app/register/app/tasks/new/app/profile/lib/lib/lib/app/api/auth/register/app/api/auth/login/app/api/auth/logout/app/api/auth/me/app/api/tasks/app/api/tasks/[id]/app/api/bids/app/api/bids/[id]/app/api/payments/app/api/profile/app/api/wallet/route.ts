import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserBySession, getTransactionsByUser } from "@/lib/models";

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

  const transactions = await getTransactionsByUser(user.id);

  return NextResponse.json({
    balance: user.balance,
    transactions,
  });
}
