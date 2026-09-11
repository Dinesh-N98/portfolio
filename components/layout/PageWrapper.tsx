import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return <main className="mx-auto w-full max-w-shell flex-1 px-page">{children}</main>;
}