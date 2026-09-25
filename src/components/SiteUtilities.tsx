"use client";

import { FormEvent, useState } from "react";

export default function SiteUtilities() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSending(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send message.");
      }

      form.reset();
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to send your message.",
      );
    } finally {
      setSending(false);
    }
  }

  function closeModal() {
    if (sending) return;

    setOpen(false);
    setSent(false);
    setError("");
  }

  return (
    <>
      <div
        className="devwave-online-status"
        aria-label="DEVWAVE website is online"
        title="DEVWAVE is currently online"
      >
        <span className="devwave-online-signal">
          <span className="devwave-online-ring ring-one" />
          <span className="devwave-online-ring ring-two" />
          <span className="devwave-online-core" />
        </span>

        <span className="devwave-online-copy">
          <strong>Online</strong>
          <small>DEVWAVE</small>
        </span>
      </div>

      <button
        className="quick-contact-trigger"
        onClick={() => {
          setOpen(true);
          setSent(false);
          setError("");
        }}
        type="button"
      >
        Quick Contact
      </button>

      {open && (
        <div className="quick-contact-overlay" onClick={closeModal}>
          <div
            className="quick-contact-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="quick-contact-close"
              onClick={closeModal}
              type="button"
              aria-label="Close"
            >
              ×
            </button>

            <div className="quick-contact-label">DEVWAVE LIMITED</div>

            {!sent ? (
              <>
                <h2>Let’s Talk</h2>

                <p>
                  Tell us a little about what you need and our team will get
                  back to you.
                </p>

                <form onSubmit={handleSubmit}>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                  />

                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone / WhatsApp"
                  />

                  <textarea
                    name="message"
                    rows={5}
                    placeholder="How can we help?"
                    required
                  />

                  {error && <div className="quick-contact-error">{error}</div>}

                  <button type="submit" disabled={sending}>
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            ) : (
              <div className="quick-contact-success">
                <div className="quick-contact-success-icon">✓</div>

                <h2>Message received.</h2>

                <p>
                  Thank you for contacting DEVWAVE. Our team will review your
                  message and get back to you.
                </p>

                <button type="button" onClick={closeModal}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
