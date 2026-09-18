import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the FeeWise team with questions, feedback, or support requests.',
};

export default function ContactPage() {
  return (
    <LegalLayout title="Contact Us">
      <div className="space-y-2">
        <p className="text-muted-foreground">
          Have a question about how a calculation works, spotted a rate that looks out of date, or
          just want to send feedback? We&apos;d like to hear from you.
        </p>
      </div>

      <div className="rounded-lg border border-border/60 bg-card/70 p-6">
        <h2 className="text-lg font-semibold tracking-tight">General support</h2>
        <p className="mt-2 text-muted-foreground">
          For general questions, feedback, or bug reports, email us directly and we&apos;ll get
          back to you as soon as we can:
        </p>
        <a
          href="mailto:hello@payfeewise.com"
          className="mt-3 inline-block text-primary underline underline-offset-4"
        >
          hello@payfeewise.com
        </a>
      </div>

      <div className="rounded-lg border border-border/60 bg-card/70 p-6">
        <h2 className="text-lg font-semibold tracking-tight">Privacy &amp; data requests</h2>
        <p className="mt-2 text-muted-foreground">
          For questions specifically about our{' '}
          <a href="/privacy" className="text-primary underline underline-offset-4">
            Privacy Policy
          </a>{' '}
          or data handling, email:
        </p>
        <a
          href="mailto:privacy@payfeewise.com"
          className="mt-3 inline-block text-primary underline underline-offset-4"
        >
          privacy@payfeewise.com
        </a>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          FeeWise is a small, independent project — we read every message, but please allow a few
          business days for a reply.
        </p>
      </div>
    </LegalLayout>
  );
}
