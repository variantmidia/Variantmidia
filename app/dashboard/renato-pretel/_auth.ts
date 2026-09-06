import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest } from "next/server";

export const RENATO_COOKIE_NAME = "renato_pretel_dashboard_session";
export const RENATO_DASHBOARD_PATH = "/dashboard/renato-pretel";
export const SESSION_DAYS = 30;

type Credential = {
  user?: string;
  password?: string;
};

function getCredentials(): Credential[] {
  return [
    {
      user: process.env.RENATO_PRETEL_DASHBOARD_USER,
      password: process.env.RENATO_PRETEL_DASHBOARD_PASSWORD,
    },
    {
      user: process.env.VARIANTMIDIA_DASHBOARD_USER,
      password: process.env.VARIANTMIDIA_DASHBOARD_PASSWORD,
    },
  ].filter((item) => item.user && item.password);
}

export function getSessionSecret() {
  return (
    process.env.RENATO_PRETEL_DASHBOARD_SESSION_SECRET ||
    process.env.VARIANTMIDIA_DASHBOARD_SESSION_SECRET ||
    process.env.RENATO_PRETEL_DASHBOARD_PASSWORD ||
    process.env.VARIANTMIDIA_DASHBOARD_PASSWORD
  );
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

export function createSession(secret: string) {
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `renato-pretel:${expiresAt}`;

  return `${payload}.${sign(payload, secret)}`;
}

export function hasValidSession(request: NextRequest) {
  const secret = getSessionSecret();
  if (!secret) {
    return false;
  }

  const session = request.cookies.get(RENATO_COOKIE_NAME)?.value;
  if (!session) {
    return false;
  }

  const signatureStart = session.lastIndexOf(".");
  if (signatureStart === -1) {
    return false;
  }

  const payload = session.slice(0, signatureStart);
  const signature = session.slice(signatureStart + 1);
  const [, expiresAtRaw] = payload.split(":");
  const expiresAt = Number(expiresAtRaw);

  return Number.isFinite(expiresAt) && expiresAt > Date.now() && safeEqual(signature, sign(payload, secret));
}

export function validateLogin(user: string, password: string) {
  return getCredentials().some((credential) => credential.user === user && credential.password === password);
}

