import EmptyState from "@/src/components/ui/EmptyState";
import type { NewsEntry } from "@/src/types/content";

interface TimelineProps {
  entries: NewsEntry[];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${date}T00:00:00`));
}

export default function Timeline({ entries }: TimelineProps) {
  if (entries.length === 0) {
    return <EmptyState message="No journey entries yet - check back soon." />;
  }

  return (
    <ol className="relative ml-2 border-l border-accent/40">
      {entries.map((entry) => (
        <li key={`${entry.date}-${entry.title}`} className="relative pb-10 pl-8 last:pb-0">
          <span
            className="absolute -left-[0.4375rem] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-accent"
            aria-hidden="true"
          />
          <article className="rounded-lg border border-white/10 bg-white/[0.03] p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <time dateTime={entry.date} className="text-sm text-accent">
                {formatDate(entry.date)}
              </time>
              {entry.category && (
                <span className="rounded-full border border-accent/30 px-2.5 py-1 text-xs text-accent">
                  {entry.category}
                </span>
              )}
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">{entry.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{entry.description}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}