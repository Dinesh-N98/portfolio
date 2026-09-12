import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-white/10 py-20 md:py-32">
      <div className="max-w-3xl">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-accent">Dinesh Narada</p>
        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">Making room for useful ideas.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          A personal space for thoughtful interfaces, small tools, and the work behind them.
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          See my work
        </Link>
      </div>
    </section>
  );
}