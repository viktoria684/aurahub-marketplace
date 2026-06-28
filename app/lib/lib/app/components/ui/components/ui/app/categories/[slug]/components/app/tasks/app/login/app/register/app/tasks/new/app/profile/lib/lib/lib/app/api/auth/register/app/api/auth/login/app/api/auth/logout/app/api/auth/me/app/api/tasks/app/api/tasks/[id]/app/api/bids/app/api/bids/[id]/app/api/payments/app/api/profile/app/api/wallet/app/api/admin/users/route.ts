import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserBySession, getAllUsers, updateUser } from "@/lib/models";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const user = await getUserBySession(sessionToken);
  if (!user || user.role !== "client") {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  const users = await getAllUsers();
  return NextResponse.json({ users });
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const user = await getUserBySession(sessionToken);
  if (!user || user.role !== "client") {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  const { userId, blocked } = await request.json();
  await updateUser(userId, { blocked });

  return NextResponse.json({ success: true });
}
