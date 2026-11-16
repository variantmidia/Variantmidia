import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  return new NextResponse(await readFile(join(process.cwd(), "app/temiis/dashboard.html"), "utf8"), {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" },
  });
}
