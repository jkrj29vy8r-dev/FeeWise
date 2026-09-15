import FeeCalculator from '@/components/FeeCalculator';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_50%_at_50%_0%,rgba(52,211,153,0.12),transparent)]"
      />

      <section className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pb-16 pt-24 text-center sm:pt-32">
        <span className="mb-4 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium tracking-wide text-emerald-400">
          FeeWise
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Know exactly what you&apos;ll take home.
        </h1>
        <p className="mt-4 max-w-xl text-balance text-base text-slate-400 sm:text-lg">
          Enter an amount and see precisely what to charge or what lands in your account after
          payment processing fees.
        </p>
      </section>

      <section className="relative mx-auto flex max-w-3xl justify-center px-4 pb-24">
        <FeeCalculator />
      </section>
    </main>
  );
}
