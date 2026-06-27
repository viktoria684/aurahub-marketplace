import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { registerSchema } from "@/lib/validation";
import { getUserByEmail, createUser } from "@/lib/models";
import { hashPassword, generateSessionToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const parsed = registerSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, password, name, role } = parsed.data;

  const existing = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "Пользователь с таким email уже существует" },
      { status: 409 }
    );
  }

  const passwordHash = hashPassword(password);
  const sessionToken = generateSessionToken();
  const userId = randomUUID();

  await createUser({
    id: userId,
    email,
    passwordHash,
    sessionToken,
    name,
    role,
    balance: 0,
    payoutSchedule: "weekly",
    verified: false,
    verificationDocs: [],
    blocked: false,
  });

  const cookieStore = await cookies();
  cookieStore.set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json(
    { id: userId, email, name, role },
    { status: 201 }
  );
}
