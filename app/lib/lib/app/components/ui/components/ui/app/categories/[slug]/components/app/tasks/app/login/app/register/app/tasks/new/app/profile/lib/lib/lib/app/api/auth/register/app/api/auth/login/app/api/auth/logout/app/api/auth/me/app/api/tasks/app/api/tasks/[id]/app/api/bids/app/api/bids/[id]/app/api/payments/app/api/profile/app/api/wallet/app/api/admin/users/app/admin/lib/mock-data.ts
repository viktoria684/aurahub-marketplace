import { User, Task, Bid } from "./models";

export const mockUsers: User[] = [
  {
    id: "admin-1",
    email: "admin@aurahub.com",
    passwordHash: "",
    sessionToken: "",
    name: "Администратор",
    role: "client",
    balance: 0,
    payoutSchedule: "weekly",
    verified: true,
    verificationDocs: [],
    blocked: false,
  },
];

export const mockTasks: Task[] = [
  {
    id: "mock-1",
    title: "Разработать лендинг для кофейни",
    description: "Нужен одностраничный сайт с меню, контактами и формой заказа.",
    categorySlug: "freelance",
    budget: "25 000 ₽",
    status: "open",
    clientId: "admin-1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-2",
    title: "Собрать шкаф-купе",
    description: "Размер 2.4×2.0 м, инструкция прилагается.",
    categorySlug: "physical",
    budget: "5 000 ₽",
    location: "ул. Ленина, 45",
    status: "open",
    clientId: "admin-1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-3",
    title: "Курьер по городу",
    description: "Развозить документы и посылки по офисам.",
    categorySlug: "logistics",
    budget: "40 000 ₽/мес",
    location: "Центральный район",
    status: "open",
    clientId: "admin-1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-4",
    title: "Комплектовщик на склад",
    description: "Сборка заказов по терминалу. Ночная смена.",
    categorySlug: "shift",
    budget: "55 000 ₽/мес",
    location: "ул. Заводская, 1",
    status: "open",
    clientId: "admin-1",
    createdAt: new Date().toISOString(),
  },
];
