import { createHmac, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "variantmidia_dashboard_session";
const SESSION_DAYS = 30;

function getCredentials() {
  return {
    user: process.env.VARIANTMIDIA_DASHBOARD_USER,
    password: process.env.VARIANTMIDIA_DASHBOARD_PASSWORD,
    secret: process.env.VARIANTMIDIA_DASHBOARD_SESSION_SECRET || process.env.VARIANTMIDIA_DASHBOARD_PASSWORD,
  };
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

function createSession(secret: string) {
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `variantmidia:${expiresAt}`;
  return `${payload}.${sign(payload, secret)}`;
}

function hasValidSession(request: NextRequest, secret?: string) {
  if (!secret) {
    return false;
  }

  const session = request.cookies.get(COOKIE_NAME)?.value;
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

function loginPage(error = false) {
  return new NextResponse(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Variantmidia - Dashboard</title>
<style>
:root { color-scheme: dark; --cyan:#16D4E8; --ink:#101820; --panel:#131C27; --line:rgba(255,255,255,.12); }
* { box-sizing: border-box; }
body { margin:0; min-height:100vh; display:grid; place-items:center; padding:24px; background:radial-gradient(circle at 30% 20%, rgba(22,212,232,.16), transparent 28%), #0b1118; color:#eef6f8; font-family:Arial, sans-serif; }
main { width:min(100%, 390px); border:1px solid var(--line); background:rgba(19,28,39,.92); padding:28px; border-radius:12px; box-shadow:0 24px 80px rgba(0,0,0,.36); }
h1 { margin:0 0 8px; font-size:24px; letter-spacing:.01em; }
p { margin:0 0 24px; color:#aebbc6; line-height:1.45; }
label { display:block; margin:16px 0 7px; color:#d8e5eb; font-size:13px; font-weight:700; }
input { width:100%; height:44px; border:1px solid var(--line); border-radius:8px; background:#0c131b; color:#fff; padding:0 12px; font-size:15px; }
input:focus { outline:2px solid rgba(22,212,232,.42); border-color:var(--cyan); }
button { width:100%; height:46px; margin-top:22px; border:0; border-radius:8px; background:var(--cyan); color:#061016; font-weight:800; cursor:pointer; }
.error { margin:14px 0 0; color:#ffb4b4; font-size:13px; }
</style>
</head>
<body>
<main>
<h1>Dashboard Variantmidia</h1>
<p>Acesso restrito ao painel operacional.</p>
<form method="post">
<label for="user">Nome de usuario</label>
<input id="user" name="user" autocomplete="username" required autofocus>
<label for="password">Senha</label>
<input id="password" name="password" type="password" autocomplete="current-password" required>
<button type="submit">Entrar</button>
${error ? '<div class="error">Usuario ou senha incorretos.</div>' : ""}
</form>
</main>
</body>
</html>`, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}

async function dashboardPage() {
  const html = await readFile(join(process.cwd(), "app", "dashboard", "variantmidia", "dashboard.html"), "utf8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}

export async function GET(request: NextRequest) {
  const { secret } = getCredentials();

  if (!hasValidSession(request, secret)) {
    return loginPage();
  }

  return dashboardPage();
}

export async function POST(request: NextRequest) {
  const { user, password, secret } = getCredentials();
  const form = await request.formData();
  const submittedUser = String(form.get("user") || "");
  const submittedPassword = String(form.get("password") || "");

  if (!user || !password || !secret || submittedUser !== user || submittedPassword !== password) {
    return loginPage(true);
  }

  const response = NextResponse.redirect(new URL("/dashboard/variantmidia", request.url), 303);
  response.cookies.set(COOKIE_NAME, createSession(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/dashboard/variantmidia",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });

  return response;
}
