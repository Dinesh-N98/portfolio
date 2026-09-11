import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Dinesh Narada",
  description: "A personal portfolio site for Dinesh Narada.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
