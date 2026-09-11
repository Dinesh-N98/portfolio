import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/Dinesh-N98", label: "GitHub" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Twitter / X" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-shell flex-col gap-6 px-page py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Dinesh Narada</p>

        <nav aria-label="Footer navigation" className="flex gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Social links" className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}