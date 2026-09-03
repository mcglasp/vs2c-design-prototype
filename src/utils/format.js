export function formatCurrency(value) {
  const n = Number(value);
  if (!isFinite(n)) return '0.00';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function lineTotal(item) {
  return (Number(item.qty) || 0) * (Number(item.price) || 0);
}
