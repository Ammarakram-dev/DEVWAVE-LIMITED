import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidate Portal",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CandidateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}