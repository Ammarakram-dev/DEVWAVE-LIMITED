"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Upload,
} from "lucide-react";

const domains = [
  "Full Stack Web Development",
  "Front-End Web Development",
  "App Development",
  "Artificial Intelligence",
  "Cyber Security",
  "Data Analytics",
];

const durations = [
  { value: "1 Month", label: "01", title: "1 Month" },
  { value: "2 Months", label: "02", title: "2 Months" },
  { value: "3 Months", label: "03", title: "3 Months" },
];

export default function InternshipApplication() {
  const [domain, setDomain] = useState("");
  const [duration, setDuration] = useState("");
  const [fileName, setFileName] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selected = params.get("domain");

    if (selected && domains.includes(selected)) {
      requestAnimationFrame(() => setDomain(selected));
    }
  }, []);

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!domain || !duration || !agreement || submitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set("domain", domain);
    formData.set("duration", duration);
    formData.set("agreement", String(agreement));

    setSubmitting(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Unable to submit application.");
        return;
      }

      console.log("DEVWAVE application:", result);

      setSubmitted(true);
    } catch (error) {
      console.error("Application submission error:", error);
      alert("Unable to connect to the DEVWAVE application service.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="dw-application-page">
        <div className="dw-success">
          <div className="dw-success-icon">
            <CheckCircle2 size={30} />
          </div>

          <span className="dw-label">DEVWAVE / APPLICATION</span>

          <h1>Application received.</h1>

          <p>
            Your internship application has been successfully submitted to
            DEVWAVE for review.
          </p>

          <div className="dw-success-grid">
            <div>
              <span>DOMAIN</span>
              <strong>{domain}</strong>
            </div>

            <div>
              <span>DURATION</span>
              <strong>{duration}</strong>
            </div>

            <div>
              <span>PROGRAM</span>
              <strong>Unpaid Internship</strong>
            </div>

            <div>
              <span>STIPEND</span>
              <strong>Performance-Based</strong>
            </div>
          </div>

          <p className="dw-success-note">
            Your information and CV have been securely submitted. DEVWAVE will
            review your application and proceed according to the internship
            selection process.
          </p>

          <Link href="/careers/internships" className="dw-main-button">
            Back to internships
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="dw-application-page">
      <div className="dw-application-shell">
        {/* TOP */}

        <div className="dw-application-top">
          <Link href="/careers/internships" className="dw-back">
            <ArrowLeft size={15} />
            Internships
          </Link>

          <span className="dw-top-brand">DEVWAVE</span>
        </div>

        {/* HEADER */}

        <header className="dw-application-header">
          <div>
            <span className="dw-label">CAREERS / INTERNSHIP</span>

            <h1>Start your application.</h1>

            <p>
              Tell us about yourself, choose your path and submit your profile
              for review.
            </p>
          </div>

          <div className="dw-header-mark">
            <span>DW</span>
          </div>
        </header>

        {/* MAIN */}

        <div className="dw-application-layout">
          {/* FORM */}

          <form className="dw-application-form" onSubmit={submitApplication}>
            {/* PROFILE */}

            <section className="dw-form-card">
              <div className="dw-card-heading">
                <span>01</span>

                <div>
                  <strong>Profile</strong>
                  <small>Your basic information</small>
                </div>
              </div>

              <div className="dw-input-grid">
                <label>
                  <span>Full name</span>

                  <input
                    required
                    name="fullName"
                    placeholder="Your full name"
                  />
                </label>

                <label>
                  <span>Email</span>

                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  <span>Phone</span>

                  <input required name="phone" placeholder="+92 3XX XXXXXXX" />
                </label>

                <label>
                  <span>City</span>

                  <input required name="city" placeholder="Your city" />
                </label>

                <label>
                  <span>University / Institution</span>

                  <input
                    required
                    name="university"
                    placeholder="University or institution"
                  />
                </label>

                <label>
                  <span>Current semester</span>

                  <input
                    required
                    name="semester"
                    placeholder="e.g. 7th semester"
                  />
                </label>
              </div>
            </section>

            {/* INTERNSHIP */}

            <section className="dw-form-card">
              <div className="dw-card-heading">
                <span>02</span>

                <div>
                  <strong>Your internship</strong>
                  <small>Select your technology path</small>
                </div>
              </div>

              <div className="dw-field-block">
                <span className="dw-field-title">Technology domain</span>

                <div className="dw-domain-select">
                  {domains.map((item, index) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        domain === item ? "dw-domain active" : "dw-domain"
                      }
                      onClick={() => setDomain(item)}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>

                      <strong>{item}</strong>

                      {domain === item && <Check size={15} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dw-field-block">
                <span className="dw-field-title">Duration</span>

                <div className="dw-duration-select">
                  {durations.map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      className={
                        duration === item.value
                          ? "dw-duration active"
                          : "dw-duration"
                      }
                      onClick={() => setDuration(item.value)}
                    >
                      <span>{item.label}</span>

                      <strong>{item.title}</strong>

                      {duration === item.value && <Check size={15} />}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* LINKS */}

            <section className="dw-form-card">
              <div className="dw-card-heading">
                <span>03</span>

                <div>
                  <strong>Professional presence</strong>
                  <small>Optional but useful</small>
                </div>
              </div>

              <div className="dw-input-grid">
                <label>
                  <span>
                    GitHub <em>Optional</em>
                  </span>

                  <input name="github" placeholder="github.com/..." />
                </label>

                <label>
                  <span>
                    LinkedIn <em>Optional</em>
                  </span>

                  <input name="linkedin" placeholder="linkedin.com/in/..." />
                </label>

                <label className="dw-full">
                  <span>
                    Portfolio <em>Optional</em>
                  </span>

                  <input name="portfolio" placeholder="yourportfolio.com" />
                </label>
              </div>

              <div className="dw-follow">
                <div>
                  <strong>Follow DEVWAVE</strong>

                  <small>Stay updated with opportunities and technology.</small>
                </div>

                <div className="dw-socials">
                  <a
                    href="https://www.linkedin.com/company/145228972/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="DEVWAVE LinkedIn"
                  >
                    in
                  </a>

                  <a
                    href="https://www.instagram.com/devwavelimited"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="DEVWAVE Instagram"
                  >
                    ig
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61594505496853"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="DEVWAVE Facebook"
                  >
                    f
                  </a>
                </div>
              </div>
            </section>

            {/* EXPERIENCE */}

            <section className="dw-form-card">
              <div className="dw-card-heading">
                <span>04</span>

                <div>
                  <strong>Skills & experience</strong>
                  <small>Show us what interests you</small>
                </div>
              </div>

              <div className="dw-textarea-grid">
                <label>
                  <span>Relevant skills</span>

                  <textarea
                    name="skills"
                    rows={3}
                    placeholder="Python, React, SQL, AI, Cybersecurity..."
                  />
                </label>

                <label>
                  <span>What would you like to learn or build?</span>

                  <textarea
                    name="goals"
                    rows={3}
                    placeholder="Describe your interests or goals."
                  />
                </label>

                <label>
                  <span>
                    Projects / experience <em>Optional</em>
                  </span>

                  <textarea
                    name="experience"
                    rows={3}
                    placeholder="Projects, coursework, internships or personal work."
                  />
                </label>
              </div>
            </section>

            {/* CV */}

            <section className="dw-form-card">
              <div className="dw-card-heading">
                <span>05</span>

                <div>
                  <strong>Resume</strong>
                  <small>Your latest CV</small>
                </div>
              </div>

              <label className="dw-upload">
                <div className="dw-upload-icon">
                  <Upload size={19} />
                </div>

                <div>
                  <strong>{fileName || "Upload your CV"}</strong>

                  <small>PDF, DOC or DOCX</small>
                </div>

                <FileText size={18} />

                <input
                  required
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setFileName(file?.name || "");
                  }}
                />
              </label>
            </section>

            {/* TERMS */}

            <section className="dw-form-card">
              <div className="dw-card-heading">
                <span>06</span>

                <div>
                  <strong>Review</strong>
                  <small>Before you continue</small>
                </div>
              </div>

              <div className="dw-review-grid">
                <div>
                  <span>TYPE</span>
                  <strong>Unpaid Internship</strong>
                </div>

                <div>
                  <span>STIPEND</span>
                  <strong>Performance-Based</strong>
                </div>

                <div>
                  <span>DURATION</span>
                  <strong>{duration || "1 / 2 / 3 Months"}</strong>
                </div>

                <div>
                  <span>PAYMENT</span>
                  <strong>Not Required</strong>
                </div>
              </div>

              <div className="dw-review-note">
                DEVWAVE internships focus on practical learning, project work
                and professional development. Performance-based stipends may be
                offered to eligible interns according to program requirements.
              </div>
            </section>

            {/* AGREEMENT */}

            <label className="dw-agreement">
              <input
                type="checkbox"
                name="agreement"
                checked={agreement}
                onChange={(event) => setAgreement(event.target.checked)}
              />

              <span>
                I confirm that my information is accurate and I understand the
                internship terms.
              </span>
            </label>

            {/* SUBMIT */}

            <button
              type="submit"
              className="dw-submit"
              disabled={!domain || !duration || !agreement || submitting}
            >
              {submitting ? "Submitting application..." : "Submit application"}

              {!submitting && <ArrowRight size={17} />}
            </button>
          </form>

          {/* SIDE PANEL */}

          <aside className="dw-side-panel">
            <div className="dw-side-glow" />

            <div className="dw-side-logo">DW</div>

            <span className="dw-side-label">DEVWAVE INTERNSHIP</span>

            <h2>
              Build something
              <br />
              <span>worth showing.</span>
            </h2>

            <p>
              A focused environment for learning, practical work and
              professional growth.
            </p>

            <div className="dw-side-line" />

            <div className="dw-side-items">
              <div>
                <span>01</span>
                <strong>Apply</strong>
              </div>

              <div>
                <span>02</span>
                <strong>Review</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Build</strong>
              </div>

              <div>
                <span>04</span>
                <strong>Grow</strong>
              </div>
            </div>

            <div className="dw-side-bottom">
              <span>PROGRAM</span>
              <strong>Unpaid · Performance-Based</strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
