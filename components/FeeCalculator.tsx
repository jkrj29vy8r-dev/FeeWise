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
    <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex rounded-lg bg-slate-100 p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setMode('receive')}
          className={`flex-1 rounded-md py-2 transition-colors ${
            mode === 'receive' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          I want to receive
        </button>
        <button
          type="button"
          onClick={() => setMode('charge')}
          className={`flex-1 rounded-md py-2 transition-colors ${
            mode === 'charge' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          I want to charge
        </button>
      </div>

      <label htmlFor="amount" className="mb-1 block text-sm font-medium text-slate-700">
        {mode === 'receive' ? 'Target net amount' : 'Amount to charge'}
      </label>
      <div className="mb-4 flex items-center rounded-lg border border-slate-300 px-3 py-2 focus-within:ring-2 focus-within:ring-slate-400">
        <span className="mr-1 text-slate-500">$</span>
        <input
          id="amount"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full outline-none"
          placeholder="0.00"
        />
      </div>

      <p className="mb-4 text-xs text-slate-500">
        Stripe (US domestic) · {(STRIPE_US_FEE_RATE * 100).toFixed(1)}% + {formatCurrency(STRIPE_US_FIXED_FEE)}
      </p>

      {breakdown ? (
        <dl className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600">Gross amount</dt>
            <dd className="font-semibold text-slate-900">{formatCurrency(breakdown.gross)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600">Processing fee</dt>
            <dd className="font-semibold text-slate-900">-{formatCurrency(breakdown.fee)}</dd>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2">
            <dt className="text-slate-700">Net amount</dt>
            <dd className="font-bold text-slate-900">{formatCurrency(breakdown.net)}</dd>
          </div>
        </dl>
      ) : (
        <p className="text-sm text-red-500">Enter a valid, non-negative amount.</p>
      )}
    </div>
  );
}
