import type { Metadata } from "next";
import Timeline from "@/src/components/sections/Timeline";
import { getAllNewsEntries } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "News | Dinesh Narada",
  description: "A changelog of personal notes, project updates, and the work taking shape over time.",
};

export default function NewsPage() {
  return (
    <div className="py-16 md:py-24">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">A running changelog</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">News &amp; Updates</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Small notes on what I&apos;m building, learning, and thinking about along the way.
        </p>
      </header>

      <Timeline entries={getAllNewsEntries()} />
    </div>
  );
}