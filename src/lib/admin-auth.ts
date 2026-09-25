import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      authorized: false as const,
      user: null,
      admin: null,
      reason: "unauthenticated",
    };
  }

  const adminEmail = process.env.DEVWAVE_ADMIN_EMAIL;

  if (
    !adminEmail ||
    !user.email ||
    user.email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()
  ) {
    return {
      authorized: false as const,
      user,
      admin: null,
      reason: "not_admin",
    };
  }

  const { data: aal, error: aalError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (
    aalError ||
    aal?.currentLevel !== "aal2"
  ) {
    return {
      authorized: false as const,
      user,
      admin: null,
      reason: "mfa_required",
    };
  }

  return {
    authorized: true as const,
    user,
    admin: supabaseAdmin,
    reason: "authorized",
  };
}
