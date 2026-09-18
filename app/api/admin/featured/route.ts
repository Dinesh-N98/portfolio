import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getFeaturedSlugs, setFeaturedSlugs } from "@/src/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const slugs = await getFeaturedSlugs();
  return NextResponse.json({ slugs });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!Array.isArray(body.slugs) || !body.slugs.every((s: unknown) => typeof s === "string")) {
    return NextResponse.json({ error: "Invalid payload: slugs must be a string array" }, { status: 400 });
  }

  await setFeaturedSlugs(body.slugs);
  revalidatePath("/");
  revalidatePath("/projects");
  return NextResponse.json({ success: true, slugs: body.slugs });
}
