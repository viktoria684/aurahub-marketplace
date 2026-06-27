import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserBySession, getTaskById, updateTask } from "@/lib/models";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const task = await getTaskById(id);
  if (!task) {
    return NextResponse.json({ error: "Задание не найдено" }, { status: 404 });
  }
  return NextResponse.json(task);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const user = await getUserBySession(sessionToken);
  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { id } = await params;
  const task = await getTaskById(id);
  if (!task) {
    return NextResponse.json({ error: "Задание не найдено" }, { status: 404 });
  }

  const body = await request.json();
  await updateTask(id, body);

  return NextResponse.json({ success: true });
}
