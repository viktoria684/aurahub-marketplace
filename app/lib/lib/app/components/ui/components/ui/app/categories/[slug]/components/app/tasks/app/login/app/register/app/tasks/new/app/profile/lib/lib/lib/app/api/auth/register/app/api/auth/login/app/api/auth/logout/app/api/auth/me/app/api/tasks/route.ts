import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { taskSchema } from "@/lib/validation";
import { getUserBySession, createTask, getTasks } from "@/lib/models";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  const tasks = await getTasks({
    ...(category && { categorySlug: category }),
    ...(status && { status }),
  });

  return NextResponse.json({ tasks });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const user = await getUserBySession(sessionToken);
  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const parsed = taskSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const task = {
    id: randomUUID(),
    ...parsed.data,
    status: "open" as const,
    clientId: user.id,
    createdAt: new Date().toISOString(),
  };

  await createTask(task);

  return NextResponse.json(task, { status: 201 });
}
