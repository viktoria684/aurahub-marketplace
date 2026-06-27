import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const hashBuf = scryptSync(password, salt, 64);
  const storedBuf = Buffer.from(hash, "hex");
  return timingSafeEqual(hashBuf, storedBuf);
}

export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}
