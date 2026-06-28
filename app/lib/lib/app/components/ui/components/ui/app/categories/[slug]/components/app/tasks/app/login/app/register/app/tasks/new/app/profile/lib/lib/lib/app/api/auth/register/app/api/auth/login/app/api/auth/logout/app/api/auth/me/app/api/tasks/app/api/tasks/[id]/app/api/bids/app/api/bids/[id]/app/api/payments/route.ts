import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { getUserBySession, getTaskById, updateTask, createEscrow, createTransaction, updateUser } from "@/lib/models";

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

  const { taskId, amount, method } = await request.json();

  const task = await getTaskById(taskId);
  if (!task) {
    return NextResponse.json({ error: "Задание не найдено" }, { status: 404 });
  }

  if (task.clientId !== user.id) {
    return NextResponse.json({ error: "Это не ваше задание" }, { status: 403 });
  }

  // Создаём эскроу-транзакцию
  await createEscrow({
    id: randomUUID(),
    taskId,
    clientId: user.id,
    executorId: task.executorId!,
    amount: parseInt(amount),
    status: "held",
    createdAt: new Date().toISOString(),
  });

  // Меняем статус задания
  await updateTask(taskId, { status: "in_progress" });

  // Создаём транзакцию списания у клиента
  await createTransaction({
    id: randomUUID(),
    userId: user.id,
    type: "payment",
    amount: -parseInt(amount),
    description: `Оплата задания: ${task.title}`,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    message: `Оплачено через ${method === "yookassa" ? "ЮKassa" : "Gtpaid"}`,
  });
}
