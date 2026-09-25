"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Database,
  ExternalLink,
  Globe2,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";

type ThemeMode = "system" | "light" | "dark";

const internshipDomains = [
  {
    id: "01",
    title: "Full Stack Web Development",
    category: "Web",
    description:
      "Build complete web applications across frontend interfaces, backend services, APIs, databases and deployment.",
    skills: ["React", "Next.js", "Node.js", "APIs", "SQL"],
  },
  {
    id: "02",
    title: "Front-End Web Development",
    category: "Web",
    description:
      "Create responsive, accessible and high-quality interfaces with modern frontend engineering practices.",
    skills: ["HTML", "CSS", "JavaScript", "React", "UI"],
  },
  {
    id: "03",
    title: "App Development",
    category: "Mobile",
    description:
      "Design and develop modern mobile applications with practical product thinking and reliable engineering.",
    skills: ["Android", "Java", "Kotlin", "APIs", "UI"],
  },
  {
    id: "04",
    title: "Artificial Intelligence",
    category: "AI",
    description:
      "Work with machine learning, intelligent systems, automation, data and practical AI applications.",
    skills: ["Python", "ML", "AI", "Data", "Automation"],
  },
  {
    id: "05",
    title: "Cyber Security",
    category: "Security",
    description:
      "Explore application security, monitoring, secure development and security-focused technology systems.",
    skills: ["Security", "Python", "Networks", "Web Security"],
  },
  {
    id: "06",
    title: "Data Analytics",
    category: "Data",
    description:
      "Transform raw information into meaningful insights through analysis, visualization and practical reporting.",
    skills: ["Python", "Pandas", "SQL", "Visualization"],
  },
];

const services = [
  {
    number: "01",
    title: "Artificial Intelligence",
    short: "AI & ML",
    text: "Intelligent systems, machine learning, language technologies and practical AI applications.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
    icon: BrainCircuit,
    capabilities: [
      "Machine Learning",
      "Intelligent Systems",
      "AI Applications",
    ],
  },
  {
    number: "02",
    title: "AI Automation",
    short: "Automation",
    text: "Automation systems that connect tools, information and workflows to reduce repetitive work.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1400&q=85",
    icon: Zap,
    capabilities: ["Workflow Automation", "AI Agents", "System Integration"],
  },
  {
    number: "03",
    title: "Software Engineering",
    short: "Engineering",
    text: "Scalable web platforms, APIs, applications and digital products engineered around real needs.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85",
    icon: Layers3,
    capabilities: ["Web Platforms", "APIs", "Digital Products"],
  },
  {
    number: "04",
    title: "Web Development",
    short: "Web",
    text: "Responsive, accessible and high-performance websites and web applications built for modern businesses.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85",
    icon: Globe2,
    capabilities: ["Frontend", "Backend", "Full Stack"],
  },
  {
    number: "05",
    title: "WordPress Development",
    short: "WordPress",
    text: "Professional WordPress websites, custom experiences, performance improvements and business-focused builds.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1400&q=85",
    icon: Globe2,
    capabilities: ["Business Websites", "Custom Themes", "Optimization"],
  },
  {
    number: "06",
    title: "Mobile App Development",
    short: "Mobile",
    text: "Modern mobile applications designed around usability, reliability and real product requirements.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=85",
    icon: Layers3,
    capabilities: ["Android", "Mobile UI", "API Integration"],
  },
  {
    number: "07",
    title: "Data Analytics",
    short: "Data",
    text: "Data pipelines, analysis and visualization that turn information into useful decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    icon: Database,
    capabilities: ["Python", "Analytics", "Visualization"],
  },
  {
    number: "08",
    title: "Cybersecurity",
    short: "Security",
    text: "Security-minded software, monitoring systems and application protection.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=85",
    icon: ShieldCheck,
    capabilities: ["Application Security", "Monitoring", "Secure Development"],
  },
  {
    number: "09",
    title: "SEO Services",
    short: "SEO",
    text: "Technical and content-focused search optimization designed to improve discoverability and website foundations.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1400&q=85",
    icon: Search,
    capabilities: ["Technical SEO", "On-Page SEO", "Search Foundations"],
  },
  {
    number: "10",
    title: "Cloud & Integrations",
    short: "Cloud",
    text: "Connected cloud services, APIs and integrations that help technology systems work together.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
    icon: Globe2,
    capabilities: ["Cloud Services", "APIs", "Integrations"],
  },
];

