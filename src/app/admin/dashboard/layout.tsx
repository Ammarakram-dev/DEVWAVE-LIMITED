import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin");
  }

  const adminEmail = process.env.DEVWAVE_ADMIN_EMAIL;

  if (
    !adminEmail ||
    !user.email ||
    user.email.toLowerCase() !== adminEmail.toLowerCase()
  ) {
    redirect("/admin");
  }

  const { data: aal } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (aal?.currentLevel !== "aal2") {
    redirect("/admin/mfa");
  }

  return children;
}
