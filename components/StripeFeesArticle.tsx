export default function StripeFeesArticle() {
  return (
    <article className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">How to Calculate Stripe Fees</h2>

      <p className="text-muted-foreground">
        If you accept payments through Stripe, every charge you process gets a percentage plus a
        small fixed amount deducted before the money reaches your bank account. Knowing exactly
        how that deduction is calculated — and how to work backward from a target payout to the
        amount you should actually charge — is the difference between guessing at your pricing and
        knowing it. This guide walks through Stripe&apos;s fee structure line by line, with the
        exact formulas and worked examples the Stripe calculator above uses.
      </p>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">Stripe&apos;s published fee rates</h3>
        <p className="text-muted-foreground">
          Stripe charges different rates depending on the type of transaction. These are the
          standard, published rates that apply to most accounts without a custom pricing
          agreement:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-background/40 text-left">
                <th className="p-3 font-semibold text-foreground">Transaction type</th>
                <th className="p-3 font-semibold text-foreground">Rate</th>
                <th className="p-3 font-semibold text-foreground">Notes</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/60">
                <td className="p-3">US domestic card</td>
                <td className="p-3">2.9% + $0.30</td>
                <td className="p-3">Card issued and processed within the US</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3">International card</td>
                <td className="p-3">3.9% + $0.30</td>
                <td className="p-3">Card issued outside your home country</td>
              </tr>
              <tr>
                <td className="p-3">ACH bank debit</td>
                <td className="p-3">0.8%</td>
                <td className="p-3">Floored at $0.30, capped at $5.00 per transaction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          Formula 1: Calculating the fee on a known charge
        </h3>
        <p className="text-muted-foreground">
          If you already know the Gross amount you&apos;re charging, calculating the Stripe fee is
          direct multiplication:
        </p>
        <p className="rounded-lg border border-border/60 bg-background/40 p-4 font-mono text-sm text-foreground">
          Stripe fee = (Gross amount × Rate) + Fixed fee
          <br />
          Net payout = Gross amount − Stripe fee
        </p>
        <p className="text-muted-foreground">
          Worked example: you charge a US customer $250.00 on their domestic card. The fee is
          ($250.00 × 0.029) + $0.30 = $7.25 + $0.30 = $7.55. Your net payout is
          $250.00 − $7.55 = $242.45.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          Formula 2: Working backward from your target payout
        </h3>
        <p className="text-muted-foreground">
          This is the calculation people get wrong most often. If you need to walk away with a
          specific Net amount — say, to cover an invoice for exactly $500.00 — you cannot simply
          add 2.9% of $500 to your price, because Stripe&apos;s percentage fee is calculated on the
          Gross amount you charge, not on the Net amount you keep. Adding the percentage to your
          target undercharges every time. The correct formula solves for Gross algebraically:
        </p>
        <p className="rounded-lg border border-border/60 bg-background/40 p-4 font-mono text-sm text-foreground">
          Gross amount = (Target Net + Fixed fee) / (1 − Rate)
        </p>
        <p className="text-muted-foreground">
          Worked example: to net exactly $1,000.00 after Stripe&apos;s US domestic fee, Gross =
          ($1,000.00 + $0.30) / (1 − 0.029) = $1,000.30 / 0.971 = $1,030.18. Charging $1,030.18
          incurs a $30.18 fee, leaving exactly $1,000.00 as your net payout — confirmed to the
          cent. This is precisely the calculation the Stripe calculator above runs when you select
          &quot;I want to receive.&quot;
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">Why the two formulas aren&apos;t symmetric</h3>
        <p className="text-muted-foreground">
          Because the fee percentage is always calculated on the Gross amount — the number you&apos;re
          charging, not the number you&apos;re keeping — the reverse calculation has to divide by
          (1 − Rate) instead of just adding the rate back on. The fee itself grows as the Gross
          amount grows, so a simple addition always falls short. Dividing by (1 − Rate) accounts
          for that feedback loop precisely, which is why the two formulas above look different even
          though they describe the same relationship from opposite directions.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">How Stripe&apos;s fees fit into your pricing</h3>
        <p className="text-muted-foreground">
          Whether the fee matters more as a percentage of revenue or as an absolute cost depends
          entirely on your business model. A freelancer invoicing a handful of large projects a
          month feels the percentage fee most — a few points off a $5,000 invoice is real money.
          A subscription business processing thousands of small recurring charges feels the fixed
          $0.30 fee most, since it repeats on every single transaction regardless of size. Knowing
          which one applies to you is the first step in deciding whether to build the fee into your
          list price, pass it through to the customer as a surcharge (where your processor and
          local regulations allow it), or absorb it as a cost of doing business.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">A note on Stripe ACH pricing</h3>
        <p className="text-muted-foreground">
          ACH bank debits use the same two formulas, but with a floor and a ceiling on the fee
          itself: 0.8% of the transaction, never less than $0.30 and never more than $5.00. That
          cap makes ACH dramatically cheaper than card payments once a transaction crosses roughly
          $625 (0.8% of $625 is $5.00) — a $10,000 invoice paid by ACH costs $5.00 in fees, versus
          well over $290 on a card at the domestic card rate. If you regularly invoice large
          amounts, routing payment through ACH instead of a card can be one of the highest-leverage
          changes you make to your effective margin.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">Common mistakes when estimating Stripe fees</h3>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>
            <strong className="text-foreground">Adding the percentage instead of dividing.</strong>{' '}
            Adding 2.9% of your target Net to itself always undercharges — use the gross-up formula
            above instead.
          </li>
          <li>
            <strong className="text-foreground">Forgetting the fixed fee on small charges.</strong>{' '}
            On a $5.00 charge, the $0.30 fixed fee alone is 6% of the transaction — small,
            frequent charges are where fixed fees hurt margin the most.
          </li>
          <li>
            <strong className="text-foreground">Assuming domestic and international rates are the same.</strong>{' '}
            A card issued outside your home country is billed at the higher 3.9% rate, not 2.9%,
            even if the currency and amount look identical on the receipt.
          </li>
          <li>
            <strong className="text-foreground">Not checking for a negotiated rate.</strong>{' '}
            Once your monthly volume grows large enough, Stripe may offer custom interchange-plus
            pricing below the published rates — the formulas here use the standard published rates
            as a baseline.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          Using the Stripe calculator above
        </h3>
        <p className="text-muted-foreground">
          The calculator at the top of this page runs both formulas for you, for all three Stripe
          transaction types. Choose &quot;I want to receive&quot; and enter your target Net amount
          to see exactly what Gross amount to charge; choose &quot;If I charge this amount&quot;
          and enter a Gross amount to see what actually lands in your account. Either way, the
          Gross, fee, and Net figures always reconcile exactly to the cent, so you can quote a
          price with confidence instead of estimating.
        </p>
      </div>
    </article>
  );
}
