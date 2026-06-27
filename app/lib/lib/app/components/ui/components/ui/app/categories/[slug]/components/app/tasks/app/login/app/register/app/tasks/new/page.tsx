import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NewTaskPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        На главную
      </Link>

      <div className="text-center mb-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-4">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Создать задание</h1>
        <p className="text-muted-foreground mt-2">
          Опишите задачу, и исполнители найдутся
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Название задания</label>
          <input
            type="text"
            placeholder="Например: Разработать лендинг"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Направление</label>
          <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option>Фриланс</option>
            <option>Физическая работа</option>
            <option>Логистика</option>
            <option>Сменная работа</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Описание</label>
          <textarea
            rows={4}
            placeholder="Подробно опишите задачу..."
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Бюджет</label>
            <input
              type="text"
              placeholder="10 000 ₽"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Срок</label>
            <input
              type="date"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
        <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Опубликовать задание
        </button>
      </div>
    </div>
  );
}
