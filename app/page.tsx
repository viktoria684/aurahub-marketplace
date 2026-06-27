import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { categories } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="pattern-grid absolute inset-0 opacity-30" />
        <div className="gradient-hero-light absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Briefcase className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Найди подработку своей мечты
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Тысячи заданий от проверенных клиентов. Работай удалённо, локально
            или посменно — выбирай формат, который подходит тебе.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl w-full px-4 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={`/categories/${category.slug}`}>
                <Card className="card-hover h-full cursor-pointer">
                  <CardHeader>
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold mt-2">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Смотреть задания <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
