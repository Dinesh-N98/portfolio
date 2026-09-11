interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return <p className="flex min-h-32 items-center justify-center text-center text-muted">{message}</p>;
}
