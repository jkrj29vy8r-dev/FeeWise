import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FeeWise — Payment Fee Calculator',
  description:
    'Calculate payment processor fees and figure out exactly how much to charge or receive.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2547322896496789" />
      </head>
      <body>{children}</body>
    </html>
  );
}
