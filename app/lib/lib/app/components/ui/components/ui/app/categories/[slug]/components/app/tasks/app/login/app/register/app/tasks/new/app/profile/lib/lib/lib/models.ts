import { docClient } from "./db";
import { TableName } from "./schema";
import { GetCommand, PutCommand, QueryCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  sessionToken: string;
  name: string;
  role: "client" | "executor";
  balance: number;
  payoutSchedule: "daily" | "weekly";
  verified: boolean;
  verificationDocs: string[];
  blocked: boolean;
  createdAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  categorySlug: string;
  budget: string;
  location?: string;
  deadline?: string;
  status: "open" | "in_progress" | "awaiting_payment" | "completed" | "cancelled";
  clientId: string;
  executorId?: string;
  createdAt: string;
}

export interface Bid {
  id: string;
  taskId: string;
  executorId: string;
  executorName: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface EscrowTransaction {
  id: string;
  taskId: string;
  clientId: string;
  executorId: string;
  amount: number;
  status: "held" | "released" | "refunded";
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "deposit" | "withdrawal" | "payment" | "commission" | "release";
  amount: number;
  description: string;
  createdAt: string;
}

// Users
export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.USERS,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: { ":email": email },
    })
  );
  return (result.Items?.[0] as User) ?? null;
}

export async function getUserBySession(sessionToken: string): Promise<User | null> {
  const result = await docClient.send(
    new ScanCommand({
      TableName: TableName.USERS,
      FilterExpression: "sessionToken = :token",
      ExpressionAttributeValues: { ":token": sessionToken },
    })
  );
  return (result.Items?.[0] as User) ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.USERS,
      Key: { id },
    })
  );
  return (result.Item as User) ?? null;
}

export async function createUser(user: User): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TableName.USERS,
      Item: { ...user, createdAt: new Date().toISOString() },
    })
  );
}

export async function updateUser(id: string, updates: Partial<User>): Promise<void> {
  const keys = Object.keys(updates);
  const expressions = keys.map((k, i) => `#${k} = :val${i}`);
  const attrNames = keys.reduce((acc, k) => ({ ...acc, [`#${k}`]: k }), {});
  const attrValues = keys.reduce((acc, k, i) => ({ ...acc, [`:val${i}`]: (updates as any)[k] }), {});

  await docClient.send(
    new UpdateCommand({
      TableName: TableName.USERS,
      Key: { id },
      UpdateExpression: `SET ${expressions.join(", ")}`,
      ExpressionAttributeNames: attrNames,
      ExpressionAttributeValues: attrValues,
    })
  );
}

export async function getAllUsers(): Promise<User[]> {
  const result = await docClient.send(
    new ScanCommand({ TableName: TableName.USERS })
  );
  return (result.Items ?? []) as User[];
}

// Tasks
export async function createTask(task: Task): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TableName.TASKS,
      Item: task,
    })
  );
}

export async function getTasks(filter?: { categorySlug?: string; status?: string }): Promise<Task[]> {
  let result;
  if (filter?.categorySlug) {
    result = await docClient.send(
      new QueryCommand({
        TableName: TableName.TASKS,
        IndexName: "categorySlug-index",
        KeyConditionExpression: "categorySlug = :slug",
        ExpressionAttributeValues: { ":slug": filter.categorySlug },
      })
    );
  } else {
    result = await docClient.send(
      new ScanCommand({ TableName: TableName.TASKS })
    );
  }
  let tasks = (result.Items ?? []) as Task[];
  if (filter?.status) {
    tasks = tasks.filter((t) => t.status === filter.status);
  }
  return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getTaskById(id: string): Promise<Task | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.TASKS,
      Key: { id },
    })
  );
  return (result.Item as Task) ?? null;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<void> {
  const keys = Object.keys(updates);
  const expressions = keys.map((k, i) => `#${k} = :val${i}`);
  const attrNames = keys.reduce((acc, k) => ({ ...acc, [`#${k}`]: k }), {});
  const attrValues = keys.reduce((acc, k, i) => ({ ...acc, [`:val${i}`]: (updates as any)[k] }), {});

  await docClient.send(
    new UpdateCommand({
      TableName: TableName.TASKS,
      Key: { id },
      UpdateExpression: `SET ${expressions.join(", ")}`,
      ExpressionAttributeNames: attrNames,
      ExpressionAttributeValues: attrValues,
    })
  );
}

// Bids
export async function createBid(bid: Bid): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TableName.BIDS,
      Item: bid,
    })
  );
}

export async function getBidsByTask(taskId: string): Promise<Bid[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.BIDS,
      IndexName: "taskId-index",
      KeyConditionExpression: "taskId = :taskId",
      ExpressionAttributeValues: { ":taskId": taskId },
    })
  );
  return (result.Items ?? []) as Bid[];
}

export async function updateBid(id: string, updates: Partial<Bid>): Promise<void> {
  const keys = Object.keys(updates);
  const expressions = keys.map((k, i) => `#${k} = :val${i}`);
  const attrNames = keys.reduce((acc, k) => ({ ...acc, [`#${k}`]: k }), {});
  const attrValues = keys.reduce((acc, k, i) => ({ ...acc, [`:val${i}`]: (updates as any)[k] }), {});

  await docClient.send(
    new UpdateCommand({
      TableName: TableName.BIDS,
      Key: { id },
      UpdateExpression: `SET ${expressions.join(", ")}`,
      ExpressionAttributeNames: attrNames,
      ExpressionAttributeValues: attrValues,
    })
  );
}

// Escrow
export async function createEscrow(escrow: EscrowTransaction): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TableName.ESCROW,
      Item: escrow,
    })
  );
}

export async function getEscrowByTask(taskId: string): Promise<EscrowTransaction | null> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.ESCROW,
      IndexName: "taskId-index",
      KeyConditionExpression: "taskId = :taskId",
      ExpressionAttributeValues: { ":taskId": taskId },
    })
  );
  return (result.Items?.[0] as EscrowTransaction) ?? null;
}

export async function updateEscrow(id: string, updates: Partial<EscrowTransaction>): Promise<void> {
  const keys = Object.keys(updates);
  const expressions = keys.map((k, i) => `#${k} = :val${i}`);
  const attrNames = keys.reduce((acc, k) => ({ ...acc, [`#${k}`]: k }), {});
  const attrValues = keys.reduce((acc, k, i) => ({ ...acc, [`:val${i}`]: (updates as any)[k] }), {});

  await docClient.send(
    new UpdateCommand({
      TableName: TableName.ESCROW,
      Key: { id },
      UpdateExpression: `SET ${expressions.join(", ")}`,
      ExpressionAttributeNames: attrNames,
      ExpressionAttributeValues: attrValues,
    })
  );
}

// Transactions
export async function createTransaction(tx: Transaction): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TableName.TRANSACTIONS,
      Item: tx,
    })
  );
}

export async function getTransactionsByUser(userId: string): Promise<Transaction[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.TRANSACTIONS,
      IndexName: "userId-index",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": userId },
    })
  );
  return ((result.Items ?? []) as Transaction[]).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Admin Settings
export async function getAdminSettings(): Promise<Record<string, any>> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.ADMIN_SETTINGS,
      Key: { id: "settings" },
    })
  );
  return (result.Item as Record<string, any>) ?? { commission: 15, payoutSchedules: ["daily", "weekly"] };
}

export async function updateAdminSettings(settings: Record<string, any>): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TableName.ADMIN_SETTINGS,
      Item: { id: "settings", ...settings },
    })
  );
}
