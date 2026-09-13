import type { Metadata } from "next";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "About | Dinesh Narada",
  "A little about Dinesh Narada, the work in progress, and the ideas shaping the journey.",
);

const focusAreas = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Full-Stack Development",
  "Product Thinking",
  "Accessible Interfaces",
  "Startup Building",
];

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">A work in progress</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Building useful products with clear systems and a full-stack developer&apos;s eye for how the pieces actually fit together.
        </p>
      </header>

      <section className="mt-16 max-w-3xl md:mt-20" aria-labelledby="bio-heading">
        <h2 id="bio-heading" className="text-2xl font-semibold tracking-tight">Who I am</h2>
        <div id="bio-heading" className="space-y-5 text-base leading-8 text-muted">
          <p>
            I&apos;m Dinesh, a full-stack developer who likes turning half-formed ideas into things people can actually use from the database to the deployed interface. This site is where I document that process: the projects, experiments, and small decisions that usually stay hidden behind a finished screen.
          </p>
          <p>
            I care about the details that make products feel trustworthy: clear thinking, useful constraints, and interfaces that respect a person&apos;s time. Alongside the day-to-day work, I&apos;m slowly building toward founding something of my own; not as a countdown, but as the thread that shapes how I approach everything I build now.
          </p>
          <p>
            There&apos;s no neat finish line here. The work is to keep making, documenting what I learn, and let each project sharpen the next question.
          </p>
        </div>
      </section>

      <section className="mt-16 border-t border-white/10 pt-16 md:mt-20 md:pt-20" aria-labelledby="focus-heading">
        <div className="max-w-2xl">
          <h2 id="focus-heading" className="text-2xl font-semibold tracking-tight">
            Skills and focus
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            The tools and ideas I keep returning to while building this practice.
          </p>
        </div>
        <div className="mt-6 flex max-w-3xl flex-wrap gap-2">
          {focusAreas.map((area) => (
            <span key={area} className="rounded-full border border-accent/30 px-3 py-1.5 text-sm text-accent">
              {area}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-white/10 pt-16 md:mt-20 md:pt-20" aria-labelledby="journey-heading">
        <div className="mb-8 max-w-2xl">
          <h2 id="journey-heading" className="text-2xl font-semibold tracking-tight">
            My Journey
          </h2>
        </div>
        {/* Intentionally a placeholder for prose journey content to be added later. */}
        <p className="min-h-32 text-base leading-7 text-muted">
          Coming soon. (The story of how I got here.)
        </p>
      </section>
    </div>
  );
}