import Link from 'next/link';
import AdUnit from '@/components/AdUnit';
import FeeCalculator from '@/components/FeeCalculator';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is the difference between Gross, Net, and the Processing fee?',
    answer:
      'Gross is the total amount charged to the payer. The Processing fee is the cut the payment processor (Stripe or PayPal) keeps. Net is what actually lands in your account, calculated as Gross minus the Processing fee. FeeWise always shows all three figures so you can see exactly where the money goes.',
  },
  {
    question: 'How is the Stripe processing fee calculated for US domestic cards?',
    answer:
      "Stripe's standard US domestic rate is 2.9% of the transaction plus a fixed $0.30 per charge: Fee = (Gross × 0.029) + $0.30. For example, a $100.00 charge incurs a $3.20 fee ($100 × 0.029 = $2.90, plus $0.30), leaving a $96.80 net.",
  },
  {
    question: 'What formula does FeeWise use for "I want to receive" mode?',
    answer:
      'To gross up a target Net payout so the fee is covered on top, the formula is Gross = (Target Net + Fixed Fee) / (1 − Fee Rate). For Stripe US domestic (2.9% + $0.30) and a $1,000 target net, that works out to Gross = ($1,000 + $0.30) / (1 − 0.029) = $1,030.18, with a $30.18 processing fee — so the $1,000 you wanted lands exactly as net.',
  },
  {
    question: "Why can't I just add the fee percentage straight to my target amount?",
    answer:
      "Because the percentage fee is calculated on the Gross amount you charge, not on the Net amount you want to keep — so simply adding 2.9% of your target Net undercharges every time. Solving Gross = (Net + Fixed Fee) / (1 − Rate) accounts for the fact that the fee itself grows as the gross amount grows, which is why the formula divides by (1 − Rate) instead of just adding the rate on top.",
  },
  {
    question: 'What is the Stripe fee for international cards?',
    answer:
      "Stripe's international card rate is 3.9% plus $0.30 per charge — a full percentage point higher than the 2.9% US domestic rate — to cover the additional cross-border interchange, currency-conversion, and fraud-risk costs of accepting a card issued outside your home country.",
  },
  {
    question: 'How does Stripe ACH bank transfer pricing work?',
    answer:
      "Stripe's ACH debit fee is 0.8% of the transaction amount, with no fixed per-charge fee, but it is floored at $0.30 and capped at $5.00 per transaction. That cap is why ACH becomes dramatically cheaper than card payments for large invoices: a $10,000 ACH transfer costs $5.00 in fees (capped), versus roughly $290+ on a card.",
  },
  {
    question: "How do PayPal's fees compare to Stripe's?",
    answer:
      "PayPal's US domestic rate is 2.89% + $0.30, essentially in line with Stripe's 2.9% + $0.30. Internationally, PayPal charges 3.49% + $0.49, versus Stripe's 3.9% + $0.30 — which one is cheaper depends on your typical transaction size, since PayPal's higher fixed fee costs more on small charges while its lower percentage can win out on larger ones.",
  },
  {
    question: 'Why are fees different by country?',
    answer:
      'Card networks and payment processors charge more for cross-border and currency-conversion transactions to cover fraud risk, interchange fees charged by card-issuing banks, and the cost of handling foreign-exchange conversion, so international rates run higher than domestic ones across every major processor.',
  },
  {
    question: 'Can I negotiate processor fees?',
    answer:
      'High-volume merchants can sometimes negotiate custom (interchange-plus) pricing directly with Stripe or PayPal, or qualify for volume discounts. Most small and early-stage accounts are on the fixed, published rates used in this calculator — negotiated rates typically only become available once monthly processing volume reaches the tens of thousands of dollars.',
  },
  {
    question: 'What is the difference between "I want to receive" and "If I charge this amount"?',
    answer:
      '"I want to receive" works backward from a target payout: you tell FeeWise the Net amount you want to keep, and it grosses up the charge so the fee is covered on top. "If I charge this amount" works forward from a sticker price: you tell FeeWise the Gross amount you plan to charge, and it shows what actually lands in your account after the processor takes its fee.',
  },
  {
    question: 'Does FeeWise store or share the amounts I enter?',
    answer:
      'No. FeeWise does not process real payments or transactions. Every calculation runs entirely in your browser using the formulas above — the amounts and currency you enter are never sent to or stored on our servers. See our Privacy Policy for details.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const webApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FeeWise',
  url: 'https://payfeewise.com',
  description:
    'Free Stripe and PayPal payment processing fee calculator. Figure out what to charge, or what you will actually take home, in USD, EUR, or GBP.',
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

      <header className="relative mx-auto flex max-w-3xl items-center justify-between px-4 pt-8">
        <span className="text-sm font-semibold tracking-tight">FeeWise</span>
        <Badge variant="secondary">Updated for 2026</Badge>
      </header>

      <div className="relative mx-auto max-w-3xl px-4">
        <AdUnit />
      </div>

      <section className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pb-16 pt-8 text-center sm:pt-12">
        <span className="mb-4 text-xs font-medium uppercase tracking-wide text-primary">
          Simple, transparent estimates
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Know exactly what you&apos;ll take home.
        </h1>
        <p className="mt-4 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          Compare Stripe and PayPal fees side by side, in either direction — figure out what to
          charge, or what a target payout will actually cost.
        </p>
      </section>

      <section className="relative mx-auto flex max-w-3xl justify-center px-4 pb-16">
        <FeeCalculator />
      </section>

      <section className="relative mx-auto max-w-3xl px-4 pb-16">
        <article className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Understanding Payment Processing Fees in 2026: A Complete Guide for Freelancers
          </h2>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight">Fixed vs. Percentage Fees</h3>
            <p className="text-muted-foreground">
              Most processors charge a percentage of the transaction plus a small fixed fee per
              charge. The percentage covers card-network and fraud costs that scale with the
              transaction size; the fixed fee covers the flat cost of processing any charge at
              all, which is why very small transactions carry a proportionally larger fee.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight">
              Cross-border &amp; Currency Conversion Fees
            </h3>
            <p className="text-muted-foreground">
              International cards and cross-currency payments typically add an extra percentage
              on top of the domestic rate to cover currency conversion and additional fraud risk.
              If your customers pay from outside your home country, budget for the higher
              &quot;International&quot; rate rather than the domestic one.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight">Tips to Lower Processing Costs</h3>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                Prefer bank-to-bank transfers (like ACH) for large invoices — the capped fee is far
                cheaper than card rates at scale.
              </li>
              <li>Batch smaller charges where possible to reduce the number of fixed per-transaction fees.</li>
              <li>
                Price in the amount you want to receive using the &quot;I want to receive&quot; mode,
                so fees never eat into your margin.
              </li>
            </ul>
          </div>
        </article>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight">Frequently Asked Questions</h2>
        <p className="mt-2 text-muted-foreground">
          Straight answers on how Stripe and PayPal fees actually work — the formulas, the worked
          examples, and how each processor and transaction type differs.
        </p>

        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <div className="relative mx-auto max-w-3xl px-4">
        <AdUnit />
      </div>

      <footer className="relative mx-auto max-w-3xl px-4 pb-12 text-center text-xs text-muted-foreground">
        <nav className="mb-3 flex justify-center gap-4">
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms of Service
          </Link>
        </nav>
        <p>FeeWise — clear fees, confident pricing.</p>
        <p className="mt-1">Estimates only. Not financial advice.</p>
      </footer>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
    </main>
  );
}
