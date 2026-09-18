import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import EditorialGuide from '@/components/EditorialGuide';
import FaqSection from '@/components/FaqSection';
import FeeCalculator from '@/components/FeeCalculator';
import Footer from '@/components/Footer';
import SiteHeader from '@/components/SiteHeader';
import { faqs } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'PayPal Fee Calculator',
  description:
    'Free PayPal fee calculator for US domestic and international checkout. Instantly see the Gross, Processing fee, and Net amount for any payment.',
};

export default function PaypalFeeCalculatorPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.12),transparent)]"
      />

      <SiteHeader />

      <div className="relative mx-auto max-w-3xl px-4">
        <AdUnit />
      </div>

      <section className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pb-16 pt-8 text-center sm:pt-12">
        <span className="mb-4 text-xs font-medium uppercase tracking-wide text-primary">
          PayPal fee calculator
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Calculate PayPal fees instantly.
        </h1>
        <p className="mt-4 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          US Domestic (2.89% + $0.30) and International (3.49% + $0.49) — enter an amount either
          direction and see the exact Gross, fee, and Net.
        </p>
      </section>

      <section className="relative mx-auto flex max-w-3xl justify-center px-4 pb-16">
        <FeeCalculator defaultProcessor="paypal" />
      </section>

      <section className="relative mx-auto max-w-3xl space-y-12 px-4 pb-16">
        <EditorialGuide focus="paypal" />
        <FaqSection faqs={faqs} />
      </section>

      <div className="relative mx-auto max-w-3xl px-4">
        <AdUnit />
      </div>

      <Footer />
    </main>
  );
}
