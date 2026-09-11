export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-full max-w-shell flex-1 px-page">{children}</main>;
}