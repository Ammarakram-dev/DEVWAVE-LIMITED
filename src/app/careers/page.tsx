import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="dw-careers-page">
      <section className="dw-careers-hero">
        <span className="dw-eyebrow">CAREERS AT DEVWAVE</span>

        <h1>Build what comes next.</h1>

        <p>
          Join DEVWAVE and work on software, artificial intelligence,
          automation, data, cybersecurity, web and mobile technology.
        </p>

        <div className="dw-careers-actions">
          <Link href="/careers/internships" className="dw-main-button">
            Explore Internships
          </Link>

          <a
            href="mailto:devwavelimited@gmail.com?subject=Career%20Inquiry%20-%20DEVWAVE"
            className="dw-secondary-button"
          >
            Contact DEVWAVE
          </a>
        </div>
      </section>

      <section className="dw-careers-grid">
        <Link href="/careers/internships" className="dw-career-card">
          <span>01</span>

          <h2>Internships</h2>

          <p>
            Practical experience across AI, software, web, apps, cybersecurity
            and data.
          </p>

          <strong>Explore →</strong>
        </Link>

        <Link href="/candidate" className="dw-career-card">
          <span>02</span>

          <h2>Candidate Portal</h2>

          <p>
            Sign in to manage your application, assigned tasks and internship
            submissions.
          </p>

          <strong>Candidate Login →</strong>
        </Link>
      </section>

      <section className="dw-careers-grid">
        <a
          href="https://www.linkedin.com/company/145228972/"
          target="_blank"
          rel="noreferrer"
          className="dw-career-card"
        >
          <span>03</span>

          <h2>LinkedIn</h2>

          <p>
            Follow DEVWAVE for company updates, opportunities and announcements.
          </p>

          <strong>Follow DEVWAVE →</strong>
        </a>

        <a
          href="https://www.instagram.com/devwavelimited/"
          target="_blank"
          rel="noreferrer"
          className="dw-career-card"
        >
          <span>04</span>

          <h2>Instagram</h2>

          <p>
            Follow DEVWAVE and stay connected with our latest company updates.
          </p>

          <strong>Follow DEVWAVE →</strong>
        </a>
      </section>
    </main>
  );
}
