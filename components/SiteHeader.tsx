import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function SiteHeader() {
  return (
    <header className="relative mx-auto flex max-w-3xl items-center justify-between px-4 pt-8">
      <Link href="/" className="text-sm font-semibold tracking-tight">
        FeeWise
      </Link>
      <Badge variant="secondary">Updated for 2026</Badge>
    </header>
  );
}
