import type { Metadata } from "next";
import Timeline from "@/src/components/sections/Timeline";
import { getAllNewsEntries } from "@/src/lib/content";
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
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">A work in progress</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">About</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Building a thoughtful practice around useful products, clear systems, and the courage to keep learning.
        </p>
      </header>

      <section className="mt-16 max-w-3xl md:mt-20" aria-labelledby="bio-heading">
        <h2 id="bio-heading" className="text-2xl font-semibold tracking-tight">
          Who I am
        </h2>
        <div className="mt-5 space-y-5 text-base leading-8 text-muted">
          <p>
            I am Dinesh, a builder who likes turning half-formed ideas into things people can actually use. This site is a place to share that process: the projects, experiments, and small decisions that usually stay hidden behind a finished screen.
          </p>
          <p>
            I am building toward founding my own company, slowly and deliberately. Along the way, I am paying attention to the details that make products feel trustworthy: clear thinking, useful constraints, and interfaces that respect a person&apos;s time.
          </p>
          <p>
            There is no neat finish line here. The work is to keep making, documenting what I learn, and let each project sharpen the next question.
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
          <p className="mt-3 text-base leading-7 text-muted">
            A running record of the steps, projects, and questions shaping the work.
          </p>
        </div>
        <Timeline entries={getAllNewsEntries()} />
      </section>
    </div>
  );
}