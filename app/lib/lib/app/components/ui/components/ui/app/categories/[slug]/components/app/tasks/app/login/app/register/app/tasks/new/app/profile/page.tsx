import Link from "next/link";
import { ArrowLeft, User, Wallet, FileText, Settings } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        На главную
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Личный кабинет</h1>
          <p className="text-muted-foreground">Управляйте своим профилем и заданиями</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Профиль</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Имя, фото, телефон, верификация</p>
          <Link href="/profile/edit" className="text-sm text-primary hover:underline">
            Редактировать →
          </Link>
        </div>

        <div className="rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Кошелёк</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Баланс: 0 ₽</p>
          <Link href="/profile/wallet" className="text-sm text-primary hover:underline">
            Пополнить или вывести →
          </Link>
        </div>

        <div className="rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Мои задания</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Созданные и выполненные задания</p>
          <Link href="/profile/tasks" className="text-sm text-primary hover:underline">
            Смотреть →
          </Link>
        </div>

        <div className="rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Настройки</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">График выплат, уведомления</p>
          <Link href="/profile/settings" className="text-sm text-primary hover:underline">
            Настроить →
          </Link>
        </div>
      </div>
    </div>
  );
}
