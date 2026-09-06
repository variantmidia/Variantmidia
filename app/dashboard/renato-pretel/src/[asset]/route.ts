import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { hasValidSession } from "../../_auth";

const ASSET_TYPES: Record<string, string> = {
  "app.js": "text/javascript; charset=utf-8",
  "styles.css": "text/css; charset=utf-8",
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ asset: string }> },
) {
  if (!hasValidSession(request)) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const { asset } = await context.params;
  const contentType = ASSET_TYPES[asset];

  if (!contentType) {
    return new NextResponse("not found", { status: 404 });
  }

  const file = await readFile(
    join(process.cwd(), "app", "dashboard", "renato-pretel", "src", asset),
    "utf8",
  );

  return new NextResponse(file, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "private, no-store",
    },
  });
}
