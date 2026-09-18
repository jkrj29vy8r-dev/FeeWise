export type GuideFocus = 'stripe' | 'paypal' | 'wise' | undefined;

const focusIntros: Record<Exclude<GuideFocus, undefined>, string> = {
  stripe:
    "This guide focuses on Stripe's fee structure, but the underlying math — and the comparison below — applies to every processor you might weigh Stripe against.",
  paypal:
    "This guide focuses on PayPal's fee structure, but the underlying math — and the comparison below — applies to every processor you might weigh PayPal against.",
  wise: "This guide focuses on how Wise's pricing differs from card processors like Stripe and PayPal, and where a traditional gross-up formula does and doesn't apply.",
};

export default function EditorialGuide({ focus }: { focus?: GuideFocus }) {
  return (
    <article className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        Understanding Payment Processing Fees: A Complete Guide
      </h2>

      <p className="text-muted-foreground">
        Every payment processor — Stripe, PayPal, Square, Wise, and the rest — takes a cut of the
        money that moves through it. On paper the math looks trivial: a percentage plus a small
        fixed fee. In practice, the moment you need to work backward from a target payout instead
        of forward from a sticker price, that simple-looking formula gets confusing fast. This
        guide walks through exactly how Gross, Net, and Processing fee relate to each other, how
        domestic and international rates differ, how the major processors stack up side by side,
        and how to choose (and minimize) the fees that apply to your business.
        {focus ? ' ' + focusIntros[focus] : ''}
      </p>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">Gross vs. Net: the two directions of the math</h3>
        <p className="text-muted-foreground">
          <strong className="text-foreground">Gross</strong> is the total amount charged to the
          payer — the number on the invoice or checkout page.{' '}
          <strong className="text-foreground">Net</strong> is what actually lands in your account
          after the processor takes its cut. The{' '}
          <strong className="text-foreground">Processing fee</strong> is the difference between
          the two: Fee = Gross − Net. Most calculators (and most people doing this by hand) only
          ever compute the fee moving forward: you know the Gross amount you&apos;re charging, and
          you solve for what you&apos;ll actually receive. That direction is simple:
        </p>
        <p className="rounded-lg border border-border/60 bg-background/40 p-4 font-mono text-sm text-foreground">
          Fee = (Gross × Rate) + Fixed Fee
          <br />
          Net = Gross − Fee
        </p>
        <p className="text-muted-foreground">
          The harder, more useful direction is the reverse: you know the exact Net amount you need
          to walk away with — say, to cover a contractor invoice or hit a specific payout — and you
          need to know what Gross amount to charge so the fee doesn&apos;t eat into it. Because the
          fee itself is calculated as a percentage of the Gross amount (the number you&apos;re
          solving for), you can&apos;t just add the fee rate on top of your target Net — that
          undercharges every time, since the fee grows as the Gross amount grows. Solving the
          equation algebraically for Gross gives:
        </p>
        <p className="rounded-lg border border-border/60 bg-background/40 p-4 font-mono text-sm text-foreground">
          Gross = (Target Net + Fixed Fee) / (1 − Fee Rate)
        </p>
        <p className="text-muted-foreground">
          For a $1,000 target net on Stripe&apos;s US domestic rate (2.9% + $0.30), that&apos;s
          Gross = ($1,000 + $0.30) / (1 − 0.029) = $1,030.18, with a $30.18 processing fee — charge
          $1,030.18 and exactly $1,000.00 lands in your account. FeeWise runs both directions of
          this formula for you, so you never have to do the algebra by hand.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          Domestic vs. international: why interchange rates differ
        </h3>
        <p className="text-muted-foreground">
          Every card-network transaction routes through an interchange fee set by the
          card-issuing bank, plus assessment fees from the network (Visa, Mastercard, etc.) and a
          markup from your processor. Domestic transactions — where the card, the merchant, and the
          bank are all in the same country and currency — carry the lowest interchange rates,
          because fraud risk and settlement complexity are lowest. Cross-border transactions add
          extra cost on three fronts: higher fraud risk (cross-border card-not-present fraud is
          measurably more common), currency-conversion overhead when the card&apos;s currency
          differs from the settlement currency, and higher interchange rates that card networks
          charge specifically for cross-border interchange. That&apos;s why Stripe&apos;s
          international card rate (3.9% + $0.30) runs a full percentage point above its domestic
          rate (2.9% + $0.30), and why PayPal, Square, and every other major processor follow the
          same pattern.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold tracking-tight">
          Comparing Stripe, PayPal, Wise, and Square
        </h3>
        <p className="text-muted-foreground">
          Rates below reflect each provider&apos;s standard published pricing for card and transfer
          payments as of this writing. Providers change pricing periodically and offer custom rates
          to high-volume merchants, so treat this as a starting point and confirm current pricing
          directly with each provider before making a pricing decision.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-background/40 text-left">
                <th className="p-3 font-semibold text-foreground">Provider</th>
                <th className="p-3 font-semibold text-foreground">Transaction type</th>
                <th className="p-3 font-semibold text-foreground">Typical rate</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/60">
                <td className="p-3">Stripe</td>
                <td className="p-3">US domestic card</td>
                <td className="p-3">2.9% + $0.30</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3">Stripe</td>
                <td className="p-3">International card</td>
                <td className="p-3">3.9% + $0.30</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3">Stripe</td>
                <td className="p-3">ACH bank debit</td>
                <td className="p-3">0.8% (min $0.30, max $5.00)</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3">PayPal</td>
                <td className="p-3">US domestic checkout</td>
                <td className="p-3">2.89% + $0.30</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3">PayPal</td>
                <td className="p-3">International checkout</td>
                <td className="p-3">3.49% + $0.49</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3">Square</td>
                <td className="p-3">Online / card-not-present</td>
                <td className="p-3">2.9% + $0.30</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3">Square</td>
                <td className="p-3">In-person (card present)</td>
                <td className="p-3">2.6% + $0.10</td>
              </tr>
              <tr>
                <td className="p-3">Wise</td>
                <td className="p-3">International transfer (varies by corridor)</td>
                <td className="p-3">~0.4%–2%, often no fixed fee</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground">
          Wise&apos;s pricing model is structurally different from card processors — it is
          typically quoted per currency corridor and payout method rather than as a single flat
          card-processing rate, so the range above is illustrative, not a quote.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">Choosing the right processor</h3>
        <p className="text-muted-foreground">
          For US-only card payments, Stripe and PayPal land within a few basis points of each
          other, so the tiebreaker is usually your typical transaction size: PayPal&apos;s slightly
          lower percentage plus higher fixed fee tends to win on larger invoices, while
          Stripe&apos;s lower fixed fee edges ahead on smaller ones. Square is worth a look if you
          also take in-person payments, since its card-present rate (2.6% + $0.10) undercuts both
          Stripe and PayPal&apos;s online rates. If you&apos;re paying international contractors or
          getting paid by clients abroad in a different currency, Wise&apos;s transfer-based model
          frequently comes out cheaper than routing that money through a card network at all —
          it&apos;s worth comparing the actual quote for your specific corridor against the
          international card rate before deciding.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">A note on estimates and rate changes</h3>
        <p className="text-muted-foreground">
          FeeWise&apos;s calculator applies each provider&apos;s standard published rate to the
          amount, currency, and transaction type you select, and reconciles the three figures so
          Gross minus Processing fee always equals Net exactly, down to the cent. What it
          can&apos;t account for is a rate that&apos;s specific to your account: negotiated
          interchange-plus pricing, promotional rates, non-profit discounts, or a processor
          updating its published pricing since this guide was last reviewed. Treat every figure
          here as a close estimate for planning and invoicing purposes, and confirm the exact rate
          on your account before finalizing a price that depends on it.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">Tips to lower your processing costs</h3>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>
            Prefer bank-to-bank transfers (like ACH) for large invoices — the capped fee is far
            cheaper than card rates at scale.
          </li>
          <li>Batch smaller charges where possible to reduce the number of fixed per-transaction fees.</li>
          <li>
            Price in the amount you want to receive using FeeWise&apos;s &quot;I want to
            receive&quot; mode, so fees never eat into your margin.
          </li>
          <li>
            For recurring cross-border payouts, get an actual quote from Wise or a similar transfer
            service and compare it against your card processor&apos;s international rate — the
            cheaper option can vary by corridor and amount.
          </li>
          <li>
            Once your monthly volume climbs into the tens of thousands of dollars, ask your
            processor about interchange-plus or custom pricing — published rates are a starting
            point, not a ceiling.
          </li>
        </ul>
      </div>
    </article>
  );
}
