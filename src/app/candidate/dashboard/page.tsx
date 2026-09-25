import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import CandidateWorkspace from "./candidate-workspace";

export default async function CandidateDashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/candidate");
  }

  return <CandidateWorkspace email={user.email ?? ""} />;
}
