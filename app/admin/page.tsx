export default function AdminPage() {
  return (
    <div className="py-16 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Admin</h1>
      <nav className="mt-8" aria-label="Admin navigation">
        <a
          href="/admin/projects"
          className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Manage Top Projects
        </a>
      </nav>
    </div>
  );
}
