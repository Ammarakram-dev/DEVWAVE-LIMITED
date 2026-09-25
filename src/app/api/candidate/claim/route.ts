import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id || !user.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const email = user.email.toLowerCase().trim();

  const { data: applications, error } = await supabaseAdmin
    .from("applications")
    .select("id, email, user_id")
    .ilike("email", email);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  if (!applications || applications.length === 0) {
    return NextResponse.json({
      claimed: 0,
      message: "No matching DEVWAVE application found.",
    });
  }

  let claimed = 0;

  for (const application of applications) {
    if (application.user_id === user.id) {
      continue;
    }

    if (application.user_id) {
      continue;
    }

    const { error: updateError } = await supabaseAdmin
      .from("applications")
      .update({
        user_id: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", application.id)
      .is("user_id", null);

    if (!updateError) {
      claimed += 1;
    }
  }

  return NextResponse.json({
    claimed,
    message:
      claimed > 0
        ? "Application linked to your candidate account."
        : "No new applications needed linking.",
  });
}
