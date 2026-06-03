import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST — record a page view (no auth required, public visitors trigger this)
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = typeof body.path === "string" && body.path ? body.path : "/";

    await prisma.pageView.create({
      data: { path },
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Silently fail — analytics shouldn't break the page
    return NextResponse.json({ ok: false });
  }
}
