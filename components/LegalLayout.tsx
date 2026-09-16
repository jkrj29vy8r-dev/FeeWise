import Link from 'next/link';

export default function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.12),transparent)]"
      />

      <header className="relative mx-auto flex max-w-3xl items-center justify-between px-4 pt-8">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          FeeWise
        </Link>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to calculator
        </Link>
      </header>

      <article className="relative mx-auto max-w-3xl space-y-6 px-4 pb-16 pt-10">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {children}
      </article>

      <footer className="relative mx-auto max-w-3xl px-4 pb-12 text-center text-xs text-muted-foreground">
        <p>FeeWise — clear fees, confident pricing.</p>
      </footer>
    </main>
  );
}
