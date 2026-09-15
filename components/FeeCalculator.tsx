'use client';

import { useMemo, useState } from 'react';
import {
  STRIPE_US_FEE_RATE,
  STRIPE_US_FIXED_FEE,
  calculateGrossFromNet,
  calculateNetFromGross,
} from '@/lib/fees';

type Mode = 'receive' | 'charge';

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export default function FeeCalculator() {
  const [mode, setMode] = useState<Mode>('receive');
  const [amount, setAmount] = useState('1000');

  const parsedAmount = Number(amount);
  const isValid = amount.trim() !== '' && Number.isFinite(parsedAmount) && parsedAmount >= 0;

  const breakdown = useMemo(() => {
    if (!isValid) return null;
    return mode === 'receive'
      ? calculateGrossFromNet(parsedAmount)
      : calculateNetFromGross(parsedAmount);
  }, [mode, parsedAmount, isValid]);

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="mb-6 flex rounded-lg bg-slate-950/60 p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setMode('receive')}
          className={`flex-1 rounded-md py-2 transition-colors ${
            mode === 'receive'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          I want to receive
        </button>
        <button
          type="button"
          onClick={() => setMode('charge')}
          className={`flex-1 rounded-md py-2 transition-colors ${
            mode === 'charge'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          I want to charge
        </button>
      </div>

      <label htmlFor="amount" className="mb-1 block text-sm font-medium text-slate-300">
        {mode === 'receive' ? 'Target net amount' : 'Amount to charge'}
      </label>
      <div className="mb-4 flex items-center rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
        <span className="mr-1 text-slate-500">$</span>
        <input
          id="amount"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
          placeholder="0.00"
        />
      </div>

      <p className="mb-4 text-xs text-slate-500">
        Stripe (US domestic) · {(STRIPE_US_FEE_RATE * 100).toFixed(1)}% + {formatCurrency(STRIPE_US_FIXED_FEE)}
      </p>

      {breakdown ? (
        <dl className="space-y-2 rounded-lg border border-slate-800 bg-slate-950/40 p-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-400">Gross amount</dt>
            <dd className="font-semibold text-slate-100">{formatCurrency(breakdown.gross)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400">Processing fee</dt>
            <dd className="font-semibold text-slate-100">-{formatCurrency(breakdown.fee)}</dd>
          </div>
          <div className="flex justify-between border-t border-slate-800 pt-2">
            <dt className="text-slate-300">Net amount</dt>
            <dd className="font-bold text-emerald-400">{formatCurrency(breakdown.net)}</dd>
          </div>
        </dl>
      ) : (
        <p className="text-sm text-red-400">Enter a valid, non-negative amount.</p>
      )}
    </div>
  );
}
