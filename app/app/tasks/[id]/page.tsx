import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Briefcase } from "lucide-react";
import { tasks } from "@/lib/data";
import { categories } from "@/lib/data";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    notFound();
  }

  const category = categories.find((c) => c.slug === task.categorySlug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link
        href="/tasks"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        К заданиям
      </Link>

      <div className="rounded-xl border p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{task.title}</h1>
            {category && (
              <span className="inline-block text-sm text-muted-foreground mt-1">
                {category.title}
              </span>
            )}
          </div>
          <span className="shrink-0 rounded-md bg-secondary px-3 py-1 text-sm font-medium">
            {task.budget}
          </span>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {task.description}
        </p>

        {task.location && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5" />
            {task.location}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Briefcase className="h-3.5 w-3.5" />
          Статус: Открыто
        </div>
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Откликнуться на задание</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Сопроводительное сообщение</label>
            <textarea
              rows={4}
              placeholder="Расскажите, почему вы подходите для этой задачи..."
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Отправить отклик
          </button>
        </div>
      </div>
    </div>
  );
}
