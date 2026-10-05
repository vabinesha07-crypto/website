import { Currency } from '../types';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
};

export function formatPrice(priceInUSD: number, currency: Currency = 'USD'): string {
  const { symbol, rate } = CURRENCY_RATES[currency];
  const converted = Math.round(priceInUSD * rate);
  return `${symbol}${converted.toLocaleString()}`;
}
