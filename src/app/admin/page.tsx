"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLogin() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const adminEmail = process.env.NEXT_PUBLIC_DEVWAVE_ADMIN_EMAIL;

      if (
        adminEmail &&
        user.email?.toLowerCase() === adminEmail.toLowerCase()
      ) {
        const { data } =
          await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

        if (data?.currentLevel === "aal2") {
          router.replace("/admin/dashboard");
        }
      }
    }

    checkSession();
  }, [router, supabase]);

  async function login(event: FormEvent) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const adminEmail = process.env.NEXT_PUBLIC_DEVWAVE_ADMIN_EMAIL;

    if (
      !adminEmail ||
      email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()
    ) {
      setError("This account is not authorized for DEVWAVE administration.");
      setLoading(false);
      return;
    }

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (loginError || !data.user) {
      setError("Invalid credentials.");
      setLoading(false);
      return;
    }

    const { data: aal } =
      await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

    setLoading(false);

    if (aal?.currentLevel === "aal2") {
      router.replace("/admin/dashboard");
      router.refresh();
      return;
    }

    router.replace("/admin/mfa");
  }

  return (
    <main className="dw-secure-page">
      <section className="dw-secure-card">
        <div className="dw-secure-brand">DW</div>

        <span className="dw-secure-kicker">DEVWAVE / PRIVATE ACCESS</span>

        <h1>CEO Administration</h1>

        <p className="dw-secure-intro">
          Secure administration for authorized DEVWAVE leadership.
        </p>

        <div className="dw-secure-security">
          <span>01</span>
          <div>
            <strong>Password authentication</strong>
            <small>Protected Supabase Auth session</small>
          </div>
        </div>

        <div className="dw-secure-security">
          <span>02</span>
          <div>
            <strong>Authenticator verification</strong>
            <small>Mandatory TOTP multi-factor authentication</small>
          </div>
        </div>

        <form onSubmit={login} className="dw-secure-form">
          <label>
            Authorized email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="CEO email"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              placeholder="Password"
            />
          </label>

          {error && <div className="dw-secure-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Authenticating..." : "Continue securely"}
          </button>
        </form>

        <small className="dw-secure-footer">
          DEVWAVE private administration • Authorized access only
        </small>
      </section>
    </main>
  );
}
