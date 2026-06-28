import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { bidSchema } from "@/lib/validation";
import { getUserBySession, createBid, getBidsByTask, getTaskById, getUserById } from "@/lib/models";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json({ error: "taskId обязателен" }, { status: 400 });
  }

  const bids = await getBidsByTask(taskId);
  return NextResponse.json({ bids });
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

  if (user.role !== "executor") {
    return NextResponse.json({ error: "Только исполнитель может откликаться" }, { status: 403 });
  }

  const parsed = bidSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { taskId, ...data } = parsed.data as any;

  const bid = {
    id: randomUUID(),
    taskId,
    executorId: user.id,
    executorName: user.name,
    message: data.message,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };

  await createBid(bid);

  return NextResponse.json(bid, { status: 201 });
}
