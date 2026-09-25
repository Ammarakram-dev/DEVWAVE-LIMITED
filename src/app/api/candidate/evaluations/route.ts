import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { data: applications, error } = await supabaseAdmin
    .from("applications")
    .select("id")
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  if (!applications?.length) {
    return NextResponse.json({
      evaluations: [],
    });
  }

  const applicationIds = applications.map((application) => application.id);

  const { data: assignments, error: assignmentError } = await supabaseAdmin
    .from("task_assignments")
    .select("id")
    .in("application_id", applicationIds);

  if (assignmentError) {
    return NextResponse.json(
      { message: assignmentError.message },
      { status: 500 },
    );
  }

  if (!assignments?.length) {
    return NextResponse.json({
      evaluations: [],
    });
  }

  const assignmentIds = assignments.map((assignment) => assignment.id);

  const { data: submissions, error: submissionError } = await supabaseAdmin
    .from("task_submissions")
    .select("id")
    .in("assignment_id", assignmentIds);

  if (submissionError) {
    return NextResponse.json(
      { message: submissionError.message },
      { status: 500 },
    );
  }

  if (!submissions?.length) {
    return NextResponse.json({
      evaluations: [],
    });
  }

  const submissionIds = submissions.map((submission) => submission.id);

  const { data: evaluations, error: evaluationError } = await supabaseAdmin
    .from("evaluations")
    .select(
      `
        id,
        submission_id,
        reviewer_name,
        score,
        feedback,
        result,
        evaluated_at
      `,
    )
    .in("submission_id", submissionIds)
    .order("evaluated_at", {
      ascending: false,
    });

  if (evaluationError) {
    return NextResponse.json(
      { message: evaluationError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    evaluations: evaluations ?? [],
  });
}
