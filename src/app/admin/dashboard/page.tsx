import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin");
  }

  if (
    !process.env.DEVWAVE_ADMIN_EMAIL ||
    user.email !== process.env.DEVWAVE_ADMIN_EMAIL
  ) {
    redirect("/admin");
  }

  const { data: applications, error } = await supabaseAdmin
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load applications.");
  }

  return <DashboardClient initialApplications={applications ?? []} />;
}
