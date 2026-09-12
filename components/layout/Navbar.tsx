"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-page">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          onClick={() => setIsOpen(false)}
        >
          Dinesh Narada
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
          </span>
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-white/10 px-page py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-shell flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-11 items-center rounded-md px-3 py-3 text-base text-muted transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}