import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'About',
  description:
    'FeeWise is a free calculator that shows exactly what Stripe and PayPal will charge you, in either direction — what to bill, or what you will actually take home.',
};

export default function AboutPage() {
  return (
    <LegalLayout title="About FeeWise">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">What FeeWise does</h2>
        <p className="text-muted-foreground">
          FeeWise is a free, browser-based calculator for payment processing fees. Freelancers,
          consultants, and small businesses use it to answer two everyday questions: &quot;If I
          want to walk away with a specific amount, what do I need to charge?&quot; and &quot;If I
          charge this amount, how much will actually land in my account after Stripe or PayPal
          take their cut?&quot;
        </p>
        <p className="text-muted-foreground">
          Rather than digging through processor documentation or reverse-engineering the math by
          hand, you enter one number and instantly see the Gross amount, the Processing fee, and
          the Net amount — for Stripe (US Domestic, International, and ACH) and PayPal (US
          Domestic and International), in USD, EUR, or GBP.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Why it exists</h2>
        <p className="text-muted-foreground">
          Payment processor fees look simple on paper — a percentage plus a small fixed amount —
          but they get confusing fast the moment you need to work backwards from a target payout.
          Naively adding the fee percentage to your target amount undercharges every time, because
          the fee is calculated on the Gross amount, not the Net amount you actually want. FeeWise
          solves that algebra for you and shows the exact figures side by side.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Accuracy &amp; independence</h2>
        <p className="text-muted-foreground">
          FeeWise is an independent tool and is not affiliated with, endorsed by, or sponsored by
          Stripe, Inc., PayPal Holdings, Inc., or Google LLC. Fee rates are based on each
          processor&apos;s published standard pricing and are kept up to date on a best-effort
          basis; your actual rate may differ if you have custom or negotiated pricing. See our{' '}
          <a href="/terms" className="text-primary underline underline-offset-4">
            Terms of Service
          </a>{' '}
          for the full disclaimer.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">No data leaves your browser</h2>
        <p className="text-muted-foreground">
          FeeWise does not process real payments, and every calculation runs client-side in your
          browser — the amounts you enter are never sent to or stored on our servers. See our{' '}
          <a href="/privacy" className="text-primary underline underline-offset-4">
            Privacy Policy
          </a>{' '}
          for details.
        </p>
      </div>
    </LegalLayout>
  );
}
