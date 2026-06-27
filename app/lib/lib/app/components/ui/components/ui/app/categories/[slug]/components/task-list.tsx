import Link from "next/link";
import { MapPin } from "lucide-react";
import { getTasksByCategory } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TaskList({ categorySlug }: { categorySlug: string }) {
  const tasks = getTasksByCategory(categorySlug);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        В этой категории пока нет заданий
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
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
      ))}
    </div>
  );
}
