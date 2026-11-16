import { NextRequest, NextResponse } from "next/server";
import { hasValidSession } from "../_auth";
import { loadReport } from "../_report";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!hasValidSession(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await loadReport(), { headers: { "Cache-Control": "private, no-store" } });
}
