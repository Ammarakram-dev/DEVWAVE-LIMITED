import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

const allowedStatuses = [
  "Received",
  "Under Review",
  "Shortlisted",
  "Task Assigned",
  "Selected",
  "Rejected",
  "Completed",
];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();

  if (!auth.authorized || !auth.admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();

  const status = body.status;
  const reviewerNotes = body.reviewer_notes ?? "";

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json({ message: "Invalid status." }, { status: 400 });
  }

  const { data, error } = await auth.admin
    .from("applications")
    .update({
      status,
      reviewer_notes: reviewerNotes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({
    application: data,
  });
}
