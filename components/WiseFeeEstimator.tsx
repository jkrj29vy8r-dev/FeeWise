'use client';

import { useMemo, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { calculateGrossFromNet, calculateNetFromGross } from '@/lib/fees';
import { CURRENCIES, formatAmount, type CurrencyCode } from '@/lib/currency';

type Mode = 'receive' | 'charge';

export default function WiseFeeEstimator() {
  const [mode, setMode] = useState<Mode>('receive');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [amount, setAmount] = useState('1000');
  const [ratePercent, setRatePercent] = useState('0.65');
  const [fixedFee, setFixedFee] = useState('0');

  const formatCurrency = (value: number) => formatAmount(value, currency);

  const parsedAmount = Number(amount);
  const parsedRate = Number(ratePercent) / 100;
  const parsedFixedFee = Number(fixedFee);
  const isValid =
    amount.trim() !== '' &&
    Number.isFinite(parsedAmount) &&
    parsedAmount >= 0 &&
    Number.isFinite(parsedRate) &&
    parsedRate >= 0 &&
    parsedRate < 1 &&
    Number.isFinite(parsedFixedFee) &&
    parsedFixedFee >= 0;

  const breakdown = useMemo(() => {
    if (!isValid) return null;
    const structure = { rate: parsedRate, fixedFee: parsedFixedFee };
    return mode === 'receive'
      ? calculateGrossFromNet(parsedAmount, structure)
      : calculateNetFromGross(parsedAmount, structure);
  }, [mode, parsedAmount, parsedRate, parsedFixedFee, isValid]);

  return (
    <Card className="w-full max-w-md border-border/60 bg-card/70 shadow-2xl shadow-black/40 backdrop-blur">
      <CardContent className="p-6">
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
            If I send this amount
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-1 block text-sm font-medium text-muted-foreground">
            {mode === 'receive' ? 'Target net amount' : 'Amount to send'}
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

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="wise-rate" className="mb-1 block text-sm font-medium text-muted-foreground">
              Transfer fee %
            </label>
            <Input
              id="wise-rate"
              inputMode="decimal"
              value={ratePercent}
              onChange={(e) => setRatePercent(e.target.value)}
              placeholder="0.65"
            />
          </div>
          <div>
            <label htmlFor="wise-fixed" className="mb-1 block text-sm font-medium text-muted-foreground">
              Fixed fee
            </label>
            <Input
              id="wise-fixed"
              inputMode="decimal"
              value={fixedFee}
              onChange={(e) => setFixedFee(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <p className="mb-4 text-xs text-muted-foreground">
          Wise&apos;s fee varies by currency corridor and payout method — the 0.65% default is a
          representative example, not a quote. Look up your route&apos;s actual rate at{' '}
          <a
            href="https://wise.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            wise.com/pricing
          </a>{' '}
          and enter it above for an accurate estimate.
        </p>

        {breakdown ? (
          <dl className="space-y-2 rounded-lg border border-border/60 bg-background/40 p-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Gross amount</dt>
              <dd className="font-semibold">{formatCurrency(breakdown.gross)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Transfer fee</dt>
              <dd className="font-semibold">-{formatCurrency(breakdown.fee)}</dd>
            </div>
            <div className="flex justify-between border-t border-border/60 pt-2">
              <dt className="text-foreground">Net amount</dt>
              <dd className="font-bold text-primary">{formatCurrency(breakdown.net)}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-destructive">Enter a valid amount and fee rate (0–99%).</p>
        )}
      </CardContent>
    </Card>
  );
}
