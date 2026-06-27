import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation";
import { getUserByEmail, updateUser } from "@/lib/models";
import { verifyPassword, generateSessionToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const parsed = loginSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { error: "Неверный email или пароль" },
      { status: 401 }
    );
  }

  if (user.blocked) {
    return NextResponse.json(
      { error: "Пользователь заблокирован" },
      { status: 403 }
    );
  }

  const valid = verifyPassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Неверный email или пароль" },
      { status: 401 }
    );
  }

  const sessionToken = generateSessionToken();
  await updateUser(user.id, { sessionToken });

  const cookieStore = await cookies();
  cookieStore.set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
}
