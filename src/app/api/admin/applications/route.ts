import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdmin();

  if (!auth.authorized || !auth.admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { data, error } = await auth.admin
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({
    applications: data ?? [],
  });
}
