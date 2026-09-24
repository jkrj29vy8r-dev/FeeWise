import AdUnit from '@/components/AdUnit';
import EditorialGuide from '@/components/EditorialGuide';
import FaqSection from '@/components/FaqSection';
import FeeCalculator from '@/components/FeeCalculator';
import Footer from '@/components/Footer';
import SiteHeader from '@/components/SiteHeader';
import StripeFeesArticle from '@/components/StripeFeesArticle';
import { faqs } from '@/lib/faqs';

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FeeWise',
  url: 'https://payfeewise.com',
  description:
    'Free Stripe, PayPal, and Wise payment processing fee calculator. Figure out what to charge, or what you will actually take home, in USD, EUR, or GBP.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function Home() {
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
          Stripe calculator &amp; PayPal fee calculator
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Know exactly what you&apos;ll take home.
        </h1>
        <p className="mt-4 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          A free Stripe fee calculator and PayPal fee calculator in one place — compare Stripe,
          PayPal, and Wise fees side by side, in either direction, and figure out what to charge
          or what a target payout will actually cost.
        </p>
      </section>

      <section className="relative mx-auto flex max-w-3xl justify-center px-4 pb-16">
        <FeeCalculator />
      </section>

      <section className="relative mx-auto max-w-3xl space-y-12 px-4 pb-16">
        <StripeFeesArticle />
        <EditorialGuide />
        <FaqSection faqs={faqs} />
      </section>

      <div className="relative mx-auto max-w-3xl px-4">
        <AdUnit />
      </div>

      <Footer />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
    </main>
  );
}