const industries = [
  "Healthcare",
  "Agriculture",
  "Education",
  "Financial Services",
  "Manufacturing",
  "Logistics",
  "Energy",
  "Retail & Commerce",
  "Construction",
  "Research & Science",
  "Cybersecurity",
  "Public Services",
];

const projects = [
  {
    name: "AUREX",
    type: "Spatial Intelligence",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1600&q=88",
    description:
      "An exploration into intelligent understanding of physical environments, human spatial state and spatial information.",
    technologies: ["Python", "Computer Vision", "MediaPipe", "AI"],
  },
  {
    name: "ORVEXA",
    type: "AI Automation",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=88",
    description:
      "An autonomous workflow concept focused on planning, execution and intelligent task coordination.",
    technologies: ["Next.js", "FastAPI", "AI", "Automation"],
  },
  {
    name: "ATMOSIA",
    type: "Digital Product",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=88",
    description:
      "A live digital product exploring modern interfaces, real-time information and responsive experiences.",
    technologies: ["Web", "React", "Modern UI"],
  },
  {
    name: "NEXUS",
    type: "Productivity",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=88",
    description:
      "A focused productivity web experience designed around useful organization and everyday workflow management.",
    technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
  },
  {
    name: "SENTINEL",
    type: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=88",
    description:
      "A threat-monitoring system designed around security visibility and intelligent analysis.",
    technologies: ["FastAPI", "Python", "Security", "Monitoring"],
  },
  {
    name: "AETHER",
    type: "Language Model Research",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=88",
    description:
      "A CPU-conscious local language-model research project exploring model architecture and training foundations.",
    technologies: ["Python", "PyTorch", "LLM", "Research"],
  },
  {
    name: "KYNTRA",
    type: "Mobile Application",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=88",
    description:
      "A mobile application project focused on practical product development and a structured mobile experience.",
    technologies: ["Android", "Java", "Mobile", "UI"],
  },
];

const leadership = [
  {
    name: "Ammar Akram",
    role: "Founder & CEO",
    image: "/images/team/ammar-akram.jpg",
    initials: "AA",
    description:
      "Leads DEVWAVE's direction, product vision and technology strategy and Head of AIML Department.",
  },
  {
    name: "Waqas Siddiqui",
    role: "CTO",
    image: "/images/team/waqas-siddiqui.jpg",
    initials: "WS",
    description:
      "Leads engineering architecture, software development and technical execution.",
  },
  {
    name: "Muhammad Tayyab",
    role: "Head of Mobile Engineering",
    image: "/images/team/muhammad-tayyab.jpg",
    initials: "MT",
    description:
      "Leads mobile product engineering and application development.",
  },
  {
    name: "Saif Ali",
    role: "Head of Human Resources",
    image: "/images/team/saif-ali.jpg",
    initials: "SA",
    description:
      "Leads human resources, recruitment, team development, and people operations at DEVWAVE.",
  },
];

