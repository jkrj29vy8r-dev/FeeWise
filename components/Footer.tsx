import Link from 'next/link';

const legalLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact' },
];

const toolLinks = [
  { href: '/stripe-fee-calculator', label: 'Stripe Fee Calculator' },
  { href: '/paypal-fee-calculator', label: 'PayPal Fee Calculator' },
  { href: '/wise-fee-calculator', label: 'Wise Fee Calculator' },
];

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-3xl px-4 pb-12 text-center text-xs text-muted-foreground">
      <nav
        aria-label="Tools"
        className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
      >
        {toolLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-foreground">
            {link.label}
          </Link>
        ))}
      </nav>
      <nav
        aria-label="Legal"
        className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
      >
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-foreground">
            {link.label}
          </Link>
        ))}
      </nav>
      <p>FeeWise — clear fees, confident pricing.</p>
      <p className="mt-1">Estimates only. Not financial advice.</p>
    </footer>
  );
}
