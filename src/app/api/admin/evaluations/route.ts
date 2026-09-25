import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdmin();

  if (!auth.authorized || !auth.admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { data, error } = await auth.admin
    .from("evaluations")
    .select(
      `
      id,
      reviewer_name,
      score,
      feedback,
      result,
      evaluated_at,
      task_submissions (
        id,
        assignment_id,
        submission_url,
        submission_text,
        status,
        submitted_at,
        task_assignments (
          id,
          application_id,
          internship_tasks (
            id,
            title,
            domain
          ),
          applications (
            id,
            full_name,
            email,
            domain
          )
        )
      )
    `,
    )
    .order("evaluated_at", {
      ascending: false,
    });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({
    evaluations: data ?? [],
  });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();

  if (!auth.authorized || !auth.admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let body: {
    submissionId?: string;
    reviewerName?: string;
    score?: number;
    feedback?: string;
    result?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const submissionId = String(body.submissionId || "").trim();

  const reviewerName = String(body.reviewerName || "").trim();

  const feedback = String(body.feedback || "").trim();

  const result = String(body.result || "").trim();

  const score =
    typeof body.score === "number" ? body.score : Number(body.score);

  if (!submissionId || !reviewerName || !feedback || !result) {
    return NextResponse.json(
      {
        message: "Submission, reviewer, feedback and result are required.",
      },
      { status: 400 },
    );
  }

  if (!Number.isFinite(score) || score < 0 || score > 100) {
    return NextResponse.json(
      {
        message: "Score must be a number between 0 and 100.",
      },
      { status: 400 },
    );
  }

  const { data: submission, error: submissionError } = await auth.admin
    .from("task_submissions")
    .select(
      `
        id,
        assignment_id,
        task_assignments (
          id,
          application_id
        )
      `,
    )
    .eq("id", submissionId)
    .single();

  if (submissionError || !submission) {
    return NextResponse.json(
      { message: "Submission not found." },
      { status: 404 },
    );
  }

  const { data: existing } = await auth.admin
    .from("evaluations")
    .select("id")
    .eq("submission_id", submissionId)
    .maybeSingle();

  let evaluation;

  if (existing) {
    const { data, error } = await auth.admin
      .from("evaluations")
      .update({
        reviewer_name: reviewerName,
        score,
        feedback,
        result,
        evaluated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    evaluation = data;
  } else {
    const { data, error } = await auth.admin
      .from("evaluations")
      .insert({
        submission_id: submissionId,
        reviewer_name: reviewerName,
        score,
        feedback,
        result,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    evaluation = data;
  }

  const assignmentData = Array.isArray(submission.task_assignments)
    ? submission.task_assignments[0]
    : submission.task_assignments;

  if (assignmentData?.application_id) {
    await auth.admin
      .from("applications")
      .update({
        status:
          result.toLowerCase() === "selected"
            ? "Selected"
            : result.toLowerCase() === "rejected"
              ? "Rejected"
              : "Completed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", assignmentData.application_id);
  }

  await auth.admin
    .from("task_submissions")
    .update({
      status: "Evaluated",
    })
    .eq("id", submissionId);

  return NextResponse.json(
    {
      evaluation,
      message: "Evaluation saved successfully.",
    },
    { status: existing ? 200 : 201 },
  );
}
