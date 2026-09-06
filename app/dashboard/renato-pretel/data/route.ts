import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { hasValidSession } from "../_auth";

export async function GET(request: NextRequest) {
  if (!hasValidSession(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const json = await readFile(join(process.cwd(), "app", "dashboard", "renato-pretel", "data", "report.json"), "utf8");

  return new NextResponse(json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}

