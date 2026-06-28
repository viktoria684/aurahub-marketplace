import Link from "next/link";
import { ArrowLeft, Shield, Users, FileText, Settings, BarChart3, CreditCard } from "lucide-react";

export default function AdminPage() {
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
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Админ-панель</h1>
          <p className="text-muted-foreground">Управление платформой AuraHub</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Пользователи</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Просмотр, блокировка, верификация</p>
          <Link href="/admin/users" className="text-sm text-primary hover:underline">
            Управлять →
          </Link>
        </div>

        <div className="rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Заказы</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Все заказы, отмена, споры</p>
          <Link href="/admin/orders" className="text-sm text-primary hover:underline">
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
          <p className="text-sm text-muted-foreground mb-4">Комиссия, график выплат</p>
          <Link href="/admin/settings" className="text-sm text-primary hover:underline">
            Настроить →
          </Link>
        </div>

        <div className="rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Платежи</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">ЮKassa, Gtpaid, API-ключи</p>
          <Link href="/admin/payments" className="text-sm text-primary hover:underline">
            Настроить →
          </Link>
        </div>

        <div className="rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Аналитика</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Оборот, комиссия, выплаты</p>
          <Link href="/admin/analytics" className="text-sm text-primary hover:underline">
            Смотреть →
          </Link>
        </div>
      </div>
    </div>
  );
}
