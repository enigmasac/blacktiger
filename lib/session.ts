import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "bt-session";
const SECRET = process.env.SESSION_SECRET!;
const MAX_AGE = 60 * 60 * 24 * 30;

export type SessionPayload = {
  customerId: number;
  email: string;
  firstName: string;
  lastName: string;
};

function getKey() {
  return Buffer.from(SECRET, "hex");
}

export function encrypt(payload: SessionPayload): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const json = JSON.stringify(payload);
  const encrypted = Buffer.concat([cipher.update(json, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("hex"), encrypted.toString("hex"), tag.toString("hex")].join(".");
}

export function decrypt(token: string): SessionPayload | null {
  try {
    const [ivHex, dataHex, tagHex] = token.split(".");
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      getKey(),
      Buffer.from(ivHex, "hex")
    );
    decipher.setAuthTag(Buffer.from(tagHex, "hex"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(dataHex, "hex")),
      decipher.final(),
    ]);
    return JSON.parse(decrypted.toString("utf8"));
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return decrypt(token);
}

export function buildSessionCookie(payload: SessionPayload) {
  return {
    name: COOKIE_NAME,
    value: encrypt(payload),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE,
  };
}

export function buildClearCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}
