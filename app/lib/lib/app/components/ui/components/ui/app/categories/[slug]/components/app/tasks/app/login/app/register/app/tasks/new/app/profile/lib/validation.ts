import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
  name: z.string().min(1, "Имя обязательно"),
  role: z.enum(["client", "executor"]).default("executor"),
});

export const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(1, "Пароль обязателен"),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Название обязательно").max(200),
  description: z.string().min(1, "Описание обязательно"),
  categorySlug: z.string().min(1, "Категория обязательна"),
  budget: z.string().min(1, "Бюджет обязателен"),
  location: z.string().optional(),
  deadline: z.string().optional(),
});

export const bidSchema = z.object({
  message: z.string().min(1, "Сообщение обязательно"),
});

export const completionSchema = z.object({
  type: z.enum(["file", "photo", "checkin", "checkin_checkout_qr"]),
  content: z.string().min(1, "Результат обязателен"),
});
