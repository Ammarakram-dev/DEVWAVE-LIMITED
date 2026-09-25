import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://devwavelimited.com";

export const metadata: Metadata = {
  verification: { google: "usuaieeMeMJqrVO6Pjl_G-rgAAJdAXJyKilCc-ypRMk" },
  metadataBase: new URL(siteUrl),

  title: {
    default: "DEVWAVE â€” Technology. Innovation. Solutions.",
    template: "%s | DEVWAVE",
  },

  description:
    "DEVWAVE builds intelligent software, AI systems, automation solutions, digital products, and technology services for real-world problems.",

  keywords: [
    "DEVWAVE",
    "DEVWAVE Limited",
    "Artificial Intelligence",
    "AI",
    "Machine Learning",
    "AI Automation",
    "Software Engineering",
    "Web Development",
    "App Development",
    "Data Analytics",
    "Cybersecurity",
    "SEO Services",
    "Cloud Solutions",
    "Technology Solutions",
  ],

  applicationName: "DEVWAVE",

  authors: [
    {
      name: "DEVWAVE",
      url: siteUrl,
    },
  ],

  creator: "DEVWAVE",
  publisher: "DEVWAVE",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "DEVWAVE",
    title: "DEVWAVE â€” Technology. Innovation. Solutions.",
    description:
      "Building intelligent software, AI systems, automation solutions, and digital technology for the real world.",
  },

  twitter: {
    card: "summary_large_image",
    title: "DEVWAVE â€” Technology. Innovation. Solutions.",
    description:
      "Building intelligent software, AI systems, automation solutions, and digital technology for the real world.",
  },

  category: "technology",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DEVWAVE",
  legalName: "DEVWAVE LIMITED",
  url: siteUrl,
  logo: `${siteUrl}/icon`,
  description:
    "Technology company building intelligent software, AI systems, automation solutions, and digital products.",
  email: "devwavelimited@gmail.com",
  sameAs: [
    "https://www.linkedin.com/company/145228972/",
    "https://www.instagram.com/devwavelimited",
    "https://www.facebook.com/profile.php?id=61594505496853",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DEVWAVE",
  url: siteUrl,
  description: "DEVWAVE â€” Technology. Innovation. Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {children}
      </body>
    </html>
  );
}
