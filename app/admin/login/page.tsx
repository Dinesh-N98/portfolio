import { signIn } from "@/auth";

async function signInWithGitHub() {
  "use server";

  await signIn("github");
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16 md:py-24">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Admin Login</h1>
        <form action={signInWithGitHub} className="mt-8">
          <button
            type="submit"
            className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Sign in with GitHub
          </button>
        </form>
      </div>
    </div>
  );
}
