export function formatPercentage(value: number | string): string {
  const v = Number(value);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(v);
}
