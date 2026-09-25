import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  Globe2,
  LockKeyhole,
  Smartphone,
} from "lucide-react";

const internships = [
  {
    number: "01",
    title: "Full Stack Web Development",
    description:
      "Build complete web applications while working with modern frontend, backend and API technologies.",
    focus: "Frontend • Backend • APIs",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Front-End Web Development",
    description:
      "Create responsive, accessible and polished interfaces with modern web technologies and strong UX.",
    focus: "UI • UX • React • Web",
    icon: Code2,
  },
  {
    number: "03",
    title: "App Development",
    description:
      "Develop practical mobile experiences while learning application architecture, interfaces and APIs.",
    focus: "Mobile • UI • APIs",
    icon: Smartphone,
  },
  {
    number: "04",
    title: "Artificial Intelligence",
    description:
      "Explore machine learning, intelligent systems, automation and practical AI solutions.",
    focus: "AI • ML • Automation",
    icon: BrainCircuit,
  },
  {
    number: "05",
    title: "Cyber Security",
    description:
      "Develop practical security knowledge through secure development, threat awareness and defensive techniques.",
    focus: "Security • Threats • Defense",
    icon: LockKeyhole,
  },
  {
    number: "06",
    title: "Data Analytics",
    description:
      "Turn data into useful insights through analysis, visualization and practical problem solving.",
    focus: "Python • Data • Insights",
    icon: Database,
  },
];

const durations = [
  {
    number: "01",
    title: "1 Month",
    description: "Focused learning sprint",
  },
  {
    number: "02",
    title: "2 Months",
    description: "Deeper project experience",
  },
  {
    number: "03",
    title: "3 Months",
    description: "Extended practical experience",
  },
];

export default function InternshipsPage() {
  return (
    <main className="internships-page">
      {/* HERO */}
      <section className="internships-hero">
        <div className="internships-container">
          <Link href="/careers" className="internship-back-link">
            <ArrowLeft size={15} />
            Back to careers
          </Link>

          <div className="internships-hero-grid">
            <div className="internships-hero-copy">
              <span className="internships-eyebrow">DEVWAVE / INTERNSHIPS</span>

              <h1>
                Build skills.
                <br />
                <span>Build experience.</span>
              </h1>

              <p>
                A practical internship experience focused on learning, project
                work, professional development and real-world technology.
              </p>

              <div className="internship-hero-actions">
                <Link
                  href="/careers/internships/apply"
                  className="internship-primary-button"
                >
                  Start application
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="#opportunities"
                  className="internship-secondary-button"
                >
                  Explore domains
                </a>
              </div>
            </div>

            <div className="internship-hero-panel">
              <div className="internship-orbit internship-orbit-one" />
              <div className="internship-orbit internship-orbit-two" />

              <div className="internship-dw-mark">DW</div>

              <span>DEVWAVE INTERNSHIP PROGRAM</span>

              <strong>Learn through practical work.</strong>

              <div className="internship-hero-stats">
                <div>
                  <span>PROGRAM</span>
                  <strong>Unpaid</strong>
                </div>

                <div>
                  <span>STIPEND</span>
                  <strong>Performance-Based</strong>
                </div>

                <div>
                  <span>DURATION</span>
                  <strong>1 / 2 / 3 Months</strong>
                </div>

                <div>
                  <span>PAYMENT</span>
                  <strong>Not Required</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section className="internship-main-section" id="opportunities">
        <div className="internships-container">
          <div className="internship-section-header">
            <div>
              <span>OPPORTUNITIES</span>
              <h2>Choose your path.</h2>
            </div>

            <p>
              Select the technology area that matches your interests, skills and
              career direction.
            </p>
          </div>

          <div className="internship-domain-grid-page">
            {internships.map((internship) => {
              const Icon = internship.icon;

              return (
                <article
                  className="internship-domain-card"
                  key={internship.title}
                >
                  <div className="internship-domain-top">
                    <span>{internship.number}</span>

                    <div className="internship-domain-icon">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3>{internship.title}</h3>

                  <p>{internship.description}</p>

                  <div className="internship-domain-footer">
                    <span>{internship.focus}</span>

                    <Link
                      href={`/careers/internships/apply?domain=${encodeURIComponent(
                        internship.title,
                      )}`}
                    >
                      Apply
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* DURATION */}
      <section className="internship-duration-section">
        <div className="internships-container">
          <div className="internship-section-header">
            <div>
              <span>PROGRAM DURATION</span>
              <h2>Choose your commitment.</h2>
            </div>

            <p>
              Applicants can choose the duration that best fits their
              availability and learning goals.
            </p>
          </div>

          <div className="internship-duration-overview">
            {durations.map((duration) => (
              <div
                className="internship-duration-overview-card"
                key={duration.title}
              >
                <span>{duration.number}</span>

                <div>
                  <strong>{duration.title}</strong>
                  <p>{duration.description}</p>
                </div>

                <ArrowRight size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="internship-process-section">
        <div className="internships-container">
          <div className="internship-section-header">
            <div>
              <span>HOW IT WORKS</span>
              <h2>A simple path forward.</h2>
            </div>

            <p>
              From application to practical experience, the process stays clear
              and focused.
            </p>
          </div>

          <div className="internship-process-grid">
            <div className="internship-process-card">
              <span>01</span>
              <strong>Apply</strong>
              <p>Submit your information, domain, duration and CV.</p>
            </div>

            <div className="internship-process-card">
              <span>02</span>
              <strong>Review</strong>
              <p>Applications are reviewed against program requirements.</p>
            </div>

            <div className="internship-process-card">
              <span>03</span>
              <strong>Build</strong>
              <p>
                Selected interns work through practical activities and projects.
              </p>
            </div>

            <div className="internship-process-card">
              <span>04</span>
              <strong>Grow</strong>
              <p>
                Develop experience, strengthen your portfolio and demonstrate
                your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMATION */}
      <section className="internship-information-section">
        <div className="internships-container">
          <div className="internship-information-card">
            <div className="internship-information-heading">
              <span>PROGRAM INFORMATION</span>
              <h2>Built around experience.</h2>

              <p>
                DEVWAVE internships are designed around practical learning,
                professional development and project-based experience.
              </p>
            </div>

            <div className="internship-information-content">
              <div className="internship-info-item">
                <CheckCircle2 size={17} />
                <span>1, 2 or 3 month duration options</span>
              </div>

              <div className="internship-info-item">
                <CheckCircle2 size={17} />
                <span>Unpaid internship program</span>
              </div>

              <div className="internship-info-item">
                <CheckCircle2 size={17} />
                <span>Performance-based stipend may be offered</span>
              </div>

              <div className="internship-info-item">
                <CheckCircle2 size={17} />
                <span>No application fee or payment required</span>
              </div>

              <div className="internship-info-item">
                <CheckCircle2 size={17} />
                <span>GitHub and LinkedIn are optional</span>
              </div>

              <div className="internship-info-item">
                <CheckCircle2 size={17} />
                <span>Project-based learning and evaluation</span>
              </div>

              <Link
                href="/careers/internships/apply"
                className="internship-primary-button"
              >
                Start your application
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
