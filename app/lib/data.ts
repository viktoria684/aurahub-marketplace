import { Code, Hammer, ClipboardList, Truck, type LucideIcon } from "lucide-react";

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  budget: string;
  location?: string;
  categorySlug: string;
}

export const categories: Category[] = [
  {
    slug: "freelance",
    title: "Фриланс",
    description: "Удалённая работа: дизайн, разработка, копирайтинг, маркетинг и другие цифровые услуги.",
    icon: Code,
    color: "from-blue-500 to-indigo-600",
  },
  {
    slug: "physical",
    title: "Физическая работа",
    description: "Локальные услуги: ремонт, уборка, грузоперевозки, помощь по дому и на участке.",
    icon: Hammer,
    color: "from-orange-500 to-orange-600",
  },
  {
    slug: "logistics",
    title: "Логистика",
    description: "Доставка и перевозки: курьерские услуги, грузоперевозки, экспедирование.",
    icon: Truck,
    color: "from-green-500 to-emerald-600",
  },
  {
    slug: "shift",
    title: "Сменная работа",
    description: "Работа на складах, в логистике и на производстве: комплектовщики, грузчики, операторы линий.",
    icon: ClipboardList,
    color: "from-amber-500 to-orange-600",
  },
];

export const tasks: Task[] = [
  { id: "1", title: "Разработать лендинг для кофейни", description: "Нужен одностраничный сайт с меню, контактами и формой заказа.", budget: "25 000 ₽", categorySlug: "freelance" },
  { id: "2", title: "Написать 10 статей для блога", description: "Темы: финансы, инвестиции. 2000-3000 знаков каждая.", budget: "15 000 ₽", categorySlug: "freelance" },
  { id: "3", title: "Дизайн презентации в Figma", description: "Корпоративная презентация на 15 слайдов.", budget: "8 000 ₽", categorySlug: "freelance" },
  { id: "4", title: "Собрать шкаф-купе", description: "Размер 2.4×2.0 м, инструкция прилагается.", budget: "5 000 ₽", location: "ул. Ленина, 45", categorySlug: "physical" },
  { id: "5", title: "Генеральная уборка квартиры", description: "Двухкомнатная квартира 55 м².", budget: "4 500 ₽", location: "пр. Мира, 23", categorySlug: "physical" },
  { id: "6", title: "Перевезти диван и холодильник", description: "Грузчик + газель на 2 часа.", budget: "3 000 ₽", location: "ул. Советская, 10", categorySlug: "physical" },
  { id: "7", title: "Курьер по городу", description: "Развозить документы и посылки по офисам.", budget: "40 000 ₽/мес", location: "Центральный район", categorySlug: "logistics" },
  { id: "8", title: "Водитель грузового авто", description: "Перевозка строительных материалов.", budget: "80 000 ₽/мес", location: "г. Екатеринбург", categorySlug: "logistics" },
  { id: "9", title: "Доставка товаров", description: "Развоз продуктов питания по магазинам.", budget: "35 000 ₽/мес", location: "ул. Продуктовая, 12", categorySlug: "logistics" },
  { id: "10", title: "Комплектовщик на склад", description: "Сборка заказов по терминалу. Ночная смена.", budget: "55 000 ₽/мес", location: "ул. Заводская, 1", categorySlug: "shift" },
  { id: "11", title: "Грузчик на производство", description: "Погрузка-выгрузка сырья. Сменный график.", budget: "45 000 ₽/мес", location: "промзона Северная", categorySlug: "shift" },
  { id: "12", title: "Оператор конвейерной линии", description: "Контроль работы оборудования.", budget: "50 000 ₽/мес", location: "Индустриальный парк, 12", categorySlug: "shift" },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getTasksByCategory(slug: string): Task[] {
  return tasks.filter((t) => t.categorySlug === slug);
}
