import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internship Application",
  description:
    "Apply for a DEVWAVE internship and join our technology, AI, software, data, cybersecurity, or app development programs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternshipApplyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}