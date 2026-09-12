import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import { siteUrl } from "@/src/lib/metadata";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Dinesh Narada",
  description: "A personal portfolio site for Dinesh Narada.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Dinesh Narada",
    description: "A personal portfolio site for Dinesh Narada.",
    type: "website",
    images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: "Dinesh Narada portfolio" }],
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} flex min-h-screen flex-col`}>
        <Navbar />
        <PageWrapper>{children}</PageWrapper>
        <Footer />
      </body>
    </html>
  );
}
