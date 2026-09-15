export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
};

/**
 * Formats a number with the chosen currency's symbol. This relabels the
 * amount the user already entered in their preferred currency — it does not
 * convert between currencies (no exchange rate is applied).
 */
export function formatAmount(value: number, currency: CurrencyCode): string {
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${CURRENCIES[currency].symbol}${formatted}`;
}
