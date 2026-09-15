import FeeCalculator from '@/components/FeeCalculator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">FeeWise</h1>
      <p className="mb-8 text-slate-600">Know exactly what to charge or what you'll receive.</p>
      <FeeCalculator />
    </main>
  );
}
