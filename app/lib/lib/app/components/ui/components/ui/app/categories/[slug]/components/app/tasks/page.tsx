import Link from "next/link";
import { MapPin, Plus } from "lucide-react";
import { tasks, categories } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TasksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Все задания</h1>
        <Link
          href="/tasks/new"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Создать задание
        </Link>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => {
          const cat = categories.find((c) => c.slug === task.categorySlug);
          return (
            <Card key={task.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-semibold">
                      {task.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {task.description}
                    </CardDescription>
                    {cat && (
                      <span className="inline-block text-xs text-muted-foreground mt-1">
                        {cat.title}
                      </span>
                    )}
                  </div>
                  <span className="shrink-0 rounded-md bg-secondary px-3 py-1 text-sm font-medium">
                    {task.budget}
                  </span>
                </div>
              </CardHeader>
              {task.location && (
                <CardContent>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {task.location}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
