import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing use of the FeeWise fee calculator.',
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <p className="text-sm text-muted-foreground">Last updated: September 2026</p>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Acceptance of terms</h2>
        <p className="text-muted-foreground">
          By accessing or using FeeWise (the &quot;Service&quot;), you agree to be bound by these
          Terms of Service. If you do not agree, please do not use the Service.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Description of the Service</h2>
        <p className="text-muted-foreground">
          FeeWise is a free, informational calculator that estimates Stripe and PayPal payment
          processing fees based on each processor&apos;s published standard pricing. FeeWise does
          not process payments, move money, store financial accounts, or act as a payment
          processor, bank, or money transmitter in any capacity.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Estimates only — no financial advice</h2>
        <p className="text-muted-foreground">
          All figures produced by FeeWise are estimates for informational purposes only. Actual
          fees charged by Stripe, PayPal, or any other processor may differ due to negotiated
          pricing, account-specific terms, currency conversion, promotional rates, or changes to a
          processor&apos;s published pricing that have not yet been reflected in this tool. FeeWise
          does not constitute financial, tax, legal, or accounting advice, and you should confirm
          exact fees with your payment processor before relying on them for pricing or invoicing
          decisions.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">No warranty</h2>
        <p className="text-muted-foreground">
          The Service is provided &quot;as is&quot; and &quot;as available,&quot; without
          warranties of any kind, whether express or implied, including but not limited to
          warranties of accuracy, merchantability, fitness for a particular purpose, or
          non-infringement.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Limitation of liability</h2>
        <p className="text-muted-foreground">
          To the fullest extent permitted by applicable law, FeeWise and its operators shall not
          be liable for any indirect, incidental, special, consequential, or punitive damages, or
          any loss of profits or revenue, arising from your use of, or inability to use, the
          Service, including any pricing or invoicing decisions made based on its output.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Acceptable use</h2>
        <p className="text-muted-foreground">
          You agree not to misuse the Service, including by attempting to disrupt its
          availability, scraping it at a rate that degrades performance for other users, or using
          it for any unlawful purpose.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Third-party trademarks</h2>
        <p className="text-muted-foreground">
          Stripe and PayPal are trademarks of their respective owners. Reference to these names is
          for identification purposes only and does not imply any affiliation, sponsorship, or
          endorsement.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Changes to these terms</h2>
        <p className="text-muted-foreground">
          We may revise these Terms of Service from time to time. Continued use of the Service
          after a revision takes effect constitutes acceptance of the updated terms.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
        <p className="text-muted-foreground">
          Questions about these terms can be sent to{' '}
          <a href="mailto:hello@payfeewise.com" className="text-primary underline underline-offset-4">
            hello@payfeewise.com
          </a>
          .
        </p>
      </div>
    </LegalLayout>
  );
}
