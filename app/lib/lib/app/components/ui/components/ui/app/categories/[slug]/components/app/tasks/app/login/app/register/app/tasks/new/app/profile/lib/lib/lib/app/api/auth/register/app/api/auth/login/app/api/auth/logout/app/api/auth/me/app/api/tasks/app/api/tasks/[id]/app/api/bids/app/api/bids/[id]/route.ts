import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserBySession, updateBid, getTaskById, updateTask } from "@/lib/models";

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
  const body = await request.json();

  if (body.status === "accepted") {
    await updateBid(id, { status: "accepted" });
    if (body.taskId) {
      await updateTask(body.taskId, {
        status: "awaiting_payment",
        executorId: body.executorId,
      });
    }
  } else if (body.status === "rejected") {
    await updateBid(id, { status: "rejected" });
  }

  return NextResponse.json({ success: true });
}
