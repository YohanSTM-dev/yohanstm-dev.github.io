import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Yohan Saint-Marc | MacOS Portfolio",
  description:
    "Portfolio one-page style bureau MacOS conçu avec Next.js, Tailwind CSS, GSAP, React Three Fiber et Zustand."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
