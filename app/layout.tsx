import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://payfeewise.com'),
  title: {
    default: 'Stripe Calculator & PayPal Fee Calculator | PayFeeWise',
    template: '%s | PayFeeWise',
  },
  description:
    'Free Stripe & PayPal fee calculator. Calculate exact processing fees, gross amounts, and net payout instantly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-2547322896496789" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2547322896496789"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
