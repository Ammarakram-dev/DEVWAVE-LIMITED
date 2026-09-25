"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function CandidatePage() {
  const supabase = createSupabaseBrowserClient();

  const [mode, setMode] = useState<"login" | "signup">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();

    setMessage("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("Invalid email or password.");
        return;
      }

      window.location.href = "/candidate/dashboard";

      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Account created. Check your email if confirmation is required.",
    );
  }

  return (
    <main className="dw-auth-page">
      <div className="dw-auth-card">
        <div className="dw-auth-logo">DW</div>

        <span className="dw-label">DEVWAVE / CANDIDATE</span>

        <h1>
          {mode === "login" ? "Candidate access." : "Create your account."}
        </h1>

        <p>Access your internship application and future program updates.</p>

        <form onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {message && <div className="dw-auth-message">{message}</div>}

          <button>{mode === "login" ? "Sign in" : "Create account"}</button>
        </form>

        <button
          className="dw-auth-switch"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "Create candidate account"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