const searchableContent = [
  ...services.map((item) => ({
    title: item.title,
    type: "Service",
    href: "#services",
  })),
  ...internshipDomains.map((item) => ({
    title: item.title,
    type: "Internship",
    href: "/careers/internships",
  })),
  ...projects.map((item) => ({
    title: item.name,
    type: item.type,
    href: "#work",
  })),
  ...industries.map((item) => ({
    title: item,
    type: "Industry",
    href: "#industries",
  })),
  {
    title: "About DEVWAVE",
    type: "Company",
    href: "#about",
  },
  {
    title: "Leadership",
    type: "Company",
    href: "#leadership",
  },
  {
    title: "Careers",
    type: "Careers",
    href: "/careers",
  },
  {
    title: "Contact DEVWAVE",
    type: "Company",
    href: "#contact",
  },
];

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [themeReady, setThemeReady] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeInternship, setActiveInternship] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("devwave-theme");

    if (saved === "light" || saved === "dark" || saved === "system") {
      requestAnimationFrame(() => {
        setTheme(saved);
        setThemeReady(true);
      });
      return;
    }

    requestAnimationFrame(() => setThemeReady(true));
  }, []);

  useEffect(() => {
    if (!themeReady) return;

    const root = document.documentElement;

    const apply = (mode: ThemeMode) => {
      const resolved =
        mode === "system"
          ? window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark"
          : mode;

      root.dataset.theme = resolved;
      root.dataset.themeMode = mode;
    };

    apply(theme);
    window.localStorage.setItem("devwave-theme", theme);

    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => apply("system");

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme, themeReady]);

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
        setAboutOpen(false);
      }
    };

    window.addEventListener("keydown", keyboard);

    return () => window.removeEventListener("keydown", keyboard);
  }, []);

  useEffect(() => {
    document.body.style.overflow = searchOpen || aboutOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, aboutOpen]);

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return searchableContent.slice(0, 10);

    return searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query),
    );
  }, [search]);

  const cycleTheme = () => {
    setTheme((current) => {
      if (current === "system") return "light";
      if (current === "light") return "dark";
      return "system";
    });
  };

  const closeMobile = () => setMobileOpen(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="devwave-app">
      <header className="nav-shell">
        <div className="nav-inner">
          <button
            className="brand brand-button"
            onClick={() => setAboutOpen(true)}
            aria-label="Open About DEVWAVE"
          >
            <span className="brand-symbol brand-symbol-3d brand-logo-image">
              <img
                src="/logo.png"
                alt="DEVWAVE"
              />
            </span>

            <span>
              <strong>DEVWAVE</strong>
              <small>Technology. Innovation. Solutions.</small>
            </span>
          </button>

          <nav className="desktop-navigation" aria-label="Primary navigation">
            <Link href="#work">Work</Link>
            <Link href="#services">Services</Link>
            <Link href="#solutions">Solutions</Link>
            <Link href="#industries">Industries</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/candidate">Candidate Portal</Link>
          </nav>

          <div className="nav-tools">
            <button
              className="nav-icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search DEVWAVE"
              title="Search"
            >
              <Search size={17} />
            </button>

            <button
              className="theme-button"
              onClick={cycleTheme}
              aria-label="Change appearance"
              title={`Appearance: ${themeReady ? theme : "system"}`}
            >
              {!themeReady ? (
                <Sparkles size={16} />
              ) : theme === "light" ? (
                <Sun size={16} />
              ) : theme === "dark" ? (
                <Moon size={16} />
              ) : (
                <Sparkles size={16} />
              )}

              <span>
                {!themeReady
                  ? "System"
                  : theme === "system"
                    ? "System"
                    : theme === "light"
                      ? "Light"
                      : "Dark"}
              </span>
            </button>

            <Link href="#contact" className="nav-project">
              Start a Project
              <ArrowUpRight size={16} />
            </Link>

            <button
              className="mobile-menu-button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-navigation">
            <Link href="#work" onClick={closeMobile}>
              Work
            </Link>
            <Link href="#services" onClick={closeMobile}>
              Services
            </Link>
            <Link href="#solutions" onClick={closeMobile}>
              Solutions
            </Link>
            <Link href="#industries" onClick={closeMobile}>
              Industries
            </Link>
            <Link href="/careers/internships" onClick={closeMobile}>
              Internships
            </Link>
            <Link href="/careers" onClick={closeMobile}>
              Careers
            </Link>
            <Link href="/candidate" onClick={closeMobile}>
              Candidate Portal
            </Link>
            <Link href="#contact" onClick={closeMobile}>
              Contact
            </Link>

            <button onClick={cycleTheme} className="mobile-theme-control">
              Appearance:{" "}
              {!themeReady
                ? "System"
                : theme === "light"
                  ? "Light"
                  : theme === "dark"
                    ? "Dark"
                    : "System"}
            </button>
          </div>
        )}
      </header>

      {searchOpen && (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search DEVWAVE"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSearchOpen(false);
          }}
        >
          <div className="search-panel">
            <div className="search-header">
              <div>
                <span>DEVWAVE SEARCH</span>
                <h2>Find something.</h2>
              </div>

              <button
                className="nav-icon"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            <div className="search-input-wrap">
              <Search size={19} />

              <input
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search services, work, industries, careers..."
              />

              <kbd>ESC</kbd>
            </div>

            <div className="search-results">
              {results.length ? (
                results.map((result) => (
                  <Link
                    href={result.href}
                    key={`${result.type}-${result.title}`}
                    onClick={() => setSearchOpen(false)}
                  >
                    <div>
                      <span>{result.type}</span>
                      <strong>{result.title}</strong>
                    </div>
                    <ArrowUpRight size={17} />
                  </Link>
                ))
              ) : (
                <div className="search-empty">
                  <Search size={22} />
                  <strong>No results found</strong>
                  <p>Try another search term.</p>
                </div>
              )}
            </div>

            <div className="search-footer">
              <span>
                <kbd>CTRL</kbd> <kbd>K</kbd> Search
              </span>
              <span>ESC Close</span>
            </div>
          </div>
        </div>
      )}

      {aboutOpen && (
        <div
          className="about-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="About DEVWAVE"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setAboutOpen(false);
          }}
        >
          <div className="about-modal">
        <div className="about-modal-top">
          <span>DEVWAVE / ABOUT</span>

          <button
            className="nav-icon"
            onClick={() => setAboutOpen(false)}
            aria-label="Close About"
          >
            <X size={18} />
          </button>
        </div>

        <div className="about-modal-grid">
          <div className="about-modal-mark">
            <span>DW</span>
            <small>
              TECHNOLOGY
              <br />
              INNOVATION
              <br />
              SOLUTIONS
            </small>
          </div>

          <div className="about-modal-content">
            <div className="section-label">ABOUT DEVWAVE</div>

            <h2>Technology built with purpose.</h2>

            <p className="about-lead">
              DEVWAVE is a technology company focused on intelligent software,
              artificial intelligence, automation, and digital products.
            </p>

            <p>
              We turn meaningful ideas and complex problems into reliable,
              practical technology designed for real-world use.
            </p>

            <div className="about-principles">
              <span>Innovation</span>
              <span>Reliability</span>
              <span>Simplicity</span>
            </div>

            <Link
              href="#contact"
              className="button button-dark"
              onClick={() => setAboutOpen(false)}
            >
              Start a conversation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )}
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow">
            <i />
            PAKISTAN <span>&bull;</span> GLOBAL
          </div>

          <h1>
            Technology
            <em>with purpose.</em>
          </h1>

          <p>
            DEVWAVE builds intelligent software, AI systems, automation and
            digital products designed to solve meaningful real-world problems.
          </p>

          <div className="hero-actions">
            <Link href="#solutions" className="button button-dark">
              Explore DEVWAVE
              <ArrowRight size={17} />
            </Link>

            <Link href="/careers/internships" className="button button-outline">
              Explore Internships
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="hero-meta">
            <span>AI & MACHINE LEARNING</span>
            <span>SOFTWARE ENGINEERING</span>
            <span>INTELLIGENT SYSTEMS</span>
          </div>
        </div>

        <div className="hero-architecture" aria-hidden="true">
          <div className="architecture-frame">
            <div className="architecture-top">
              <span>DEVWAVE / SYSTEM 01</span>
              <span>INTELLIGENCE</span>
            </div>

            <div className="architecture-core">
              <div className="core-square">
                <span>DW</span>
              </div>

              <div className="core-line line-one" />
              <div className="core-line line-two" />
              <div className="core-line line-three" />

              <div className="core-point point-one" />
              <div className="core-point point-two" />
              <div className="core-point point-three" />
            </div>

            <div className="architecture-bottom">
              <span>01</span>
              <span>ENGINEER / INTELLIGENCE / SCALE</span>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-section section" id="about">
        <div className="section-label">01 / ABOUT DEVWAVE</div>

        <div className="intro-grid">
          <h2>
            We build technology
            <span>for the real world.</span>
          </h2>

          <div className="intro-text">
            <p className="large-text">
              DEVWAVE is an innovation-led technology company focused on software, artificial intelligence, automation, and emerging technologies.</p>

            <p>We combine engineering and product thinking to turn complex ideas into reliable technology that creates real-world value.</p>

            <button className="text-button" onClick={() => setAboutOpen(true)}>
              Read about DEVWAVE
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="services-section section" id="services">
        <div className="section-heading">
          <div>
            <div className="section-label">02 / CAPABILITIES</div>
            <h2>What we build.</h2>
          </div>

          <p>
            Technology capabilities designed to work together rather than exist
            as isolated services.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            const active = activeService === service.number;

            return (
              <article
                className={`service-card ${active ? "is-active" : ""}`}
                key={service.number}
              >
                <div className="service-image">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.opacity = "0";
                    }}
                  />

                  <div className="service-image-overlay">
                    <Icon size={24} strokeWidth={1.4} />
                    <span>{service.short}</span>
                  </div>
                </div>

                <div className="service-content">
                  <div className="service-number">{service.number}</div>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>

                  <div className="service-capabilities">
                    {service.capabilities.map((capability) => (
                      <span key={capability}>{capability}</span>
                    ))}
                  </div>

                  <button
                    className="card-link card-button"
                    onClick={() =>
                      setActiveService(active ? null : service.number)
                    }
                    aria-expanded={active}
                  >
                    {active ? "Close capability" : "Explore capability"}
                    {active ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ArrowUpRight size={15} />
                    )}
                  </button>

                  {active && (
                    <div className="service-expanded">
                      <span>DEVWAVE CAPABILITY</span>
                      <strong>
                        Built around practical requirements, reliability and
                        long-term product value.
                      </strong>
                      <Link href="#contact">
                        Discuss this service
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="solutions-section section" id="solutions">
        <div className="solution-panel">
          <div className="section-label">03 / SOLUTIONS</div>

          <h2>
            From complex problems
            <span>to intelligent systems.</span>
          </h2>

          <p>
            We connect data, software, intelligence and automation into
            practical technology systems that can evolve with the needs of the
            people using them.
          </p>

          <div className="solution-list">
            <div>
              <span>01</span>
              <strong>Understand</strong>
              <p>Turn complex information into useful intelligence.</p>
            </div>

            <div>
              <span>02</span>
              <strong>Connect</strong>
              <p>Bring systems, data and workflows together.</p>
            </div>

            <div>
              <span>03</span>
              <strong>Automate</strong>
              <p>Reduce repetitive work through intelligent processes.</p>
            </div>

            <div>
              <span>04</span>
              <strong>Scale</strong>
              <p>Engineer foundations that can grow with the product.</p>
            </div>
          </div>
        </div>

        <div className="solution-visual">
          <div className="visual-grid" />
          <div className="visual-square square-one" />
          <div className="visual-square square-two" />
          <div className="visual-square square-three" />

          <div className="visual-center">
            <Sparkles size={21} />
            <span>DEVWAVE</span>
            <small>INTELLIGENCE SYSTEM</small>
          </div>
        </div>
      </section>

      <section className="industries-section section" id="industries">
        <div className="section-heading">
          <div>
            <div className="section-label">04 / INDUSTRIES</div>
            <h2>Technology without boundaries.</h2>
          </div>

          <p>
            Our capabilities can be adapted to different industries,
            environments and operational challenges.
          </p>
        </div>

        <div className="industry-list">
          {industries.map((industry, index) => (
            <div className="industry-row" key={industry}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{industry}</strong>
              <ArrowUpRight size={17} />
            </div>
          ))}
        </div>
      </section>

      <section className="work-section section" id="work">
        <div className="section-heading">
          <div>
            <div className="section-label">05 / SELECTED WORK</div>
            <h2>Ideas becoming systems.</h2>
          </div>

          <p>
            Technology work exploring artificial intelligence, automation,
            spatial intelligence, cybersecurity, data and digital products.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => {
            const active = activeProject === project.name;

            return (
              <article
                className={`project-card ${active ? "is-active" : ""}`}
                key={project.name}
              >
                <div className={`project-visual project-${index + 1}`}>
                  <img
                    src={project.image}
                    alt={`${project.name} project visual`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.opacity = "0";
                    }}
                  />

                  <div className="project-visual-content">
                    <span>{project.name}</span>
                    <small>{project.type}</small>
                  </div>

                  <div className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="project-info">
                  <span>{project.type}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  <div className="project-tech">
                    {project.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>

                  <button
                    className="card-link card-button"
                    onClick={() =>
                      setActiveProject(active ? null : project.name)
                    }
                    aria-expanded={active}
                  >
                    {active ? "Close details" : "View details"}
                    {active ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ArrowUpRight size={15} />
                    )}
                  </button>

                  {active && (
                    <div className="project-expanded">
                      <strong>Project focus</strong>
                      <p>
                        A DEVWAVE technology initiative exploring practical
                        engineering, product development and intelligent
                        systems.
                      </p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="internships-section section" id="internships">
        <div className="internship-header">
          <div>
            <div className="section-label">06 / INTERNSHIPS</div>
            <h2>Start building with DEVWAVE.</h2>
          </div>

          <p>
            Practical internship opportunities across modern technology
            disciplines. Choose the area you want to grow in and begin your
            application.
          </p>
        </div>

        <div className="program-status">
          <div>
            <span>PROGRAM</span>
            <strong>Unpaid Internship</strong>
          </div>
          <div>
            <span>STIPEND</span>
            <strong>Performance-Based</strong>
          </div>
          <div>
            <span>AREAS</span>
            <strong>6 Technology Domains</strong>
          </div>
          <Link href="/careers/internships">
            View program
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="internship-grid">
          {internshipDomains.map((domain) => {
            const active = activeInternship === domain.id;

            return (
              <article
                className={`internship-card ${active ? "is-active" : ""}`}
                key={domain.id}
              >
                <button
                  className="internship-card-main"
                  onClick={() => setActiveInternship(active ? null : domain.id)}
                  aria-expanded={active}
                >
                  <div className="internship-top">
                    <span>{domain.id}</span>
                    <span>{domain.category}</span>
                  </div>

                  <h3>{domain.title}</h3>
                  <p>{domain.description}</p>

                  <div className="skill-row">
                    {domain.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>

                  <div className="internship-action">
                    <span>{active ? "Selected" : "View opportunity"}</span>
                    {active ? <Check size={17} /> : <ArrowUpRight size={17} />}
                  </div>
                </button>

                {active && (
                  <div className="internship-expanded">
                    <div>
                      <strong>Program</strong>
                      <span>Unpaid Internship</span>
                    </div>

                    <div>
                      <strong>Stipend</strong>
                      <span>Performance-Based</span>
                    </div>

                    <p>
                      Practical learning, project-based work, professional
                      guidance and real-world technology exposure.
                    </p>

                    <Link
                      href="/careers/internships/apply"
                      className="button button-dark"
                    >
                      Apply for this internship
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="careers-section section" id="careers">
        <div className="careers-panel">
          <div>
            <div className="section-label">07 / CAREERS</div>

            <h2>
              Build meaningful
              <span>technology with us.</span>
            </h2>
          </div>

          <div>
            <p>
              We are building DEVWAVE for engineers, creators, researchers and
              problem-solvers who want to work on ambitious technology.
            </p>

            <div className="career-actions">
              <Link href="/careers" className="button button-dark">
                Explore Careers
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/careers/internships"
                className="button button-outline"
              >
                Internships
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="leadership-section section" id="leadership">
        <div className="section-heading">
          <div>
            <div className="section-label">08 / LEADERSHIP</div>
            <h2>The people behind DEVWAVE.</h2>
          </div>

          <p>
            A multidisciplinary leadership team combining engineering,
            artificial intelligence, mobile development and product thinking.
          </p>
        </div>

        <div className="leadership-grid">
          {leadership.map((person, index) => (
            <article className="leader-card" key={person.name}>
              <div className="leader-photo">
                <img
                  src={person.image}
                  alt={person.name}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <span>{person.initials}</span>
                <small>0{index + 1}</small>
              </div>

              <div className="leader-copy">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                <span>{person.description}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section section" id="contact">
        <div className="contact-panel">
          <div className="section-label">09 / CONTACT</div>

          <div className="contact-grid">
            <div>
              <h2>
                Have a problem
                <span>worth solving?</span>
              </h2>

              <p>
                Tell us what you are trying to build, improve or rethink.
                Let&apos;s explore the technology behind it.
              </p>
            </div>

            <div className="contact-actions">
              <a
                href="mailto:devwavelimited@gmail.com"
                className="contact-action"
              >
                <Mail size={18} />
                <span>
                  <small>Email</small>
                  devwavelimited@gmail.com
                </span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="https://chat.whatsapp.com/Du388LCGTI88Sg9Iq8FLRH?s=cl&p=a&mlu=4&ilr=4"
                target="_blank"
                rel="noreferrer"
                className="contact-action"
              >
                <MessageCircle size={18} />
                <span>
                  <small>WhatsApp</small>
                  Direct message / community
                </span>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://www.linkedin.com/company/145228972/"
                target="_blank"
                rel="noreferrer"
                className="contact-action"
              >
                <span className="social-letter" aria-hidden="true">
                  in
                </span>
                <span>
                  <small>LinkedIn</small>
                  DEVWAVE
                </span>
                <ExternalLink size={16} />
              </a>

              <Link href="/careers" className="contact-action">
                <Sparkles size={18} />
                <span>
                  <small>Careers</small>
                  Work with DEVWAVE
                </span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <button className="brand brand-button" onClick={scrollTop}>
              <span className="brand-symbol">
                <span>DW</span>
              </span>

              <span>
                <strong>DEVWAVE</strong>
                <small>Technology. Innovation. Solutions.</small>
              </span>
            </button>

            <p>Building intelligent technology for the real world.</p>

            <div className="footer-social">
              <a
                href="https://www.linkedin.com/company/145228972/"
                target="_blank"
                rel="noreferrer"
                aria-label="DEVWAVE LinkedIn"
              >
                <span className="social-letter" aria-hidden="true">
                  in
                </span>
              </a>

              <a
                href="https://www.instagram.com/devwavelimited"
                target="_blank"
                rel="noreferrer"
                aria-label="DEVWAVE Instagram"
              >
                <span>IG</span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61594505496853"
                target="_blank"
                rel="noreferrer"
                aria-label="DEVWAVE Facebook"
              >
                <span>F</span>
              </a>
              <a
                href="https://youtube.com/@devwavelimited?si=Y9QzzBYrhRa-qYeX"
                target="_blank"
                rel="noreferrer"
                aria-label="DEVWAVE YouTube"
              >
                <span>YT</span>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div>
              <span>Explore</span>
              <Link href="#work">Work</Link>
              <Link href="#services">Services</Link>
              <Link href="#solutions">Solutions</Link>
              <Link href="#industries">Industries</Link>
            </div>

            <div>
              <span>Company</span>
              <button onClick={() => setAboutOpen(true)}>About</button>
              <Link href="#leadership">Leadership</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/careers/internships">Internships</Link>
            </div>

            <div>
              <span>Connect</span>
              <a href="mailto:devwavelimited@gmail.com">Email</a>
              <a
                href="https://www.instagram.com/devwavelimited"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61594505496853"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&bull;</span>
          <span>&bull;</span>
        </div>
      </footer>

      <button
        className="back-to-top"
        onClick={scrollTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUpRight size={17} />
      </button>
    </main>
  );
}
