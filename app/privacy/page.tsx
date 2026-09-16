import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How FeeWise handles data: what we collect, what we do not, and how advertising cookies work on this site.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p className="text-sm text-muted-foreground">Last updated: September 2026</p>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">The short version</h2>
        <p className="text-muted-foreground">
          FeeWise does not require an account, does not process real payments, and every fee
          calculation runs entirely in your browser. The amounts and currencies you enter into the
          calculator are never transmitted to or stored on our servers.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Information we collect</h2>
        <p className="text-muted-foreground">
          We do not operate user accounts, and the calculator itself collects no personal
          information. Like most websites, our hosting provider automatically logs standard
          technical data for security and reliability purposes (such as IP address, browser type,
          and request timestamps) — we do not use this data for advertising or combine it with any
          other data about you.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Advertising &amp; cookies</h2>
        <p className="text-muted-foreground">
          This site displays advertisements served by Google AdSense. Google and its partners may
          use cookies or similar technologies to serve ads based on your prior visits to this or
          other websites. You can opt out of personalized advertising by visiting{' '}
          <a
            href="https://adssettings.google.com"
            className="text-primary underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          , or opt out of a third-party vendor&apos;s use of cookies for personalized advertising
          by visiting{' '}
          <a
            href="https://www.aboutads.info/choices"
            className="text-primary underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aboutads.info
          </a>
          . For more detail on how Google uses information from sites that use its services, see{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="text-primary underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Google uses information from sites or apps that use our services
          </a>
          .
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Local browser storage</h2>
        <p className="text-muted-foreground">
          The calculator may use your browser&apos;s local storage to remember interface
          preferences (such as your last-selected currency or processor). This data stays on your
          device and is never sent to us.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Children&apos;s privacy</h2>
        <p className="text-muted-foreground">
          FeeWise is a general-audience business tool and is not directed at children under 13. We
          do not knowingly collect personal information from children.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Changes to this policy</h2>
        <p className="text-muted-foreground">
          We may update this Privacy Policy from time to time. Changes take effect when this page
          is updated, and the &quot;Last updated&quot; date above will reflect the most recent
          revision.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
        <p className="text-muted-foreground">
          Questions about this policy can be sent to{' '}
          <a href="mailto:privacy@payfeewise.com" className="text-primary underline underline-offset-4">
            privacy@payfeewise.com
          </a>
          .
        </p>
      </div>
    </LegalLayout>
  );
}
