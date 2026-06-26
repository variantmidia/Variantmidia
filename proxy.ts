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
    const decoded = atob(header.slice("Basic ".length));
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

export function proxy(request: NextRequest) {
  if (!isAuthorized(request)) {
    return unauthorized();
  }

  const url = request.nextUrl.clone();
  if (url.pathname === "/cliente/tavora-advogado" || url.pathname === "/cliente/tavora-advogado/") {
    url.pathname = "/cliente/tavora-advogado/index.html";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cliente/:path*"],
};
