"use client";

import { useState } from "react";

export default function QuickContact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="quick-contact-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open quick contact form"
      >
        Quick Contact
      </button>

      {open && (
        <div
          className="quick-contact-overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="quick-contact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="quick-contact-close"
              onClick={() => setOpen(false)}
              aria-label="Close contact form"
            >
              ×
            </button>

            <div className="quick-contact-label">DEVWAVE</div>

            <h2>Let’s Talk</h2>
            <p>
              Have a project, idea, or question? Send us a message.
            </p>

            <form
              action="mailto:devwavelimited@gmail.com"
              method="post"
              encType="text/plain"
            >
              <input
                type="text"
                name="Name"
                placeholder="Your name"
                required
              />

              <input
                type="email"
                name="Email"
                placeholder="Your email"
                required
              />

              <input
                type="tel"
                name="Phone"
                placeholder="Phone / WhatsApp"
              />

              <textarea
                name="Message"
                placeholder="How can we help?"
                rows={5}
                required
              />

              <button type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}