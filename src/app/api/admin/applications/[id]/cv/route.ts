import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();

  if (!auth.authorized || !auth.admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  const { data: application, error } = await auth.admin
    .from("applications")
    .select("cv_path")
    .eq("id", id)
    .single();

  if (error || !application?.cv_path) {
    return NextResponse.json({ message: "CV not found." }, { status: 404 });
  }

  const { data, error: signedUrlError } = await auth.admin.storage
    .from("candidate-cvs")
    .createSignedUrl(application.cv_path, 300);

  if (signedUrlError || !data?.signedUrl) {
    return NextResponse.json(
      { message: "Unable to create secure CV link." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    url: data.signedUrl,
  });
}
