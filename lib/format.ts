export function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatCurrencyOrZero(value: number | undefined | null): string {
  if (value === undefined || value === null) return '৳0';
  return formatCurrency(value);
}

/** Recharts formatter: accepts any value, formats numbers as currency. */
export function formatCurrencyFormatter(value: unknown): string {
  if (typeof value === 'number' && !Number.isNaN(value)) return formatCurrency(value);
  return '৳0';
}
