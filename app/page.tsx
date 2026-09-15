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
    question: 'Why are fees different by country?',
    answer:
      'Card networks and payment processors charge more for cross-border and currency-conversion transactions to cover fraud risk, interchange, and FX handling, so international rates run higher than domestic ones.',
  },
  {
    question: 'Can I negotiate processor fees?',
    answer:
      'High-volume merchants can sometimes negotiate custom (interchange-plus) pricing directly with Stripe or PayPal. Most small accounts are on fixed published rates like the ones used here.',
  },
  {
    question: 'What is the difference between "I want to receive" and "If I charge this amount"?',
    answer:
      '"I want to receive" grosses up a target payout so fees are covered on top. "If I charge this amount" starts from a sticker price and shows what actually lands in your account after fees.',
  },
  {
    question: 'Are ACH fees really capped?',
    answer:
      "Yes — Stripe's ACH debit fee is 0.8% of the transaction, with a $5.00 cap per transaction and no fee below $0.30, which is why large ACH transfers are dramatically cheaper than card payments.",
  },
];

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

      <section className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pb-16 pt-16 text-center sm:pt-20">
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

      <section className="relative mx-auto grid max-w-5xl gap-8 px-4 pb-16 lg:grid-cols-[1fr_auto]">
        <div className="flex justify-center">
          <FeeCalculator />
        </div>

        <aside
          aria-label="Advertisement"
          className="hidden w-[160px] shrink-0 items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground lg:flex"
          style={{ minHeight: 600 }}
        >
          Ad slot 160×600
        </aside>
      </section>

      <div
        aria-label="Advertisement"
        className="relative mx-auto mb-16 flex h-[90px] max-w-3xl items-center justify-center rounded-lg border border-dashed border-border px-4 text-xs text-muted-foreground"
      >
        Ad slot 728×90
      </div>

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

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <footer className="relative mx-auto max-w-3xl px-4 pb-12 text-center text-xs text-muted-foreground">
        <p>FeeWise — clear fees, confident pricing.</p>
        <p className="mt-1">Estimates only. Not financial advice.</p>
      </footer>
    </main>
  );
}
