import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://devwave-limited.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  verification: {
    google: "usuaieeMeMJqrVO6Pjl_G-rgAAJdAXJyKilCc-ypRMk",
  },

  title: {
    default: "DEVWAVE LIMITED | Technology. Innovation. Solutions.",
    template: "%s | DEVWAVE LIMITED",
  },

  applicationName: "DEVWAVE LIMITED",

  description:
    "DEVWAVE LIMITED builds intelligent software, AI systems, automation solutions, digital products, and technology services for real-world problems.",

  keywords: [
    "DEVWAVE LIMITED",
    "DEVWAVE",
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

  authors: [
    {
      name: "DEVWAVE LIMITED",
      url: siteUrl,
    },
  ],

  creator: "DEVWAVE LIMITED",
  publisher: "DEVWAVE LIMITED",

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

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "DEVWAVE LIMITED",
    title: "DEVWAVE LIMITED | Technology. Innovation. Solutions.",
    description:
      "DEVWAVE LIMITED builds intelligent software, AI systems, automation solutions, digital products, and technology services for real-world problems.",
  },

  twitter: {
    card: "summary_large_image",
    title: "DEVWAVE LIMITED | Technology. Innovation. Solutions.",
    description:
      "DEVWAVE LIMITED builds intelligent software, AI systems, automation solutions, digital products, and technology services for real-world problems.",
  },

  category: "technology",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DEVWAVE LIMITED",
  alternateName: "DEVWAVE",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "DEVWAVE LIMITED builds intelligent software, AI systems, automation solutions, digital products, and technology services for real-world problems.",
  email: "devwavelimited@gmail.com",
  sameAs: [
    "https://www.linkedin.com/company/145228972/",
    "https://www.instagram.com/devwavelimited",
    "https://www.facebook.com/profile.php?id=61594505496853",
    "https://youtube.com/@devwavelimited",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DEVWAVE LIMITED",
  alternateName: "DEVWAVE",
  url: siteUrl,
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
