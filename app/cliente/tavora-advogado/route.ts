import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";

const REALM = "Relatorios Variantmidia";

function unauthorized() {
  return new NextResponse("Autenticacao necessaria.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

function isAuthorized(request: NextRequest) {
  const expectedUser = process.env.CLIENTE_RELATORIO_USER;
  const expectedPassword = process.env.CLIENTE_RELATORIO_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return false;
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) {
    return false;
  }

  try {
    const decoded = Buffer.from(header.slice("Basic ".length), "base64").toString("utf8");
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return false;
    }

    const user = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    return user === expectedUser && password === expectedPassword;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return unauthorized();
  }

  const html = await readFile(join(process.cwd(), "app", "cliente", "tavora-advogado", "dashboard.html"), "utf8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
