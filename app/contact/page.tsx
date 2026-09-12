import type { Metadata } from "next";
import ContactForm from "@/src/components/sections/ContactForm";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Contact | Dinesh Narada",
  "Get in touch with Dinesh Narada about a project idea, question, or conversation.",
);

const socialLinks = [
  { href: "https://github.com/Dinesh-N98", label: "GitHub" },
  { href: "https://www.linkedin.com/in/d-narada/", label: "LinkedIn" },
  { href: "https://x.com/DineshNarada98", label: "Twitter / X" },
  { href: "mailto:kalyanadineshnarada@gmail.com", label: "Email" },
];

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <header className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">Open channel</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Get in touch</h1>
          <p className="mt-4 text-base leading-7 text-muted">
            Have a project idea, a question, or just want to say hi? I would be glad to hear from you.
          </p>
      </header>

      <div className="mt-14 grid gap-14 border-t border-white/10 pt-14 md:mt-20 md:grid-cols-[minmax(0,34rem)_minmax(12rem,1fr)] md:gap-20 md:pt-20">
        <ContactForm />

        <aside aria-labelledby="social-heading">
          <h2 id="social-heading" className="text-xl font-semibold tracking-tight">
            Elsewhere
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">You can also find me around the web.</p>
          <nav aria-label="Social links" className="mt-6 flex flex-col items-start gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}