'use client';

import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  FEE_STRUCTURES,
  PROCESSOR_STRUCTURES,
  calculateGrossFromNet,
  calculateNetFromGross,
  type FeeStructureId,
  type Processor,
} from '@/lib/fees';
import { CURRENCIES, formatAmount, type CurrencyCode } from '@/lib/currency';

type Mode = 'receive' | 'charge';

export default function FeeCalculator() {
  const [processor, setProcessor] = useState<Processor>('stripe');
  const [mode, setMode] = useState<Mode>('receive');
  const [structureId, setStructureId] = useState<FeeStructureId>('stripe_us');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [amount, setAmount] = useState('1000');
  const [copied, setCopied] = useState(false);

  const formatCurrency = (value: number) => formatAmount(value, currency);

  const structure = FEE_STRUCTURES[structureId];
  const parsedAmount = Number(amount);
  const isValid = amount.trim() !== '' && Number.isFinite(parsedAmount) && parsedAmount >= 0;

  const breakdown = useMemo(() => {
    if (!isValid) return null;
    return mode === 'receive'
      ? calculateGrossFromNet(parsedAmount, structure)
      : calculateNetFromGross(parsedAmount, structure);
  }, [mode, parsedAmount, isValid, structure]);

  function handleProcessorChange(next: Processor) {
    setProcessor(next);
    setStructureId(PROCESSOR_STRUCTURES[next][0].id);
  }

  async function handleCopy() {
    if (!breakdown) return;
    const summary = `Gross: ${formatCurrency(breakdown.gross)}\nProcessing fee: ${formatCurrency(breakdown.fee)}\nNet: ${formatCurrency(breakdown.net)}`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently ignore.
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 bg-card/70 shadow-2xl shadow-black/40 backdrop-blur">
      <CardContent className="p-6">
        <Tabs value={processor} onValueChange={(v) => handleProcessorChange(v as Processor)} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
          </TabsList>
        </Tabs>

        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(v) => v && setMode(v as Mode)}
          className="mb-6 grid w-full grid-cols-2 rounded-lg bg-muted p-1"
        >
          <ToggleGroupItem value="receive" className="rounded-md text-sm data-[state=on]:bg-background">
            I want to receive
          </ToggleGroupItem>
          <ToggleGroupItem value="charge" className="rounded-md text-sm data-[state=on]:bg-background">
            If I charge this amount
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="amount" className="mb-1 block text-sm font-medium text-muted-foreground">
              {mode === 'receive' ? 'Target net amount' : 'Amount to charge'}
            </label>
            <div className="flex items-center rounded-md border border-input bg-transparent pl-1 pr-3 focus-within:ring-1 focus-within:ring-ring">
              <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
                <SelectTrigger
                  id="currency"
                  aria-label="Currency"
                  className="h-8 w-[72px] shrink-0 border-0 bg-transparent px-1.5 text-muted-foreground shadow-none focus:ring-0"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(CURRENCIES).map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} {c.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="amount"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-0 px-1 shadow-none focus-visible:ring-0"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label htmlFor="transaction-type" className="mb-1 block text-sm font-medium text-muted-foreground">
              Transaction type
            </label>
            <Select value={structureId} onValueChange={(v) => setStructureId(v as FeeStructureId)}>
              <SelectTrigger id="transaction-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROCESSOR_STRUCTURES[processor].map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="mb-4 text-xs text-muted-foreground">
          {processor === 'stripe' ? 'Stripe' : 'PayPal'} · {structure.label} ·{' '}
          {(structure.rate * 100).toFixed(2)}%
          {structure.fixedFee > 0 && ` + ${formatCurrency(structure.fixedFee)}`}
          {structure.minFee !== undefined &&
            ` (min ${formatCurrency(structure.minFee)}, max ${formatCurrency(structure.maxFee ?? 0)})`}
        </p>

        {breakdown ? (
          <>
            <dl className="space-y-2 rounded-lg border border-border/60 bg-background/40 p-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Gross amount</dt>
                <dd className="font-semibold">{formatCurrency(breakdown.gross)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Processing fee</dt>
                <dd className="font-semibold">-{formatCurrency(breakdown.fee)}</dd>
              </div>
              <div className="flex justify-between border-t border-border/60 pt-2">
                <dt className="text-foreground">Net amount</dt>
                <dd className="font-bold text-primary">{formatCurrency(breakdown.net)}</dd>
              </div>
            </dl>
            <Button variant="secondary" className="mt-4 w-full" onClick={handleCopy}>
              {copied ? <Check /> : <Copy />}
              {copied ? 'Copied' : 'Copy breakdown'}
            </Button>
          </>
        ) : (
          <p className="text-sm text-destructive">Enter a valid, non-negative amount.</p>
        )}
      </CardContent>
    </Card>
  );
}
