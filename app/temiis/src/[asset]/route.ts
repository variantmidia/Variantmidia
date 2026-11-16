import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
const types: Record<string, string> = { "app.js": "text/javascript; charset=utf-8", "styles.css": "text/css; charset=utf-8" };
export async function GET(_request: Request, context: { params: Promise<{ asset: string }> }) {
  const { asset } = await context.params;
  if (!Object.hasOwn(types, asset)) return new NextResponse("Não encontrado", { status: 404 });
  return new NextResponse(await readFile(join(process.cwd(), "app/temiis/src", asset), "utf8"), { headers: { "Content-Type": types[asset], "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex, nofollow" } });
}
