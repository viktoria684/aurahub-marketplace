import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import { categories, getCategoryBySlug } from "@/lib/data";
import { TaskList } from "@/components/task-list";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const Icon = category.icon;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Link>
        <Link
          href="/tasks/new"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Создать задание
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white`}
        >
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {category.title}
          </h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
      </div>

      <TaskList categorySlug={slug} />
    </div>
  );
}
