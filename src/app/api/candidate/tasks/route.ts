import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const email = user.email.toLowerCase().trim();

  const { data: applications, error: applicationsError } = await supabaseAdmin
    .from("applications")
    .select("id, full_name, email, domain, duration, status")
    .ilike("email", email);

  if (applicationsError) {
    return NextResponse.json(
      { message: applicationsError.message },
      { status: 500 },
    );
  }

  if (!applications || applications.length === 0) {
    return NextResponse.json({
      applications: [],
      assignments: [],
    });
  }

  const applicationIds = applications.map((application) => application.id);

  const { data: assignments, error: assignmentsError } = await supabaseAdmin
    .from("task_assignments")
    .select(
      `
        id,
        status,
        assigned_at,
        application_id,
        task_id,
        internship_tasks (
          id,
          title,
          description,
          domain,
          deadline
        ),
        task_submissions (
          id,
          submission_url,
          submission_text,
          file_path,
          status,
          submitted_at
        )
      `,
    )
    .in("application_id", applicationIds)
    .order("assigned_at", {
      ascending: false,
    });

  if (assignmentsError) {
    return NextResponse.json(
      { message: assignmentsError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    applications,
    assignments: assignments || [],
  });
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let body: {
    assignmentId?: string;
    submissionText?: string;
    submissionUrl?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const assignmentId = String(body.assignmentId || "").trim();

  const submissionText = String(body.submissionText || "").trim();

  const submissionUrl = String(body.submissionUrl || "").trim();

  if (!assignmentId) {
    return NextResponse.json(
      { message: "Assignment is required." },
      { status: 400 },
    );
  }

  if (!submissionText && !submissionUrl) {
    return NextResponse.json(
      {
        message: "Add submission details or a project URL.",
      },
      { status: 400 },
    );
  }

  const email = user.email.toLowerCase().trim();

  const { data: applications, error: applicationsError } = await supabaseAdmin
    .from("applications")
    .select("id, email")
    .ilike("email", email);

  if (applicationsError) {
    return NextResponse.json(
      { message: applicationsError.message },
      { status: 500 },
    );
  }

  if (!applications || applications.length === 0) {
    return NextResponse.json(
      {
        message: "No DEVWAVE application was found for this account.",
      },
      { status: 404 },
    );
  }

  const applicationIds = applications.map((application) => application.id);

  const { data: assignment, error: assignmentError } = await supabaseAdmin
    .from("task_assignments")
    .select("id, application_id")
    .eq("id", assignmentId)
    .in("application_id", applicationIds)
    .maybeSingle();

  if (assignmentError) {
    return NextResponse.json(
      { message: assignmentError.message },
      { status: 500 },
    );
  }

  if (!assignment) {
    return NextResponse.json(
      { message: "Task assignment was not found." },
      { status: 404 },
    );
  }

  const { data: existingSubmission } = await supabaseAdmin
    .from("task_submissions")
    .select("id")
    .eq("assignment_id", assignmentId)
    .maybeSingle();

  if (existingSubmission) {
    const { data, error } = await supabaseAdmin
      .from("task_submissions")
      .update({
        submission_text: submissionText || null,
        submission_url: submissionUrl || null,
        status: "Submitted",
        submitted_at: new Date().toISOString(),
      })
      .eq("id", existingSubmission.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({
      submission: data,
      message: "Submission updated successfully.",
    });
  }

  const { data, error } = await supabaseAdmin
    .from("task_submissions")
    .insert({
      assignment_id: assignmentId,
      submission_url: submissionUrl || null,
      submission_text: submissionText || null,
      status: "Submitted",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      submission: data,
      message: "Task submitted successfully.",
    },
    { status: 201 },
  );
}
