import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdmin();

  if (!auth.authorized || !auth.admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { data, error } = await auth.admin
    .from("internship_tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ tasks: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();

  if (!auth.authorized || !auth.admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();

  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const domain = String(body.domain || "").trim();
  const deadline = body.deadline || null;

  if (!title || !description || !domain) {
    return NextResponse.json(
      { message: "Title, description and domain are required." },
      { status: 400 },
    );
  }

  const { data, error } = await auth.admin
    .from("internship_tasks")
    .insert({
      title,
      description,
      domain,
      deadline,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ task: data }, { status: 201 });
}
