import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import {
  RENATO_COOKIE_NAME,
  RENATO_DASHBOARD_PATH,
  SESSION_DAYS,
  createSession,
  getSessionSecret,
  hasValidSession,
  validateLogin,
} from "./_auth";

function loginPage(error = false) {
  return new NextResponse(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Relatorio Renato Pretel | Variantmidia</title>
<style>
:root { color-scheme: light; --cyan:#16D4E8; --cyan-deep:#0FB8CC; --ink:#101820; --muted:#6A6A60; --line:#E6EEF2; --bg:#F2F4F1; --surface:#FFFFFF; }
* { box-sizing:border-box; }
body { margin:0; min-height:100vh; display:grid; place-items:center; padding:24px; background:linear-gradient(135deg,#F2F4F1,#F7FAFA 52%,#EFF4F6); color:var(--ink); font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
main { width:min(100%,420px); border:1px solid var(--line); background:rgba(255,255,255,.94); padding:30px; border-radius:8px; box-shadow:0 30px 70px -46px rgba(16,24,32,.42); }
.mark { width:42px; height:42px; margin-bottom:22px; background:var(--cyan); clip-path:polygon(0 0,50% 54%,100% 0,100% 26%,50% 84%,0 26%); }
h1 { margin:0 0 8px; font-size:25px; line-height:1.05; letter-spacing:0; }
p { margin:0 0 24px; color:var(--muted); line-height:1.45; }
label { display:block; margin:16px 0 7px; color:var(--ink); font-size:13px; font-weight:800; }
input { width:100%; height:45px; border:1px solid var(--line); border-radius:8px; background:#fff; color:var(--ink); padding:0 12px; font-size:15px; }
input:focus { outline:2px solid rgba(22,212,232,.42); border-color:var(--cyan); }
button { width:100%; height:47px; margin-top:22px; border:0; border-radius:8px; background:var(--ink); color:#fff; font-weight:900; cursor:pointer; }
button:hover { background:#000; }
.error { margin:14px 0 0; color:#C03B3B; font-size:13px; font-weight:700; }
</style>
</head>
<body>
<main>
<div class="mark" aria-hidden="true"></div>
<h1>Relatorio Renato Pretel</h1>
<p>Acesso restrito ao cliente e a Variantmidia.</p>
<form method="post">
<label for="user">Usuario</label>
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
  const html = await readFile(join(process.cwd(), "app", "dashboard", "renato-pretel", "dashboard.html"), "utf8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}

export async function GET(request: NextRequest) {
  if (!hasValidSession(request)) {
    return loginPage();
  }

  return dashboardPage();
}

export async function POST(request: NextRequest) {
  const secret = getSessionSecret();
  const form = await request.formData();
  const submittedUser = String(form.get("user") || "");
  const submittedPassword = String(form.get("password") || "");

  if (!secret || !validateLogin(submittedUser, submittedPassword)) {
    return loginPage(true);
  }

  const response = NextResponse.redirect(new URL(RENATO_DASHBOARD_PATH, request.url), 303);
  response.cookies.set(RENATO_COOKIE_NAME, createSession(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:" || process.env.VERCEL === "1",
    path: RENATO_DASHBOARD_PATH,
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });

  return response;
}

