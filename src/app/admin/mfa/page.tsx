"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminMFA() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [factorId, setFactorId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [code, setCode] = useState("");
  const [setup, setSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function prepareMFA() {
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin");
        return;
      }

      const adminEmail = process.env.NEXT_PUBLIC_DEVWAVE_ADMIN_EMAIL;

      if (
        !adminEmail ||
        user.email?.toLowerCase() !== adminEmail.toLowerCase()
      ) {
        await supabase.auth.signOut();
        router.replace("/admin");
        return;
      }

      const { data, error: factorsError } =
        await supabase.auth.mfa.listFactors();

      if (factorsError) {
        setError("Unable to load security factors.");
        setLoading(false);
        return;
      }

      const verified = data?.totp?.find(
        (factor) => factor.status === "verified",
      );

      if (verified) {
        setFactorId(verified.id);
        setSetup(false);
        setLoading(false);
        return;
      }

      const { data: enrolled, error: enrollError } =
        await supabase.auth.mfa.enroll({
          factorType: "totp",
          friendlyName: "DEVWAVE CEO",
        });

      if (enrollError || !enrolled) {
        setError(
          enrollError?.message ||
            "Unable to create your authenticator setup.",
        );
        setLoading(false);
        return;
      }

      setFactorId(enrolled.id);
      setQrCode(enrolled.totp.qr_code);
      setSetup(true);
      setLoading(false);
    }

    prepareMFA();
  }, [router, supabase]);

  async function verify() {
    if (!factorId || code.length !== 6) {
      setError("Enter the 6-digit authenticator code.");
      return;
    }

    setError("");
    setVerifying(true);

    const { data: challenge, error: challengeError } =
      await supabase.auth.mfa.challenge({
        factorId,
      });

    if (challengeError || !challenge) {
      setError("Unable to create the security challenge.");
      setVerifying(false);
      return;
    }

    const { error: verifyError } =
      await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code,
      });

    if (verifyError) {
      setError("Invalid authenticator code. Try again.");
      setCode("");
      setVerifying(false);
      return;
    }

    const { data: aal } =
      await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

    if (aal?.currentLevel !== "aal2") {
      setError("Security verification was not completed.");
      setVerifying(false);
      return;
    }

    router.replace("/admin/dashboard");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="dw-secure-page">
        <section className="dw-secure-card dw-secure-loading">
          <div className="dw-secure-brand">DW</div>
          <span className="dw-secure-kicker">SECURITY CHECK</span>
          <h1>Preparing secure access.</h1>
          <p>Loading your DEVWAVE authenticator.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="dw-secure-page">
      <section className="dw-secure-card">
        <div className="dw-secure-brand">DW</div>

        <span className="dw-secure-kicker">
          {setup ? "FIRST-TIME SECURITY SETUP" : "SECOND FACTOR"}
        </span>

        <h1>
          {setup
            ? "Secure your CEO account."
            : "Verify your identity."}
        </h1>

        <p className="dw-secure-intro">
          {setup
            ? "Connect an authenticator app before accessing the private administration portal."
            : "Enter the current six-digit code from your authenticator app."}
        </p>

        {setup && qrCode && (
          <div className="dw-secure-qr">
            <img src={qrCode} alt="DEVWAVE authenticator QR code" />
          </div>
        )}

        {setup && (
          <div className="dw-secure-note">
            <strong>Authenticator required</strong>
            <span>
              Scan the QR code with Google Authenticator, Microsoft
              Authenticator, 1Password, Authy, or another TOTP app.
            </span>
          </div>
        )}

        <label className="dw-secure-code-label">
          Authentication code
          <input
            className="dw-secure-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(event) =>
              setCode(event.target.value.replace(/\D/g, ""))
            }
            placeholder="000000"
          />
        </label>

        {error && <div className="dw-secure-error">{error}</div>}

        <button
          className="dw-secure-primary"
          onClick={verify}
          disabled={verifying || code.length !== 6}
        >
          {verifying ? "Verifying..." : "Verify and enter"}
        </button>

        <button
          className="dw-secure-back"
          onClick={async () => {
            await supabase.auth.signOut();
            router.replace("/admin");
          }}
        >
          Cancel and sign out
        </button>

        <small className="dw-secure-footer">
          DEVWAVE security • TOTP protected • Private administration
        </small>
      </section>
    </main>
  );
}
