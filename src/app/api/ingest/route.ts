import { NextRequest, NextResponse } from "next/server";
import { ingest } from "@/lib/ingest/orchestrator";
import { z } from "zod";

const schema = z.object({
  providers: z.array(z.enum(["sam", "rss"])).min(1),
  q: z.string().optional(),
  naics: z.string().optional(),
  country: z.string().optional(),
  sinceDays: z.coerce.number().int().min(0).max(365).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
  rssFeedUrl: z.string().url().optional()
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parsed = schema.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  try {
    const data = await ingest(parsed.data);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "ingestion error" }, { status: 500 });
  }
}
