import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import EditorialGuide from '@/components/EditorialGuide';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import SiteHeader from '@/components/SiteHeader';
import WiseFeeEstimator from '@/components/WiseFeeEstimator';
import { faqs } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Wise Fee Calculator',
  description:
    "Estimate Wise transfer fees for any currency corridor. Wise's pricing is per-route rather than a flat card rate — enter your own rate for an accurate Gross, fee, and Net breakdown.",
};

export default function WiseFeeCalculatorPage() {
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
          Wise fee calculator
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Estimate Wise transfer fees.
        </h1>
        <p className="mt-4 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          Wise prices each currency corridor individually rather than publishing one flat rate.
          Look up your route&apos;s fee at wise.com/pricing, plug it in below, and see the exact
          Gross, fee, and Net either direction.
        </p>
      </section>

      <section className="relative mx-auto flex max-w-3xl justify-center px-4 pb-16">
        <WiseFeeEstimator />
      </section>

      <section className="relative mx-auto max-w-3xl space-y-12 px-4 pb-16">
        <EditorialGuide focus="wise" />
        <FaqSection faqs={faqs} />
      </section>

      <div className="relative mx-auto max-w-3xl px-4">
        <AdUnit />
      </div>

      <Footer />
    </main>
  );
}
